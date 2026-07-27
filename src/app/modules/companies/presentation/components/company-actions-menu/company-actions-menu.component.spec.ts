import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CompanyActionsMenuComponent } from './company-actions-menu.component';

describe('CompanyActionsMenuComponent', () => {
  let component: CompanyActionsMenuComponent;
  let fixture: ComponentFixture<CompanyActionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyActionsMenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('companyId', '1');
    fixture.componentRef.setInput('status', 'active');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
