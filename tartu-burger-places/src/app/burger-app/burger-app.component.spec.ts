import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerAppComponent } from './burger-app.component';

describe('BurgerAppComponent', () => {
  let component: BurgerAppComponent;
  let fixture: ComponentFixture<BurgerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurgerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
