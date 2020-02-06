import { Http } from '../Http';

const url: string = '/js-assignment/data.json';

export const getRoundsAdapter = <T>(): Promise<T> =>
   Http.get(url);