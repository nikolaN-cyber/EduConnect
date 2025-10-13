import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEngagementComponent } from './my-engagement.component';

describe('MyEngagementComponent', () => {
  let component: MyEngagementComponent;
  let fixture: ComponentFixture<MyEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEngagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
