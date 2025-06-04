import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewGerente } from '../../models/view-gerente.model';

@Component({
  selector: 'app-gerente-grid',
  templateUrl: './gerente-grid.component.html',
  standalone: false,
  styleUrls: ['./gerente-grid.component.css']
})
export class GerenteGridComponent {
  @Input() gerentes: ViewGerente[] = [];
  @Output() editar = new EventEmitter<ViewGerente>();

  onEdit(gerente: ViewGerente) {
    this.editar.emit(gerente);
  }
}