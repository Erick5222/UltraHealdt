import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RipsComponent } from './rips.component';

describe('RipsComponent', () => {
  let component: RipsComponent;
  let fixture: ComponentFixture<RipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
