import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { API_CONFIG } from "./api";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
  serverStatus?: number;
  success?: boolean;
}

export async function fetchBaseResponse<T = unknown>(
  url: string,
  config: AxiosRequestConfig,
): Promise<BaseResponse<T>> {
  try {
    const response: AxiosResponse = await API(url, config);

    const raw = response.data;

    if (Array.isArray(raw)) {
      return {
        status: response.status,
        message: "Success",
        data: raw as T,
        serverStatus: response.status,
        success: true,
      };
    }

    if (raw !== null && typeof raw === "object") {
      return {
        status:
          typeof raw.status === "number"
            ? raw.status
            : response.status,

        message:
          typeof raw.message === "string"
            ? raw.message
            : "Success",

        data:
          typeof raw.data !== "undefined"
            ? (raw.data as T)
            : (raw as T),

        serverStatus: response.status,
        success: true,
      };
    }

    return {
      status: response.status,
      message: "Success",
      data: raw as T,
      serverStatus: response.status,
      success: true,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const response = error.response;

      if (response) {
        const raw = response.data;

        if (raw !== null && typeof raw === "object") {
          return {
            status:
              typeof raw.status === "number"
                ? raw.status
                : response.status,

            message:
              typeof raw.message === "string"
                ? raw.message
                : "Request failed",

            data:
              typeof raw.data !== "undefined"
                ? (raw.data as T)
                : (null as T),

            serverStatus: response.status,
            success: false,
          };
        }

        return {
          status: response.status,
          message: "Request failed",
          data: null as T,
          serverStatus: response.status,
          success: false,
        };
      }

      if (error.request) {
        return {
          status: 503,
          message: "Không thể kết nối đến server",
          data: null as T,
          serverStatus: 503,
          success: false,
        };
      }

      return {
        status: 500,
        message: error.message || "Request failed",
        data: null as T,
        serverStatus: 500,
        success: false,
      };
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Có lỗi không xác định xảy ra");
  }
}

export default API;