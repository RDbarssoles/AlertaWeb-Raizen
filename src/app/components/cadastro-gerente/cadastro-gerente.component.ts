import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { GerenteService } from '../../services/gerente.service';
import { Gerente } from '../../models/gerente.model';
import { MatTable } from '@angular/material/table'

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html',
  standalone:false,
  styleUrls: ['./cadastro-gerente.component.css']
})
export class CadastroGerenteComponent implements OnInit, AfterViewInit {
  gerenteForm: FormGroup;

  
  validacoes: string[] = [];
  gridData: any[] = [];
  polos: { CdPolo: string; NmPolo: string }[] = [];       // <— declaração da lista de polos
  unidades: { CdUnidade: string; NmUnidade: string }[] = []; // <— (opcional) lista de unidades
  tiposPolos: any[] = [];
  tiposGerente: any[] = [];
  hierarquia: any = {};
  // → Em vez de simplesmente any[], usamos MatTableDataSource para integração com MatPaginator/MatSort
  dataSource = new MatTableDataSource<any>([]);
  // Para seleção múltipla de linhas (caso queira “Enviar notificação…” aos selecionados)
  selection = new SelectionModel<any>(true, []);

  // Referências ao paginator e ao sort declarados no template
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = [
    'select',
    'CdSeqGerente',
    'NmUsuGerente',
    'NmUsuarioCompleto',
    'DsNivelCompleto',
    'NmPolo',
    'NmUnidade',
    'NmTipoGerente',
    'acoes'
  ];

  constructor(
    private fb: FormBuilder,
    private gerenteService: GerenteService,
    private snackBar: MatSnackBar
  ) {
    this.gerenteForm = this.fb.group({
      gerente: ['', Validators.required],
      tipoGerente: ['', Validators.required],
      hierarquia: this.fb.group({
        sequencialCompleto: [''],
        polo: [null],
        unidade: [null]
      })
    });
  }

    ngOnInit(): void {
    // → Carrega polos mockados
    this.gerenteService.getPolos().subscribe(polosApi => {
      this.polos = polosApi;
      console.log('Polos carregados:', this.polos);
    });

    this.gerenteService.getUnidades().subscribe(unidadesApi => {
      this.unidades = unidadesApi;
      console.log('Unidades carregadas:', this.unidades);
    });
      
    this.loadTiposGerente(); 
    //this.loadGridData();
  }

  

  ngAfterViewInit(): void {
    // → Após a visualização, conecte o paginator e o sort ao dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTiposGerente() {
    this.gerenteService.getTiposGerente().subscribe(data => {
      this.tiposGerente = data;
    });
  }

  focarFormulario(){
    console.log('Focando no formulário');
  }
  // → Exemplo de método para carregar os dados da tabela (grid)
  // Caso esteja usando uma API real, descomente e ajuste conforme necessário
  /// AQUI CHAMA A API
  
  //  loadGridData() {
  //   this.gerenteService.getGerentes().subscribe(data => {
  //     // Preenche o dataSource com os dados vindos da API
  //     this.dataSource.data = data;
  //   });
  // }

  /** Validação manual para exibir mensagens no painel de validações */
  validar(): boolean {
    this.validacoes = [];
    if (this.gerenteForm.invalid) {
      Object.keys(this.gerenteForm.controls).forEach(key => {
        const control = this.gerenteForm.get(key);
        if (control && control.invalid && control.errors) {
          Object.keys(control.errors).forEach(keyError => {
            // Exemplo de mensagem em português
            this.validacoes.push(`${this._rotuloCampo(key)} é obrigatório`);
          });
        }
      });
      return false;
    }
    return true;
  }

   /** Traduzir o nome do campo para algo mais legível */
  private _rotuloCampo(chave: string): string {
    switch (chave) {
      case 'gerente': return 'Revisor';
      case 'tipoGerente': return 'Nível do Revisor';
      default: return chave;
    }
  }
  
