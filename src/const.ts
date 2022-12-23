export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/:page',
  Item = '/item',
  ItemId = '/item/:id',
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

export enum QueryParams {
  Sort = '_sort',
  Order = '_order',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export enum SortCategory {
  Price = 'price',
  Rating = 'rating',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum CameraCategory {
  Photo = 'Фотоаппарат',
  Video = 'Видеокамера',
}

export enum CameraType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export enum CameraLevel {
  Novice = 'Нулевой',
  Amateur = 'Любительский',
  Pro = 'Профессиональный',
}

export enum Settings {
  CardsOnPageNumber = 9,
  PaginationStep = 1,
  InitialPageNumber = 1,
  SimilarCardsNumber = 3,
  SliderStep = 1,
  MaxItemQuantity = 99,
  MinItemQuantity = 1,
}
