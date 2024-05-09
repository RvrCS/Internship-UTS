import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VienComponent } from './vien.component';
import { StartComponent } from './start/start.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { CheckBoxLateralComponent } from './menu-bottom/check-box-lateral.component';
import { DashConceptoComponent } from './dash-concepto/dash-concepto.component';

const routes: Routes = [
    {
        path: '', component: VienComponent, 
        children: [
            { path: '', redirectTo: 'start', pathMatch: 'full' },
            { path: 'start', component: StartComponent },
            { path: 'dashconcepto', component: DashConceptoComponent },
            
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VienRoutingModule { }
