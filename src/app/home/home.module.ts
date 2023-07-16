import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FormColaboradorComponent } from '../form-colaborador/form-colaborador.component';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MaskitoModule,
  ],
  declarations: [HomePage, FormColaboradorComponent, ColaboradoresComponent
  ]
})
export class HomePageModule {}
