export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  CatalogStart = '/catalog/1',
  CatalogPage = '/catalog/:page',
  Item = '/item',
  ItemId = '/item/:id',
  ItemTab = '/item/:id/:tab',
  Basket = '/basket',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum NameSpace {
  Data = 'DATA',
  Basket = 'BASKET',
}

export enum RequestStatus {
  NotStarted,
  Loading,
  Success,
  Error,
}

export enum Tab {
  Description = 'description',
  Specs = 'specs',
}

export enum Settings {
  CardsOnPageNumber = 9,
  PaginationStep = 1,
  InitialPageNumber = 1,
  SimilarCardsNumber = 3,
  SliderStep = 1,
}
