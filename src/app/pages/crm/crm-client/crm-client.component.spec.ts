import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmClientComponent } from './crm-client.component';

describe('CrmClientComponent', () => {
  let component: CrmClientComponent;
  let fixture: ComponentFixture<CrmClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
