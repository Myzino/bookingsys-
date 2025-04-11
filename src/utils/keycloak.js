import Keycloak from 'keycloak-js';

let keycloak;

export const initKeycloak = () => {
  if (typeof window !== 'undefined') {
    if (!keycloak) {
      keycloak = new Keycloak({
        url: process.env.NEXT_PUBLIC_KEYCLOAK_URL, 
        realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM, // e.g. "your-realm"
        clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID, // e.g. "your-client-id"
      });
    }
    return keycloak;
  }
  return null;
};

export const getKeycloakInstance = () => keycloak;
