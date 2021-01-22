import http from "../http-common";

class DataService {
   getAllManager() {
       return http.get("/Abrechnung");
   }
  /* getAllVeranstalter() {
       return http.get("/Abrechnung/Veranstalter");
   }*/

}

export default new DataService();