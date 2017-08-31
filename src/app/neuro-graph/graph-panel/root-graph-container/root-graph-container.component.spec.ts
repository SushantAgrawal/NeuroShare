import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootGraphContainerComponent } from './root-graph-container.component';

describe('RootGraphContainerComponent', () => {
  let component: RootGraphContainerComponent;
  let fixture: ComponentFixture<RootGraphContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootGraphContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootGraphContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
