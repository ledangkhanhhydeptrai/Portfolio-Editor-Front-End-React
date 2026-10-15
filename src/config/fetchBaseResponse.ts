
import axios, {
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

import { API_CONFIG } from "./api";
import { notifyUnauthorized } from "../services/auth/authEvents";

const API = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true
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
  config: AxiosRequestConfig
): Promise<BaseResponse<T>> {
  try {
    const response: AxiosResponse = await API(url, config);
    const raw: unknown = response.data;

    if (Array.isArray(raw)) {
      return {
        status: response.status,
        message: "Success",
        data: raw as T,
        serverStatus: response.status,
        success: true
      };
    }

    if (raw !== null && typeof raw === "object") {
      const body = raw as Record<string, unknown>;

      return {
        status:
          typeof body.status === "number"
            ? body.status
            : response.status,
        message:
          typeof body.message === "string"
            ? body.message
            : "Success",
        data:
          typeof body.data !== "undefined"
            ? (body.data as T)
            : (raw as T),
        serverStatus: response.status,
        success: true
      };
    }

    return {
      status: response.status,
      message: "Success",
      data: raw as T,
      serverStatus: response.status,
      success: true
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const response = error.response;

      if (response) {
        if (response.status === 401) {
          notifyUnauthorized();
        }

        const raw: unknown = response.data;

        if (raw !== null && typeof raw === "object") {
          const body = raw as Record<string, unknown>;

          return {
            status:
              typeof body.status === "number"
                ? body.status
                : response.status,
            message:
              typeof body.message === "string"
                ? body.message
                : "Request failed",
            data:
              typeof body.data !== "undefined"
                ? (body.data as T)
                : (null as T),
            serverStatus: response.status,
            success: false
          };
        }

        return {
          status: response.status,
          message: "Request failed",
          data: null as T,
          serverStatus: response.status,
          success: false
        };
      }

      return {
        status: 503,
        message:
          error.code === "ECONNABORTED" ||
          error.code === "ETIMEDOUT"
            ? "Request timeout"
            : "Không nhận được phản hồi từ server",
        data: null as T,
        serverStatus: 503,
        success: false
      };
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Có lỗi không xác định xảy ra");
  }
}

export default API;
