import { Http } from '../Http';

export const getRoundsAdapter = (url: string) =>
   new Http().get(url);