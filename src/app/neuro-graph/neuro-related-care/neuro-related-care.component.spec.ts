import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuroRelatedCareComponent } from './neuro-related-care.component';

describe('NeuroRelatedCareComponent', () => {
  let component: NeuroRelatedCareComponent;
  let fixture: ComponentFixture<NeuroRelatedCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuroRelatedCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuroRelatedCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
