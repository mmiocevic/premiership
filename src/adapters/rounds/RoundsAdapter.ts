import { Http } from "../Http";

export const getRoundsAdapter = (url: string) => {
   return new Http().get(url);
};