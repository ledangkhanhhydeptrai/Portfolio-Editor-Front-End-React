import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { CreateVideo, UpdateVideo, VideoProps } from "./VideoTypes";

export const getAllVideoByUser = async (): Promise<
  ApiResponse<VideoProps[]>
> => {
  try {
    const response = await fetchBaseResponse<VideoProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Video User Failure";
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
export const getVideoByUserId = async (
  id: string
): Promise<ApiResponse<VideoProps | null>> => {
  try {
    const response = await fetchBaseResponse<VideoProps>(
      `${API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT_USER_BY_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Video User Failure";
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
export const createVideoAPI = async ({
  title,
  description,
  category,
  displayOrder,
  year,
  videoFile,
  thumbnailFile
}: CreateVideo): Promise<ApiResponse<VideoProps | null>> => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("displayOrder", String(displayOrder));
  formData.append("year", String(year));
  if (videoFile) formData.append("videoFile", videoFile);
  if (thumbnailFile) formData.append("thumbnailFile", thumbnailFile);
  try {
    const response = await fetchBaseResponse<VideoProps>(
      `${API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT}`,
      requestConfig("POST", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Video Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};

export const updateVideoAPI = async (
  id: string,
  { title, description, category, year, displayOrder }: UpdateVideo
): Promise<ApiResponse<VideoProps | null>> => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("year", year.toString());
  formData.append("displayOrder", displayOrder.toString());
  try {
    const response = await fetchBaseResponse<VideoProps>(
      `${API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT_USER_BY_ID(id)}`,
      requestConfig("PUT", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Video Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const deleteVideoAPI = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT_USER_BY_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete Video Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
