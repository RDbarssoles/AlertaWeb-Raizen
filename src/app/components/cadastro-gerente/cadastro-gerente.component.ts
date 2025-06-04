import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { GerenteService } from '../../services/gerente.service';
import { Gerente } from '../../models/gerente.model';

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html',
  standalone:false,
  styleUrls: ['./cadastro-gerente.component.css']
})
export class CadastroGerenteComponent implements OnInit {
  gerenteForm: FormGroup;
  validacoes: string[] = [];
  gridData: any[] = [];
  tiposGerente: any[] = [];
  hierarquia: any = {};
  // → Em vez de simplesmente any[], usamos MatTableDataSource para integração com MatPaginator/MatSort
  dataSource = new MatTableDataSource<any>([]);
  // Para seleção múltipla de linhas (caso queira “Enviar notificação…” aos selecionados)
  selection = new SelectionModel<any>(true, []);

  // Referências ao paginator e ao sort declarados no template
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    this.loadTiposGerente();
    this.loadGridData();
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

   loadGridData() {
    this.gerenteService.getGerentes().subscribe(data => {
      // Preenche o dataSource com os dados vindos da API
      this.dataSource.data = data;
    });
  }

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
  }/** Ação ao clicar em “Salvar” */
  gravarUsuario() {
    if (this.validar()) {
      const payload = this.gerenteForm.value;
      this.gerenteService.incluirGerente(payload).subscribe(() => {
        this.loadGridData();
        this.snackBar.open('Ação efetuada com sucesso.', 'OK', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.gerenteForm.reset();
        this.selection.clear();
      }, error => {
        this.snackBar.open(`Erro ao salvar: ${error.message}`, 'OK', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      });
    } else {
      this.snackBar.open('Existem erros no formulário.', 'OK', {
        duration: 3000,
        panelClass: ['snackbar-warn']
      });
    }
  }

  /** Ação ao clicar em “Excluir” em cada linha */
  removerGerente(row: any) {
    if (confirm('Deseja realmente remover esse Revisor?')) {
      this.gerenteService.excluirGerente(row).subscribe(() => {
        this.loadGridData();
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