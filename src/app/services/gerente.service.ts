import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
  private apiUrl = 'http://api.example.com'; // Cambiar por la URL real de la API

  constructor(private http: HttpClient) {}

  getTiposGerente(): Observable<any[]> {
    // Código para funcionar sin backend
    return of([
      { CdTipoGerente: '1', NmTipoGerente: 'Tipo 1' },
      { CdTipoGerente: '2', NmTipoGerente: 'Tipo 2' }
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/tiposGerente`);
  }

  getGerentes(): Observable<any[]> {
    // Código para funcionar sin backend
    return of([
      {
        CdSeqGerente: 1,
        NmUsuGerente: 'gerente1',
        NmUsuarioCompleto: 'Gerente 1',
        DsNivelCompleto: 'Nivel 1',
        NmPolo: 'Polo 1',
        NmUnidade: 'Unidade 1',
        NmTipoGerente: 'Tipo 1'
      }
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/gerentes`);
  }

  

  incluirGerente(gerente: any): Observable<any> {
    // Código para funcionar sin backend
    return of(null);
    // return this.http.post(`${this.apiUrl}/incluirGerente`, gerente);
  }

  excluirGerente(gerente: any): Observable<any> {
    // Código para funcionar sin backend
    return of(null);
    // return this.http.post(`${this.apiUrl}/excluirGerente`, gerente);
  }
}