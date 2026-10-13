import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { CreateSkillProps, SkillProps } from "./SkillTypes";

export const getAllSkillService = async (): Promise<
  ApiResponse<SkillProps[]>
> => {
  try {
    const response = await fetchBaseResponse<SkillProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.SKILLS}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Skill User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const getSkillService = async (
  id: string
): Promise<ApiResponse<SkillProps | null>> => {
  try {
    const response = await fetchBaseResponse<SkillProps>(
      `${API_CONFIG.ENDPOINTS.USER.SKILLS_USER_BY_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Skill User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const CreateSkillService = async ({
  category,
  displayOrder,
  iconUrl,
  name
}: CreateSkillProps): Promise<ApiResponse<SkillProps>> => {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("displayOrder", displayOrder.toString());
  formData.append("name", name);
  if (iconUrl) formData.append("iconUrl", iconUrl);
  try {
    const response = await fetchBaseResponse<SkillProps>(
      `${API_CONFIG.ENDPOINTS.USER.SKILLS}`,
      requestConfig("POST", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Skill User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const UpdateSkillService = async (
  id: string,
  { category, displayOrder, iconUrl, name }: CreateSkillProps
): Promise<ApiResponse<SkillProps>> => {
  const formData = new FormData();
  formData.append("category", category);
  formData.append("displayOrder", displayOrder.toString());
  formData.append("name", name);
  if (iconUrl) formData.append("iconUrl", iconUrl);
  try {
    const response = await fetchBaseResponse<SkillProps>(
      `${API_CONFIG.ENDPOINTS.USER.SKILLS_USER_BY_ID(id)}`,
      requestConfig("PUT", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Skill User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const DeleteSkillService = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.SKILLS_USER_BY_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Delete Skill User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
