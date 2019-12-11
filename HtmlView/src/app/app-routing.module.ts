import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

import { ListaComponent as ListaOrdini } from './dashboard/ordini/lista/lista.component';
import { FormComponent as FormOrdini } from './dashboard/ordini/form/form.component';
import { DettaglioComponent as DettaglioOrdini } from './dashboard/ordini/dettaglio/dettaglio.component';

import { ListaComponent as ListaFornitori } from './dashboard/fornitori/lista/lista.component';
import { FormComponent as FormFornitori } from './dashboard/fornitori/form/form.component';

import { ListaComponent as ListaListino } from './dashboard/listino/lista/lista.component';
import { FormComponent as FormListino } from './dashboard/listino/form/form.component';

import { ListaComponent as ListaStatistiche } from './dashboard/statistiche/lista/lista.component';
import { LoginComponent } from './auth/login/login.component';
import {PublicComponent} from '@app/public/public.component';

import {ImportcsvComponent} from '@app/dashboard/importcsv/importcsv.component';
import {TablerowComponent} from '@app/shared/tableRow/tablerow.component';
import {Reset_passwordComponent} from '@app/auth/reset_password/reset_password.component';
import {CompaniesSettingsComponent} from '@app/dashboard/settings/companies/companies.component';
import {LoggedGuard} from "@app/shared/Guards/Logged.guard";

import { ListaComponent as listaUtenti } from './dashboard/utenti/lista/lista.component';
import { FormComponent as FormUtenti } from './dashboard/utenti/form/form.component';


const routes: Routes = [{
    path: 'dashboard', component: DashboardComponent, children: [

      // Ordini
      { path: '', redirectTo: 'orders',  pathMatch: 'full' },
      { path: 'orders', component: ListaOrdini, data: { role: ['order:read']}},
      { path: 'orders/new', component: FormOrdini, data: { role: ['order:create']}},
      { path: 'orders/:id', component:  FormOrdini, data: { role: ['order:detail', 'order:read']}},

      // Fornitori
      { path: 'suppliers', component: ListaFornitori, data: { role: ['suppliers:read']}},
      { path: 'suppliers/new', component: FormFornitori, data: { role: ['suppliers:create']}},
      { path: 'suppliers/:id', component: FormFornitori, data: { role: ['suppliers:detail', 'suppliers:read']}},

      // Listino
      { path: 'list', component: ListaListino, data: { role: ['products:read']}},
      { path: 'list/new', component: FormListino, data: { role: ['products:create']}},
      { path: 'list/:id', component: FormListino, data: { role: ['products.detail', 'products:read']}},

      // Statistiche
      { path: 'statistics', component: ListaStatistiche, data: { role: ['statistics']}},

      // import
      { path: 'import', component: ImportcsvComponent, data: { role: ['public']}},

      // utenti
      { path: 'users', component: listaUtenti, data: { role: ['users:read']}},
      { path: 'users/new', component: FormUtenti, data: { role: ['users:create']}},

      { path: 'users/:id', component: FormUtenti, data: { role: ['users:detail', 'users:read']}},
      // settings
      {path: 'settings', children: [
        {path: 'companies', component: CompaniesSettingsComponent, data: { role: ['public']}},
        {path: 'profile', component: CompaniesSettingsComponent, data: { role: ['public']}}
      ]
    },
    ]
  },
 // { path: 'public', component: PublicComponent, children: [
   // { path: 'negotation/:token', component: DettaglioOrdini, canActivate: [LoggedGuard], data: { role: ['negotiation']}},
    // ]
  // },
  { path: 'login', component: LoginComponent},
  {path: 'login/resetpassword', component: Reset_passwordComponent},
  {path: 'login/resetpassword/:token', component: Reset_passwordComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
