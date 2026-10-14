import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import {
  CreateDirectionProps,
  DirectionProps,
  UpdateDirectionProps
} from "./directionTypes";

export const getAllDirection = async (): Promise<
  ApiResponse<DirectionProps[]>
> => {
  try {
    const response = await fetchBaseResponse<DirectionProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.DIRECTION_USER}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Direction User Failure";
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
export const getDirectionById = async (
  id: string
): Promise<ApiResponse<DirectionProps | null>> => {
  try {
    const response = await fetchBaseResponse<DirectionProps>(
      `${API_CONFIG.ENDPOINTS.USER.DIRECTION_USER_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Direction User Failure";
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
export const CreateDirectionAPI = async ({
  code,
  description,
  displayOrder,
  icon,
  skills,
  title
}: CreateDirectionProps): Promise<ApiResponse<DirectionProps>> => {
  try {
    const response = await fetchBaseResponse<DirectionProps>(
      `${API_CONFIG.ENDPOINTS.USER.DIRECTION_USER}`,
      requestConfig("POST", {
        code,
        description,
        displayOrder,
        icon,
        skills,
        title
      })
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Direction User Failure";
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
export const UpdateDirectionAPI = async (
  id: string,
  data: UpdateDirectionProps
): Promise<ApiResponse<DirectionProps>> => {
  try {
    const response = await fetchBaseResponse<DirectionProps>(
      `${API_CONFIG.ENDPOINTS.USER.DIRECTION_USER_ID(id)}`,
      requestConfig("PUT", data)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Direction User Failure";
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
export const DeleteDirection = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.DIRECTION_USER_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete Direction User Failure";
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
