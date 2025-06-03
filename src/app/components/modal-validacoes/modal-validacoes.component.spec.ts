import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidacoes } from './modal-validacoes';

describe('ModalValidacoes', () => {
  let component: ModalValidacoes;
  let fixture: ComponentFixture<ModalValidacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalValidacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValidacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
