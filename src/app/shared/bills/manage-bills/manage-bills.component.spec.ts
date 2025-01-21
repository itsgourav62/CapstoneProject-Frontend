import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBillsComponent } from './manage-bills.component';

describe('ManageBillsComponent', () => {
  let component: ManageBillsComponent;
  let fixture: ComponentFixture<ManageBillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBillsComponent]
    });
    fixture = TestBed.createComponent(ManageBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
