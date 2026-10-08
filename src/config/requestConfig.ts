import type { AxiosRequestConfig, Method } from "axios";

export const requestConfig = (
  method: Method = "GET"
): AxiosRequestConfig => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const getConfig = (): AxiosRequestConfig => {
  return requestConfig("GET");
};

export const postConfig = (): AxiosRequestConfig => {
  return requestConfig("POST");
};

export const putConfig = (): AxiosRequestConfig => {
  return requestConfig("PUT");
};

export const deleteConfig = (): AxiosRequestConfig => {
  return requestConfig("DELETE");
};