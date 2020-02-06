import axios from 'axios';

export class Http {
   public static get = async(url: string) => {
      try {
         const response = await axios.get(url);
         return response.data;
      }
      catch (e) {
         return await Promise.reject(e);
      }
   };
};