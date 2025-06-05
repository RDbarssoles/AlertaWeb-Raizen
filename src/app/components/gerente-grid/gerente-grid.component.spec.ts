import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteGridComponent } from './gerente-grid.component';

describe('GerenteGrid', () => {
  let component: GerenteGridComponent;
  let fixture: ComponentFixture<GerenteGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
