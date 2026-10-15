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

  if (videoFile) {
    formData.append("videoFile", videoFile);
  }

  if (thumbnailFile) {
    formData.append("thumbnailFile", thumbnailFile);
  }

  console.log("[CREATE VIDEO] Start");
  console.log(
    "[CREATE VIDEO] Endpoint:",
    API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT
  );
  console.log(
    "[CREATE VIDEO] Video size:",
    videoFile ? videoFile.size : 0
  );
  console.log(
    "[CREATE VIDEO] Thumbnail size:",
    thumbnailFile ? thumbnailFile.size : 0
  );

  try {
    const config = requestConfig("POST", formData);

    // Timeout riêng cho upload video: 5 phút.
    config.timeout = 300000;

    console.log("[CREATE VIDEO] Sending request");

    const response = await fetchBaseResponse<VideoProps | null>(
      API_CONFIG.ENDPOINTS.USER.VIDEO_PROJECT,
      config
    );

    console.log("[CREATE VIDEO] Response status:", response.status);
    console.log(
      "[CREATE VIDEO] Server status:",
      response.serverStatus
    );
    console.log("[CREATE VIDEO] Message:", response.message);
    console.log("[CREATE VIDEO] Success:", response.success);
    console.log("[CREATE VIDEO] Data:", response.data);

    if (
      response.success === false ||
      response.status < 200 ||
      response.status >= 300
    ) {
      throw new Error(
        `Create video failed (${response.status}): ${response.message}`
      );
    }

    console.log("[CREATE VIDEO] Success");

    return response;
  } catch (error: unknown) {
    console.error("[CREATE VIDEO] Failed:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Create Video Failure");
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
    console.log("Error:", errors);
    let message = "Delete Video Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
