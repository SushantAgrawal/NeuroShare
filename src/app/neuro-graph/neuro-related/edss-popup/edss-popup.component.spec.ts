import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdssPopupComponent } from './edss-popup.component';

describe('EdssPopupComponent', () => {
  let component: EdssPopupComponent;
  let fixture: ComponentFixture<EdssPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdssPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdssPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
