import { jwtDecode } from "jwt-decode";

// This is OOP.
// Works similar to PrismaClient.

class AuthService {
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }

  getToken(): string {
    return localStorage.getItem("id_token") || "";
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true;
    }
  }

  getProfile() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      try {
        const decoded = jwtDecode<{ id: string; username: string }>(token);
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  handleTokenExpiration() {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }
}

const authService = new AuthService();
export default authService;
