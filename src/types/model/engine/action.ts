export interface Action {
    id: string;
    filter: () => boolean;
}
