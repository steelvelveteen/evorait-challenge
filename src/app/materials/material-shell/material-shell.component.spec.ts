import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialShellComponent } from './material-shell.component';

describe('MaterialShellComponent', () => {
  let component: MaterialShellComponent;
  let fixture: ComponentFixture<MaterialShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
