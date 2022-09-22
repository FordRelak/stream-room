import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const ROUTES: Routes = [
    {
        path: 'test',
        loadChildren: () =>
            import('../pages/test/test.module').then(
                (module) => module.TestModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
