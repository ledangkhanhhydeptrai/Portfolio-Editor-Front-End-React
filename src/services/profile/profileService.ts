
import { AxiosError } from "axios";
import { LoginResponse } from "../auth/authTypes";
import { ApiResponse } from "../../response/ApiResponse";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { API_CONFIG } from "../../config/api";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";

export const getCurrentUser = async (): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await fetchBaseResponse<LoginResponse>(
      `${API_CONFIG.ENDPOINTS.USER.PROFILE}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Profile Failure";
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
