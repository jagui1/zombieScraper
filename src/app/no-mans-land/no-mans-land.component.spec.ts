import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMansLandComponent } from './no-mans-land.component';

describe('NoMansLandComponent', () => {
  let component: NoMansLandComponent;
  let fixture: ComponentFixture<NoMansLandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMansLandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMansLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
