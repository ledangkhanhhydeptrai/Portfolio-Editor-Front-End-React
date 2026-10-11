import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { WorkStyleCreate, WorkStyleProps } from "./WorkStyleTypes";

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
export const getWorkStyleById = async (
  id: string
): Promise<ApiResponse<WorkStyleProps | null>> => {
  try {
    const response = await fetchBaseResponse<WorkStyleProps>(
      `${API_CONFIG.ENDPOINTS.USER.WORK_STYLES_USER_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Work Style By User Id Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const createWorkStyleAPI = async ({
  description,
  displayOrder,
  title
}: WorkStyleCreate): Promise<ApiResponse<WorkStyleProps>> => {
  try {
    const response = await fetchBaseResponse<WorkStyleProps>(
      `${API_CONFIG.ENDPOINTS.USER.WORK_STYLES_USER}`,
      requestConfig("POST", { description, displayOrder, title })
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Work Style By User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const updateWorkStyleAPI = async (
  id: string,
  { description, displayOrder, title }: WorkStyleCreate
): Promise<ApiResponse<WorkStyleProps>> => {
  try {
    const response = await fetchBaseResponse<WorkStyleProps>(
      `${API_CONFIG.ENDPOINTS.USER.WORK_STYLES_USER_ID(id)}`,
      requestConfig("PUT", { description, displayOrder, title })
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Work Style By User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const DeleteWorkStyleAPI = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.WORK_STYLES_USER_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Work Style By User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
