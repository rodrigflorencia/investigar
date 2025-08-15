import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterTestComponent } from './components/after-test.component';

const routes: Routes = [
    {
        path: '',
        component: AfterTestComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AfterTestRoutingModule {}
