import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ingredientes',
    loadChildren: () =>
      import('./pages/ingredientes/ingredientes.module').then(
        (m) => m.IngredientesModule
      ),
  },
  { path: 'recipes', loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'orders', loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'random', loadChildren: () => import('./pages/random/random.module').then(m => m.RandomModule) },
  { path: 'shoping', loadChildren: () => import('./pages/shopping/shopping.module').then(m => m.ShoppingModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
