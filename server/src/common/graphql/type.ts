export type IQueryFieldInput<T = string> =
  | T
  | { eq?: T; ne?: T; gt?: T; gte?: T; lt?: T; lte?: T; in?: [T]; nin?: [T] };
