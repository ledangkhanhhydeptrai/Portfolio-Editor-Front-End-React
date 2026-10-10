import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { WorkStyleProps } from "./WorkStyleTypes";

export const getAllWorkStyle = async (): Promise<
  ApiResponse<WorkStyleProps[]>
> => {
  try {
    const response = await fetchBaseResponse<WorkStyleProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.WORK_STYLES_USER}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Work Style Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
