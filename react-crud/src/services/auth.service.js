import http from "../http-common";

class AuthService {
    login(Email, Passwort) {
        return http.post("Login", {Email, Passwort})
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('User', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('User');
    }



    getCurrentUser() {
        return JSON.parse(localStorage.getItem('User'));
    }
}

export default new AuthService();
