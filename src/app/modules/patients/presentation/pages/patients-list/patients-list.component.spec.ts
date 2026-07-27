import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsListComponent } from './patients-list.component';
import { PATIENTS_LIST_PAGE_SIZE } from './patients-list.config';

describe('PatientsListComponent', () => {
  let component: PatientsListComponent;
  let fixture: ComponentFixture<PatientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate patients', () => {
    expect(component['visiblePatients']().length).toBe(PATIENTS_LIST_PAGE_SIZE);
    component['goToPage'](2);
    expect(component['currentPage']()).toBe(2);
    expect(component['rangeStart']()).toBe(11);
    expect(component['rangeEnd']()).toBe(20);
  });
});
