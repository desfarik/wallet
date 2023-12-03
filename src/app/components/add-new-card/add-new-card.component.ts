import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, signal, ViewChild } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'app-add-new-card',
    templateUrl: './add-new-card.component.html',
    styleUrls: ['./add-new-card.component.scss'],
    imports: [NgxMaskDirective, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatSelectModule],
    providers: [provideNgxMask()],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AddNewCardComponent implements AfterViewInit {

    needScroll = signal(false);

    @ViewChild("labelInput", { read: ElementRef }) labelInputRef!: ElementRef<HTMLInputElement>;
    @ViewChild("scrollBar", { read: ElementRef }) scrollBarRef!: ElementRef<HTMLDivElement>;

    ngAfterViewInit(): void {
        Promise.resolve().then(() => {
            this.needScroll.set(!this.scrolledToBottom)
        })
        this.scrollBarRef.nativeElement.onscroll = () => {
            this.needScroll.set(!this.scrolledToBottom)
        }
    }

    get scrolledToBottom(): boolean {
        const scrollBar = this.scrollBarRef.nativeElement;
        return (scrollBar.offsetHeight + scrollBar.scrollTop) >= scrollBar.scrollHeight;
    }


}
