import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroGerenteComponent } from './components/cadastro-gerente/cadastro-gerente.component';

export const routes: Routes = [
  { path: 'cadastro-gerente', component: CadastroGerenteComponent },
  { path: '', redirectTo: '/cadastro-gerente', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}