import { APP_INITIALIZER, EnvironmentProviders, inject, Injectable, Injector, makeEnvironmentProviders, Provider } from '@angular/core';
import { LOCAL_STORAGE } from "@ng-web-apis/common";
import { VERSION } from "../tokens";

export function provideDataMigration(): EnvironmentProviders {
  return makeEnvironmentProviders([
    MigratorsService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (migrator: MigratorsService) => {
        return () => {
          return migrator.startMigration();
        };
      },
      deps: [MigratorsService]
    },
  ])
}

@Injectable()
export class MigratorsService {
  storage = inject(LOCAL_STORAGE);
  version = inject(VERSION);
  injector = inject(Injector);

  async startMigration() {
    const appVersion = Number(this.storage.getItem('APP_VERSION')) || 1;
    if (this.version === appVersion) {
      console.log('APP is up to date!')
      return
    }
    console.log('Load migrators');
    const migratorsProviders = await this.loadMigrators(appVersion);
    console.log('Bootstrap migrators');
    const migrators = this.bootstrapMigrators(migratorsProviders);
    console.log('Run migrators');
    migrators.forEach(migrator => migrator.migrate());

    this.storage.setItem('APP_VERSION', String(this.version));
  }

  async loadMigrators(appVersion: number): Promise<Provider[]> {
    const migratorVersions: number[] = [];
    for (let i = appVersion + 1; i <= this.version; i++) {
      migratorVersions.push(i);
    }
    // @ts-ignore
    return await Promise.all(migratorVersions.map(version => MIGRATORS_MAP_LOADER[version]()));
  }

  private bootstrapMigrators(migratorProviders: Provider[]): Migrator[] {
    const module = Injector.create({
      providers: migratorProviders,
      parent: this.injector,
    });
    return migratorProviders.map(provider => module.get(provider))
  }
}


const MIGRATORS_MAP_LOADER: { [n: number]: () => Promise<unknown> } = {
  2: () => import('./v2.migrator').then(module => module.V2Migrator),
}


export interface Migrator {
  migrate(): void;
}
