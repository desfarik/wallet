import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-passwords-list',
  templateUrl: './passwords-list.component.html',
  styleUrls: ['./passwords-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordsListComponent {

}
