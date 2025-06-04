import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoGerente } from '../../models/tipo-gerente.model';
import { GerenteService } from '../../services/gerente.service';
import { MensageriaService } from '../../services/mensageria.service';
import { ViewGerente } from '../../models/view-gerente.model';
import { Gerente } from '../../models/gerente.model';

@Component({
  selector: 'app-gerente-form',
  templateUrl: './gerente-form.component.html',
  standalone: false,
  styleUrls: ['./gerente-form.component.css']
})
export class GerenteFormComponent implements OnInit {
  @Input() tipos: TipoGerente[] = [];
  @Input() gerente: ViewGerente | null = null;
  @Output() salvou = new EventEmitter<void>();
  @Output() cancelou = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gerenteService: GerenteService,
    private msgService: MensageriaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      NmUsuGerente: [this.gerente?.NmUsuGerente || '', Validators.required],
      CdTipoGerente: [this.gerente?.NmTipoGerente || '', Validators.required],
      // Adapte para adicionar hierarquia depois
      CdSeqNivel: [1],
      CdSeqPolo: [10],
      CdSeqUnidade: [20],
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.msgService.erro('Preencha todos os campos obrigatórios!');
      return;
    }
    const novo: Gerente = this.form.value;
    this.gerenteService.incluirGerente([novo]).subscribe(() => {
      this.salvou.emit();
      this.form.reset();
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}