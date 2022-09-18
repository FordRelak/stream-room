import { Component } from '@angular/core';
import { DestroyableComponent } from '@shared/components/destroyable/destroyable.component';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent extends DestroyableComponent {
    constructor() {
        super();
    }
}
