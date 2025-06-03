import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MensageriaService {
  constructor(private snackBar: MatSnackBar) {}

  sucesso(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', { duration: 3000, panelClass: 'snackbar-success' });
  }

  erro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', { duration: 4000, panelClass: 'snackbar-error' });
  }
}