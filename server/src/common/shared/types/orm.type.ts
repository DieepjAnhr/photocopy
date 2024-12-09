export type FilterOption<T> = {
    [P in keyof T]?: {
        eq?: T[P];
        ne?: T[P];
        lt?: T[P];
        lte?: T[P];
        gt?: T[P];
        gte?: T[P];
        in?: T[P][];
        nin?: T[P][];
        contains?: string;
        start_with?: string;
        end_with?: string;
    }
}