import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientesComponent } from './ingredientes.component';

const routes: Routes = [{ path: '', component: IngredientesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientesRoutingModule { }
