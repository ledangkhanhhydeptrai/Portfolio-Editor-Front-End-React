import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { CreateEducationProps, EducationProps } from "./EducationTypes";

export const getAllEducation = async (): Promise<
  ApiResponse<EducationProps[]>
> => {
  try {
    const response = await fetchBaseResponse<EducationProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.EDUCATIONS}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Education User Failure";
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
export const getEducationById = async (
  id: string
): Promise<ApiResponse<EducationProps>> => {
  try {
    const response = await fetchBaseResponse<EducationProps>(
      `${API_CONFIG.ENDPOINTS.USER.EDUCATIONS_USER_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Education User Failure";
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
export const createEducationAPI = async (
  data: CreateEducationProps
): Promise<ApiResponse<EducationProps>> => {
  try {
    const response = await fetchBaseResponse<EducationProps>(
      `${API_CONFIG.ENDPOINTS.USER.EDUCATIONS}`,
      requestConfig("POST", data)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Education User Failure";
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
export const updateEducationAPI = async (
  id: string,
  data: CreateEducationProps
): Promise<ApiResponse<EducationProps>> => {
  try {
    const response = await fetchBaseResponse<EducationProps>(
      `${API_CONFIG.ENDPOINTS.USER.EDUCATIONS_USER_ID(id)}`,
      requestConfig("PUT", data)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Education User Failure";
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
export const deleteEducationAPI = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.EDUCATIONS_USER_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete Education User Failure";
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
