import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaClientesComponent } from './vista-clientes.component';

describe('VistaClientesComponent', () => {
  let component: VistaClientesComponent;
  let fixture: ComponentFixture<VistaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
