import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGerenteComponent } from './cadastro-gerente.component';

describe('CadastroGerente', () => {
  let component: CadastroGerenteComponent;
  let fixture: ComponentFixture<CadastroGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroGerenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