  /** Ação ao clicar em “Salvar” */
  gravarUsuario(): void {

    // 1) Gatilho de validação visual
    if (!this.validar()) {
      this.snackBar.open('Existem erros no formulário.', 'OK', {
        duration: 3000,
        panelClass: ['snackbar-warn'],
      });
      return;
    }

    // 2) Monta DTO no formato que a API (ou o mock) entende
    const form = this.gerenteForm.value;

    // → Ajuste: hierarquia aninhada vira campos flat (exemplo)
    const dto = {
      NmUsuGerente:        form.gerente.trim(),
      CdTipoGerente:       form.tipoGerente,
      CdNivelSequencial:   form.hierarquia.sequencialCompleto || null,
      CdPolo:              form.hierarquia.polo               || null,
      CdUnidade:           form.hierarquia.unidade            || null,
    } as Gerente;                    

    // 3) Chama service
    this.gerenteService.incluirGerente(dto).subscribe({
      next: (novoGerente) => {
        /* ①  Acrescenta o retorno na tabela */
        this.dataSource.data = [...this.dataSource.data, novoGerente];   // ← cria novo array ➜ dispara CD
        // opcional, se usar paginator:
        this.dataSource._updateChangeSubscription();

        /* ②  Feedback & limpeza */
        this.snackBar.open('Gerente salvo com sucesso!', 'OK', { duration: 3000, panelClass: ['snackbar-success'] });
        this.gerenteForm.reset();
        this.selection.clear();
      },
      error: (err) => {
        this.snackBar.open(`Erro ao salvar: ${err.message}`, 'OK', { duration: 4000, panelClass: ['snackbar-error'] });
      }
    });
  }

  /* Helper para transformar o formulário no formato que a API espera */
private _montarDto(form: any): Gerente {
  return {
    // ← campos que vão para o back-end
    NmUsuGerente:        form.gerente.trim(),
    CdTipoGerente:       form.tipoGerente,
    CdNivelSequencial:   form.hierarquia.sequencialCompleto || null,
    CdPolo:              form.hierarquia.polo               || null,
    CdUnidade:           form.hierarquia.unidade            || null,
  };
}

private _montarRegistroGrid(dto: Gerente, seq: number): any {
  return {
    // ← campos que a mat-table espera
    CdSeqGerente:   seq,
    NmUsuGerente:   dto.NmUsuGerente,
    NmUsuarioCompleto: this._buscarNomeCompleto(dto.NmUsuGerente),
    DsNivelCompleto:   this._gerarDescricaoNivel(dto),
    NmPolo:            this._nomePolo(dto.CdPolo),
    NmUnidade:         this._nomeUnidade(dto.CdUnidade),
    NmTipoGerente:     this._nomeTipo(dto.CdTipoGerente),
  };
}
  _buscarNomeCompleto(NmUsuGerente: string) {
    throw new Error('Method not implemented.');
  }
  _gerarDescricaoNivel(dto: Gerente) {
    throw new Error('Method not implemented.');
  }
  _nomePolo(CdPolo: number | undefined) {
    throw new Error('Method not implemented.');
  }
  _nomeUnidade(CdUnidade: number | undefined) {
    throw new Error('Method not implemented.');
  }
  _nomeTipo(CdTipoGerente: string | number) {
    throw new Error('Method not implemented.');
  }

  /** Ação ao clicar em “Excluir” em cada linha */
  removerGerente(row: any) {
    if (confirm('Deseja realmente remover esse Revisor?')) {
      this.gerenteService.excluirGerente(row).subscribe(() => {
        //this.loadGridData();
        this.snackBar.open('Exclusão efetuada com sucesso.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.selection.deselect(row);
      }, error => {
        this.snackBar.open(`Erro na exclusão: ${error.message}`, 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      });
    }
  }

  /** Retorna se todas as linhas estão selecionadas */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Seleciona todas as linhas, se estiverem todas selecionadas, desmarca todas */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Filtro básico (caso queira buscar por login ou nome) */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /** Exemplo de ação “Enviar notificação” aos selecionados */
  enviarNotificacaoSelecionados() {
    const selecionados = this.selection.selected;
    if (selecionados.length === 0) {
      this.snackBar.open('Selecione ao menos um revisor.', 'OK', {
        duration: 2500,
        panelClass: ['snackbar-warn']
      });
      return;
    }
    // Aqui você chamaria seu service enviando notificação aos selecionados
    // Exemplo fictício:
    // this.gerenteService.enviarNotificacao(selecionados).subscribe(() => { … })
    this.snackBar.open(`Enviada notificação a ${selecionados.length} revisor(es).`, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
}