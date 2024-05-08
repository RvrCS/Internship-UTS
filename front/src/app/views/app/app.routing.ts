import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppService } from 'src/app/shared/loginService';
import { AppComponent } from './app.component';
import { Concepto } from '../../shared/models/concepto';


const dataAnimation = { animation: 'isLeft' };

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'start', data: dataAnimation },
            { path: 'start', loadChildren: () => import('./vien/vien.module').then(m => m.VienModule), data: dataAnimation },
          

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
