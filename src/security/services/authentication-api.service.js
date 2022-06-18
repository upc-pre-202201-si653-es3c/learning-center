
import axios from "axios";

const API_URL = "https://localhost:7070/api/v1/users";
const USER_KEY = "user";

export class AuthenticationApiService {
  signIn(request) {
    return axios.post(`${API_URL}/sign-in`, request).then((response) => {
      if (response.data.token) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  signUp(request) {
    return axios.post(`${API_URL}/sign-up`, request);
  }

  signOut() {
    localStorage.removeItem("user");
  }
}
