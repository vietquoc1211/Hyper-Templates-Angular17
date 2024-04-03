import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProjectComponent } from './crm-project.component';

describe('CrmProjectComponent', () => {
  let component: CrmProjectComponent;
  let fixture: ComponentFixture<CrmProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
