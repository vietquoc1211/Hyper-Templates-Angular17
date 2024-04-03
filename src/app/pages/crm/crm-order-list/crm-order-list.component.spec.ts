import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmOrderListComponent } from './crm-order-list.component';

describe('CrmOrderListComponent', () => {
  let component: CrmOrderListComponent;
  let fixture: ComponentFixture<CrmOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
