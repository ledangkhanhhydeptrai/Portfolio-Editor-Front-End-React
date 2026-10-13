import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { CreateExperienceProps, ExperienceProps } from "./ExperienceTypes";

export const getAllExperience = async (): Promise<
  ApiResponse<ExperienceProps[]>
> => {
  try {
    const response = await fetchBaseResponse<ExperienceProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.EXPERIENCES}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Experience User Failure";
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
export const getExperienceById = async (
  id: string
): Promise<ApiResponse<ExperienceProps | null>> => {
  try {
    const response = await fetchBaseResponse<ExperienceProps>(
      `${API_CONFIG.ENDPOINTS.USER.EXPERIENCES_USER_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Experience User Failure";
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
export const CreateExperienceAPI = async ({
  companyName,
  description,
  displayOrder,
  endDate,
  isCurrent,
  position,
  startDate
}: CreateExperienceProps): Promise<ApiResponse<ExperienceProps>> => {
  try {
    const response = await fetchBaseResponse<ExperienceProps>(
      `${API_CONFIG.ENDPOINTS.USER.EXPERIENCES}`,
      requestConfig("POST", {
        companyName,
        description,
        displayOrder,
        endDate,
        isCurrent,
        position,
        startDate
      })
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Experience User Failure";
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
export const UpdateExperienceAPI = async (
  id: string,
  {
    companyName,
    description,
    displayOrder,
    endDate,
    isCurrent,
    position,
    startDate
  }: CreateExperienceProps
): Promise<ApiResponse<ExperienceProps>> => {
  try {
    const response = await fetchBaseResponse<ExperienceProps>(
      `${API_CONFIG.ENDPOINTS.USER.EXPERIENCES_USER_ID(id)}`,
      requestConfig("PUT", {
        companyName,
        description,
        displayOrder,
        endDate,
        isCurrent,
        position,
        startDate
      })
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Experience User Failure";
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
export const DeleteExperienceAPI = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.EXPERIENCES_USER_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete Experience User Failure";
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
