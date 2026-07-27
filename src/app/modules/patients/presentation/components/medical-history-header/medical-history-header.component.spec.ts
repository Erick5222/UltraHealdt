import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalHistoryHeaderComponent } from './medical-history-header.component';

describe('MedicalHistoryHeaderComponent', () => {
  let component: MedicalHistoryHeaderComponent;
  let fixture: ComponentFixture<MedicalHistoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
