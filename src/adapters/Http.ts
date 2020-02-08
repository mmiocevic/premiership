import axios from 'axios';

export class Http {
   public static get = async <T>(url: string): Promise<T> => {
      try {
         const response = await axios.get(url);
         return response.data;
      }
      catch (e) {
         return await Promise.reject(e);
      }
   };
};