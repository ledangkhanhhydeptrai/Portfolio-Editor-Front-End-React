import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import {
  CreateCurriculumProps,
  CurriculumTypes,
  UpdateCurriculumProps
} from "./CurriculumTypes";

export const CurriculumService = async (): Promise<
  ApiResponse<CurriculumTypes[]>
> => {
  try {
    const response = await fetchBaseResponse<CurriculumTypes[]>(
      `${API_CONFIG.ENDPOINTS.USER.CURRICULUM_USER}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All CV User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const CurriculumServiceById = async (
  id: string
): Promise<ApiResponse<CurriculumTypes>> => {
  try {
    const response = await fetchBaseResponse<CurriculumTypes>(
      `${API_CONFIG.ENDPOINTS.USER.CURRICULUM_USER_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get CV User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const CreateCurriculumAPI = async ({
  displayOrder,
  fileUrl,
  isPrimary,
  title
}: CreateCurriculumProps): Promise<ApiResponse<CurriculumTypes>> => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("isPrimary", String(isPrimary));
  formData.append("displayOrder", displayOrder.toString());
  if (fileUrl) formData.append("fileUrl", fileUrl);
  try {
    const response = await fetchBaseResponse<CurriculumTypes>(
      `${API_CONFIG.ENDPOINTS.USER.CURRICULUM_USER}`,
      requestConfig("POST", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create CV User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const UpdateCurriculumAPI = async (
  id: string,
  { displayOrder, fileUrl, isPrimary, title }: UpdateCurriculumProps
): Promise<ApiResponse<CurriculumTypes>> => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("isPrimary", String(isPrimary));
  formData.append("displayOrder", displayOrder.toString());
  if (fileUrl) formData.append("fileUrl", fileUrl);
  try {
    const response = await fetchBaseResponse<CurriculumTypes>(
      `${API_CONFIG.ENDPOINTS.USER.CURRICULUM_USER_ID(id)}`,
      requestConfig("PUT", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update CV User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};

export const DeleteCurriculumAPI = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.CURRICULUM_USER_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete CV User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
