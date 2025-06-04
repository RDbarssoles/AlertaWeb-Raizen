
// Angular Materrial
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Angular Core
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Components
import { CadastroGerenteComponent } from './components/cadastro-gerente/cadastro-gerente.component';
import { GerenteFormComponent } from './components/gerente-form/gerente-form.component';
import { AppComponent } from './app.component';
import { GerenteGridComponent } from './components/gerente-grid/gerente-grid.component';
import { HierarquiaComponent } from './components/hierarquia/hierarquia.component';
import { ModalValidacoesComponent } from './components/modal-validacoes/modal-validacoes.component';
import { GerenteService } from './services/gerente.service';

// Modules
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CadastroGerenteComponent,
    GerenteGridComponent,
    GerenteFormComponent,
    GerenteGridComponent,
    HierarquiaComponent,
    ModalValidacoesComponent,
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    RouterModule,
    HttpClientModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [GerenteService],
  bootstrap: [AppComponent]
})
export class AppModule { }