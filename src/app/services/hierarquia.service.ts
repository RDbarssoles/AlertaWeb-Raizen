import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface NivelHierarquia {
  codigo: number;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class HierarquiaService {
  listarHierarquias(): Observable<NivelHierarquia[]> {
    return of([
      { codigo: 1, descricao: "Operacional" },
      { codigo: 2, descricao: "Tático" },
      { codigo: 3, descricao: "Estratégico" }
    ]);
  }
}