import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEntranceComponent } from './contract-entrance.component';

describe('ContractEntranceComponent', () => {
  let component: ContractEntranceComponent;
  let fixture: ComponentFixture<ContractEntranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractEntranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
