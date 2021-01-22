import http from "../http-common";
import authHeader from './auth.header';


class DataService {
    getAll() {
        return http.get("/User");
    }

    get(UserID) {
        return http.get(`/User/${UserID}`);
    }

    create(data) {
        return http.post("/User", data);
    }

    update(UserID, data) {
        return http.put(`/User/${UserID}`, data);
    }

    delete(UserID) {
        return http.delete(`/User/${UserID}`);
    }


    getPublicContent() {
        return http.get('/LandingPage');
    }

    getTeilnehmerBoard() {
        return http.get('/Teilnehmer', { headers: authHeader() });
    }

    getVeranstalterBoard() {
        return http.get('/Veranstalter', { headers: authHeader() });
    }

    getManagementBoard() {
        return http.get('/Management', { headers: authHeader() });
    }

    getAdminBoard() {
        return http.get('/Admin', { headers: authHeader() });
    }


}

export default new DataService();