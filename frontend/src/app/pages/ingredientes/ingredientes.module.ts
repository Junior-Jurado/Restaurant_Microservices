import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientesRoutingModule } from './ingredientes-routing.module';
import { IngredientesComponent } from './ingredientes.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';


@NgModule({
  declarations: [
    IngredientesComponent,
    IngredienteComponent
  ],
  imports: [
    CommonModule,
    IngredientesRoutingModule
  ]
})
export class IngredientesModule { }
