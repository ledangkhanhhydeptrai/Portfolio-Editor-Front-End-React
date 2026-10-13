import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { CreateProjectProps, ProjectProps } from "./ProjectTypes";

export const getAllProject = async (): Promise<ApiResponse<ProjectProps[]>> => {
  try {
    const response = await fetchBaseResponse<ProjectProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.PROJECTS}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Project User Failure";
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
export const getProjectById = async (
  id: string
): Promise<ApiResponse<ProjectProps | null>> => {
  try {
    const response = await fetchBaseResponse<ProjectProps>(
      `${API_CONFIG.ENDPOINTS.USER.PROJECTS_USER_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Project User Failure";
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
export const CreateProjectAPI = async ({
  category,
  demoUrl,
  description,
  displayOrder,
  featured,
  githubUrl,
  thumbnailUrl,
  title
}: CreateProjectProps): Promise<ApiResponse<ProjectProps>> => {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("demoUrl", demoUrl);
  formData.append("description", description);
  formData.append("displayOrder", displayOrder.toString());
  formData.append("featured", String(featured));
  formData.append("githubUrl", githubUrl);
  formData.append("title", title);
  if (thumbnailUrl) formData.append("thumbnailUrl", thumbnailUrl);
  try {
    const response = await fetchBaseResponse<ProjectProps>(
      `${API_CONFIG.ENDPOINTS.USER.PROJECTS}`,
      requestConfig("POST", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Project User Failure";
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
export const UpdateProjectAPI = async (
  id: string,
  {
    category,
    demoUrl,
    description,
    displayOrder,
    featured,
    githubUrl,
    thumbnailUrl,
    title
  }: CreateProjectProps
): Promise<ApiResponse<ProjectProps>> => {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("demoUrl", demoUrl);
  formData.append("description", description);
  formData.append("displayOrder", displayOrder.toString());
  formData.append("featured", String(featured));
  formData.append("githubUrl", githubUrl);
  formData.append("title", title);
  if (thumbnailUrl) formData.append("thumbnailUrl", thumbnailUrl);
  try {
    const response = await fetchBaseResponse<ProjectProps>(
      `${API_CONFIG.ENDPOINTS.USER.PROJECTS_USER_ID(id)}`,
      requestConfig("PUT", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Project User Failure";
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
export const DeleteProjectAPI = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.PROJECTS_USER_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete Project User Failure";
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
