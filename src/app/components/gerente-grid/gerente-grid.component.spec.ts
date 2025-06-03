import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteGrid } from './gerente-grid';

describe('GerenteGrid', () => {
  let component: GerenteGrid;
  let fixture: ComponentFixture<GerenteGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
