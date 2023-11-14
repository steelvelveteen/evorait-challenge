import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialItemDetailsComponent } from './material-item-details.component';

describe('MaterialItemDetailsComponent', () => {
  let component: MaterialItemDetailsComponent;
  let fixture: ComponentFixture<MaterialItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialItemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
