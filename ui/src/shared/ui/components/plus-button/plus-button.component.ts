import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-plus-button',
    templateUrl: './plus-button.component.html',
    styleUrls: ['./plus-button.component.scss'],
})
export class PlusButtonComponent {
    @Output() public readonly clicked = new EventEmitter<void>();
}
