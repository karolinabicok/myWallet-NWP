import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBalanceComponent } from './change-balance.component';

describe('ChangeBalanceComponent', () => {
  let component: ChangeBalanceComponent;
  let fixture: ComponentFixture<ChangeBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
