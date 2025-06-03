import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hierarquia } from './hierarquia';

describe('Hierarquia', () => {
  let component: Hierarquia;
  let fixture: ComponentFixture<Hierarquia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hierarquia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hierarquia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
