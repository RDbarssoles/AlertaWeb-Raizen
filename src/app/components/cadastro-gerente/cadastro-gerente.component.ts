import { Component, OnInit } from '@angular/core';
import { GerenteService } from '../../services/gerente.service';
import { TipoGerente } from '../../models/tipo-gerente.model';
import { ViewGerente } from '../../models/view-gerente.model';
import { MensageriaService } from '../../services/mensageria.service';

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html',
  styleUrls: ['./cadastro-gerente.component.scss']
})
export class CadastroGerenteComponent implements OnInit {
  gerentes: ViewGerente[] = [];
  tipos: TipoGerente[] = [];
  selecionado: ViewGerente | null = null;
  abrirForm = false;

  constructor(
    private gerenteService: GerenteService,
    private msgService: MensageriaService
  ) {}

  ngOnInit(): void {
    this.gerenteService.listar().subscribe(gs => this.gerentes = gs);
    this.gerenteService.listarTipos().subscribe(ts => this.tipos = ts);
  }

  novoGerente() {
    this.selecionado = null;
    this.abrirForm = true;
  }

  editarGerente(gerente: ViewGerente) {
    this.selecionado = gerente;
    this.abrirForm = true;
  }

  aoSalvar() {
    this.abrirForm = false;
    this.msgService.sucesso('Gerente salvo com sucesso!');
    this.gerenteService.listar().subscribe(gs => this.gerentes = gs);
  }

  aoCancelar() {
    this.abrirForm = false;
    this.selecionado = null;
  }
}