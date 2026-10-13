export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

export const notifyUnauthorized = (): void => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
  }
};