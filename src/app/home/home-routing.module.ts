import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FormColaboradorComponent } from '../form-colaborador/form-colaborador.component';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';
import { EquipesComponent } from '../equipes/equipes.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'cadastro',
    component: FormColaboradorComponent,
  },
  {
    path: 'editar/:id',
    component: FormColaboradorComponent,
  },
  {
    path: 'colaboradores',
    component: ColaboradoresComponent,
  },
  {
    path: 'equipes',
    component: EquipesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
