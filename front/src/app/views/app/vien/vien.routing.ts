import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VienComponent } from './vien.component';
import { StartComponent } from './start/start.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { CheckBoxLateralComponent } from './menu-bottom/check-box-lateral.component';

const routes: Routes = [
    {
        path: '', component: VienComponent, // Cambiado a VienComponent como componente principal
        children: [
            { path: '', redirectTo: 'start', pathMatch: 'full' },
            { path: 'start', component: StartComponent },
            { path: 'concepto', component: ConceptoComponent },
            
            { path: 'checkbox', component: CheckBoxLateralComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VienRoutingModule { }
