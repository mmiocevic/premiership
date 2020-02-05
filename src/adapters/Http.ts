import axios from 'axios';

export class Http {
   public get = async(url: string) => {
      try {
         const response = await axios.get(url);
         return response.data;
      }
      catch (e) {
         // TODO MM
      }
   };
};