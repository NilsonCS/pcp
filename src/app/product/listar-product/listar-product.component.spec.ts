import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductComponent } from './listar-product.component';

describe('ListarProductComponent', () => {
  let component: ListarProductComponent;
  let fixture: ComponentFixture<ListarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
