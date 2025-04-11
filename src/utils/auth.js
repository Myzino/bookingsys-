// /utils/auth.js
import { initKeycloak } from './keycloak';

export const login = async (credentials = null) => {
  const keycloak = initKeycloak();
  
  try {
    if (credentials) {
      const { email, password } = credentials;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
            grant_type: 'password',
            username: email,
            password: password,
            scope: 'openid',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      
      // Initialize Keycloak with the received tokens
      await keycloak.init({
        token: data.access_token,
        refreshToken: data.refresh_token,
        onLoad: 'check-sso',
      });

      return {
        token: data.access_token,
        refreshToken: data.refresh_token,
        user: parseJwt(data.access_token),
      };
    } else {
      // Standard SSO flow
      await keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
      });
      
      if (!keycloak.authenticated) {
        await keycloak.login({
          redirectUri: window.location.origin
        });
      }
      
      return {
        token: keycloak.token,
        refreshToken: keycloak.refreshToken,
        user: keycloak.tokenParsed
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Helper function to parse JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Rest of the auth.js remains the same...
export const logout = async () => {
  const keycloak = initKeycloak();
  try {
    await keycloak.logout({ redirectUri: window.location.origin });
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getToken = () => {
  const keycloak = initKeycloak();
  return keycloak?.token;
};