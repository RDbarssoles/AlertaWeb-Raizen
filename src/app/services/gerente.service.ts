import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
  private nextId = 0;
  private apiUrl = 'http://api.example.com'; // Cambiar por la URL real de la API

  private gerentesMock: any[] = [        // começa com um registro
    {
      CdSeqGerente: 1,
      NmUsuGerente: 'gerente1',
      NmUsuarioCompleto: 'Gerente 1',
      DsNivelCompleto: 'Nível 1',
      NmPolo: 'Polo 1',
      NmUnidade: 'Unidade 1',
      NmTipoGerente: 'Tipo 1',
    },
  ];

  constructor(private http: HttpClient) {}  

  getTiposGerente(): Observable<any[]> {
    // Código para funcionar sin backend
    return of([
      { CdTipoGerente: '1', NmTipoGerente: 'Tipo 1' },
      { CdTipoGerente: '2', NmTipoGerente: 'Tipo 2' }
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/tiposGerente`);
  }

  getPolos(): Observable<any[]> {
    // Código para funcionar sin backend
    return of([
      { CdPolo: '1', NmPolo: 'Polo 1' },
      { CdPolo: '2', NmPolo: 'Polo 2' }
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/tiposGerente`);
  }

  getUnidades(): Observable<any[]> {
    // Código para funcionar sin backend
    return of([
      { CdUnidade: '1', NmUnidade: 'Unidade 1' },
      { CdUnidade: '2', NmUnidade: 'Unidade 2' }
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/tiposGerente`);
  }

  getGerentes(): Observable<any[]> {
    // Código para funcionar sin backend
    return of([
      {
        CdSeqGerente: 1,
        NmUsuGerente: 'BotasTobias',
        NmUsuarioCompleto: 'Gerente 1',
        DsNivelCompleto: 'Nivel 1',
        NmPolo: 'Polo 1',
        NmUnidade: 'Unidade 1',
        NmTipoGerente: 'Tipo 1'
      }
    ]);
    // return this.http.get<any[]>(`${this.apiUrl}/gerentes`);
  }  

  /** POST – inclui novo gerente */
  incluirGerente(gerente: any): Observable<any> {
    // Emula auto-incremento
    
    const proxId = this.gerentesMock.length
      ? Math.max(...this.gerentesMock.map(g => g.CdSeqGerente)) + 1
      : 1;

    console.log('Incluindo gerente:', gerente);
    const registro = {
      CdSeqGerente: this.nextId++,
      NmUsuarioCompleto: gerente.NmUsuGerente,          // preencha se tiver este dado
      NmTipoGerente: this._traduzTipo(gerente.CdTipoGerente),                  // preencha se tiver este dado
      NmUsuGerente: gerente.CdNivelSequencial,
      DsNivelCompleto: gerente.CdTipoGerente == '1' ? 'Nível 1' : 'Nível 2',      // preencha se tiver este dado
      NmPolo: gerente.CdPolo,               // preencha se tiver este dado
      NmUnidade: gerente.CdUnidade,          // preencha se tiver este dado
      ...gerente,
    };

    this.gerentesMock.push(registro);
    return of(registro);               // devolve o que seria o retorno da API
  }

  /** DELETE – remove */
  excluirGerente(gerente: { CdSeqGerente: number }): Observable<any> {
    // Filtra fora o item cujo CdSeqGerente bate
    this.gerentesMock = this.gerentesMock.filter(
      g => g.CdSeqGerente !== gerente.CdSeqGerente
    );
    // Retorna um `of(null)` simulando que a API retornou sucesso sem payload
    return of(null);
  }


  private _traduzTipo(cd: string): string {
    const tipo = [
      { CdTipoGerente: '1', NmTipoGerente: 'Tipo 1' },
      { CdTipoGerente: '2', NmTipoGerente: 'Tipo 2' },
    ].find(t => t.CdTipoGerente === cd);
    return tipo?.NmTipoGerente || '';
  }
}