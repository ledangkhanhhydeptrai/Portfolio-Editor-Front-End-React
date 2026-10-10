import type { AxiosRequestConfig, Method } from "axios";

export const requestConfig = (
  method: Method = "GET",
  data?: unknown
): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    method
  };

  if (data !== undefined) {
    config.data = data;
  } else {
    config.headers = {
      "Content-Type": "application/json"
    };
  }

  return config;
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