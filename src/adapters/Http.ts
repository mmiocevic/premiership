import axios from 'axios';

export class Http {
   private config = {
   };

   public get = async(url: string) => {
      try {
         const response = await axios.get(url, this.config);
         return response.data;
      }
      catch (e) {
         // TODO MM
      }
   };
};