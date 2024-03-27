import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {async} from "rxjs";
import {BurgerAppComponent} from "./burger-app/burger-app.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ BurgerAppComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
