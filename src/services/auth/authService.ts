import { AxiosError } from "axios";
import { LoginRequest, LoginResponse } from "../auth/authTypes";
import { ApiResponse } from "../../response/ApiResponse";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { API_CONFIG } from "../../config/api";

import { HTTP_STATUS } from "../../constants/api";
import { postConfig, requestConfig } from "../../config/requestConfig";

export const AuthLogin = async ({
  email,
  password
}: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await fetchBaseResponse<LoginResponse>(
      `${API_CONFIG.ENDPOINTS.LOGIN}`,
      { ...postConfig(), data: { email, password } }
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Login Failure";
    if (
      errors.response &&
      errors.response.data &&
      errors.response.data.message
    ) {
      message = errors.response.data.message;
    }
    throw message;
  }
};
export const LogoutAPI = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.LOGOUT}`,
      requestConfig("POST")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Logout Failure API";
    if (
      errors.response &&
      errors.response.data &&
      errors.response.data.message
    ) {
      message = errors.response.data.message;
    }
    throw message;
  }
};
