import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appDisableEnter]',
})
export class DisableEnterDirective {
    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
}
