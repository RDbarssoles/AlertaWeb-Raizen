import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Gerente } from '../models/gerente.model';
import { ViewGerente } from '../models/view-gerente.model';
import { TipoGerente } from '../models/tipo-gerente.model';
import { Usuario } from '../models/usuario.model';
import { delay, map } from 'rxjs/operators';

// Dados MOCK
const MOCK_TIPOS: TipoGerente[] = [
  { CdTipoGerente: 1, NmTipoGerente: 'Nível 1' },
  { CdTipoGerente: 2, NmTipoGerente: 'Nível 2' },
];

const MOCK_USUARIOS: Usuario[] = [
  { NmUsuario: 'tr001', NmUsuarioCompleto: 'José Supervisor', NmUsuNome: 'tr001 - José Supervisor', DsEmail: 'jose@empresa.com', NmCargo: 'Supervisor' },
  { NmUsuario: 'cs123', NmUsuarioCompleto: 'Maria Gerente', NmUsuNome: 'cs123 - Maria Gerente', DsEmail: 'maria@empresa.com', NmCargo: 'Gerente' },
];

let gerenteCounter = 2;

@Injectable({ providedIn: 'root' })
export class GerenteService {
  private _gerentes = new BehaviorSubject<ViewGerente[]>([
    {
      CdSeqGerente: 1,
      NmUsuGerente: 'tr001',
      NmUsuarioCompleto: 'José Supervisor',
      CdSeqNivel: 1,
      DsNivelCompleto: 'Operacional',
      CdSeqPolo: 10,
      NmPolo: 'Polo A',
      CdSeqUnidade: 20,
      NmUnidade: 'Unidade X',
      NmTipoGerente: 'Nível 1'
    }
  ]);

  get gerentes$(): Observable<ViewGerente[]> {
    return this._gerentes.asObservable();
  }

  listar(): Observable<ViewGerente[]> {
    return this.gerentes$.pipe(delay(400));
  }

  listarTipos(): Observable<TipoGerente[]> {
    return of(MOCK_TIPOS).pipe(delay(300));
  }

  listarUsuarios(identificacaoUsuario: string): Observable<Usuario[]> {
    let filtrados = MOCK_USUARIOS.filter(u =>
      u.NmUsuario.toLowerCase().includes(identificacaoUsuario.toLowerCase()) ||
      u.NmUsuarioCompleto.toLowerCase().includes(identificacaoUsuario.toLowerCase())
    );
    return of(filtrados).pipe(delay(300));
  }

  incluir(gerentes: Gerente[]): Observable<void> {
    const atual = this._gerentes.getValue();
    gerentes.forEach(g => {
      gerenteCounter++;
      atual.push({
        CdSeqGerente: gerenteCounter,
        NmUsuGerente: g.NmUsuGerente,
        NmUsuarioCompleto: MOCK_USUARIOS.find(u => u.NmUsuario === g.NmUsuGerente)?.NmUsuarioCompleto || g.NmUsuGerente,
        CdSeqNivel: g.CdSeqNivel || 1,
        DsNivelCompleto: 'Operacional',
        CdSeqPolo: g.CdSeqPolo || 10,
        NmPolo: 'Polo A',
        CdSeqUnidade: g.CdSeqUnidade || 20,
        NmUnidade: 'Unidade X',
        NmTipoGerente: MOCK_TIPOS.find(t => t.CdTipoGerente === Number(g.CdTipoGerente))?.NmTipoGerente || 'Nível 1'
      });
    });
    this._gerentes.next([...atual]);
    return of(undefined).pipe(delay(350));
  }

  excluir(gerentes: Gerente[]): Observable<void> {
    const atual = this._gerentes.getValue().filter(
      g => !gerentes.some(r => r.CdSeqGerente === g.CdSeqGerente)
    );
    this._gerentes.next(atual);
    return of(undefined).pipe(delay(350));
  }
}