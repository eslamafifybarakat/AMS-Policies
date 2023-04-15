import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToPayModalComponent } from './want-to-pay-modal.component';

describe('WantToPayModalComponent', () => {
  let component: WantToPayModalComponent;
  let fixture: ComponentFixture<WantToPayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WantToPayModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WantToPayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
