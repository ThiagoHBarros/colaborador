import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FormColaboradorComponent } from '../form-colaborador/form-colaborador.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'cadastro',
    component: FormColaboradorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
