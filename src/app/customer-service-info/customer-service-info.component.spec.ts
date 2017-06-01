import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceInfoComponent } from './customer-service-info.component';

describe('CustomerServiceInfoComponent', () => {
  let component: CustomerServiceInfoComponent;
  let fixture: ComponentFixture<CustomerServiceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerServiceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
