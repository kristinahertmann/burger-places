import { TestBed } from '@angular/core/testing';

import { BurgerAppService } from './burger-app.service';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment } from '../environments/environment.development';
import { bussijaamCoordinates, tartuCoordinates } from './constants';

describe('BurgerAppService', () => {
  let service: BurgerAppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BurgerAppService]
    })
      .compileComponents();
    service = TestBed.inject(BurgerAppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return burger venues', () => {
    const getParamas = {
      ll: tartuCoordinates.lat + ',' + tartuCoordinates.lng,
      query: 'burger',
      limit: 50,
      radius: 10000
    }
    const FQBurgerVenuesURL: string =
      `${environment.FSApiUrl}search?ll=${getParamas.ll}&query=${getParamas.query}&limit=${getParamas.limit}&radius=${getParamas.radius}`;
    const venueList: any[] = [];
    service.getBurgerVenues().subscribe({next: venues => {
        expect(venues).toEqual(venueList);
      }
    });
    const req = httpTestingController.expectOne(FQBurgerVenuesURL);
    expect(req.request.method).toEqual('GET');
    req.flush(venueList);
  })

  it('should return burger venues inside of the 1km radius from bussijaam', () => {
    const getParamas = {
      ll: bussijaamCoordinates.lat + ',' + bussijaamCoordinates.lng,
      query: 'burger',
      limit: 50,
      radius: 1000
    }
    const FQBurgerVenuesURL: string =
      `${environment.FSApiUrl}search?ll=${getParamas.ll}&query=${getParamas.query}&limit=${getParamas.limit}&radius=${getParamas.radius}`;
    const venueList: any[] = [];
    service.getBurgerVenues(true).subscribe({next: venues => {
        expect(venues).toEqual(venueList);
      }
    });
    const req = httpTestingController.expectOne(FQBurgerVenuesURL);
    expect(req.request.method).toEqual('GET');
    req.flush(venueList);
  })

  it('should return burger venue pictures', () => {
    const burgerPlaceId: string = "1";
    const FQBurgerVenuePhotosURL: string =
      `${environment.FSApiUrl}${burgerPlaceId}/photos`;
    const photoList: any[] = [];
    service.getBurgerVenuePhoto(burgerPlaceId).subscribe({next: photos => {
        expect(photos).toEqual(photoList);
      }
    });
    const req = httpTestingController.expectOne(FQBurgerVenuePhotosURL);
    expect(req.request.method).toEqual('GET');
    req.flush(photoList);
  })

  it('should return burger picture from list of pictures', () => {
    const urls: string[] = ["image1", "image2"];
    const imageWithBurger: string = "";
    const imageRecUrl: string = "https://73kh1kvgx4.execute-api.eu-west-1.amazonaws.com/prod/recognize";
    service.getPicturesWithBurger(urls).subscribe({next: url => {
        expect(url).toEqual(imageWithBurger);
      }
    });
    const req = httpTestingController.expectOne(imageRecUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(imageWithBurger);
  })
});
