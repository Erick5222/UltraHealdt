import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalHistoryFiltersComponent } from './medical-history-filters.component';

describe('MedicalHistoryFiltersComponent', () => {
  let component: MedicalHistoryFiltersComponent;
  let fixture: ComponentFixture<MedicalHistoryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
