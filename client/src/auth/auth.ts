import { jwtDecode } from "jwt-decode";

// This is OOP.
// Works similar to PrismaClient.

class Auth {
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
  }

  guestLogin() {
    const guestToken = `guest-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("guest_token", guestToken);
  }

  logout() {
    localStorage.removeItem("id_token");
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
    return !!token && !this.isTokenExpired(token);
  }

  guestLoggedIn() {
    return !!localStorage.getItem("guest_token");
  }

  handleTokenExpiration() {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }
}

const auth = new Auth();
export default auth;
