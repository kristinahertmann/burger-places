export interface Position {
  readonly lat: number;
  readonly lng: number;
}

export interface BurgerPlace {
  id: string;
  name: string;
  location: Position;
}

export interface BurgerPlacePhoto {
  id: string;
  picture: string;
  isBurgerPicture: boolean;
}
