import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerAppComponent } from './burger-app.component';
import { HttpClientModule } from '@angular/common/http';
import {BurgerAppService} from './burger-app.service';
import { of } from 'rxjs';
import { BurgerPlace } from './types';

describe('BurgerAppComponent', () => {
  let component: BurgerAppComponent;
  let fixture: ComponentFixture<BurgerAppComponent>;
  let burgerAppServiceSpy: jasmine.SpyObj<BurgerAppService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerAppComponent, HttpClientModule],
      providers: [
        {provide: BurgerAppService,
          useValue: jasmine.createSpyObj('BurgerAppService',
            ['getBurgerVenues', 'getBurgerVenuePhoto', 'getPicturesWithBurger'])}
      ]
    })
    .compileComponents();

    burgerAppServiceSpy = TestBed.inject(BurgerAppService) as jasmine.SpyObj<BurgerAppService>;
    fixture = TestBed.createComponent(BurgerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    burgerAppServiceSpy.getBurgerVenues.and.returnValue(of([]));
    burgerAppServiceSpy.getBurgerVenuePhoto.and.returnValue(of([]));
    burgerAppServiceSpy.getPicturesWithBurger.and.returnValue(of(""));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create excluded burger places list correctly', async () => {
    burgerAppServiceSpy.getBurgerVenues.and.returnValue(of({results: excludedBurgerPlacesDataMock}));
    await component.getExcludedBurgerPlaces();
    expect(component.excludedBurgerPlaces).toEqual(excludedBurgerPlacesMock);
  });

  it('should create all burger places list correctly', async () => {
    burgerAppServiceSpy.getBurgerVenues.and.returnValue(of({results: allBurgerPlacesDataMock}));
    await component.getAllBurgerPlaces();
    expect(component.allBurgerPlaces).toEqual(allBurgerPlacesMock);
  });

  it('should return pic with burger', () => {
    burgerAppServiceSpy.getPicturesWithBurger.and.returnValue(of({urlWithBurger: "image-with-burger" }));
    component.isPictureWithBurger(mockUrls, "1");
    expect(component.burgerPlacesPhotos).toEqual(  [{
      id: "1",
      picture: "image-with-burger",
      isBurgerPicture: true
    }]);
  });
});

const mockUrls: any = ["image-with-no-burger", "image-with-burger"];

const excludedBurgerPlacesDataMock: any = [
  {
    fsq_id: "1",
    name: "burger",
    geocodes: {main: {latitude: 30, longitude: 50}}
  }
];

const allBurgerPlacesDataMock: any = [
  ...excludedBurgerPlacesDataMock,
  {
    fsq_id: "2",
    name: "burgers",
    geocodes: {main: {latitude: 40, longitude: 560}}
  }];

const excludedBurgerPlacesMock: BurgerPlace[] = [
  {
    id: "1",
    name: "burger",
    location: {lat: 30, lng: 50}
  }
];

const allBurgerPlacesMock: BurgerPlace[] = [
  ...excludedBurgerPlacesMock,
  {
    id: "2",
    name: "burgers",
    location: {lat: 40, lng: 560}
  }
];
