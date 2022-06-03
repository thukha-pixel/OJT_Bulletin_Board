import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCVComponent } from './upload-cv.component';

describe('UploadCVComponent', () => {
  let component: UploadCVComponent;
  let fixture: ComponentFixture<UploadCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
