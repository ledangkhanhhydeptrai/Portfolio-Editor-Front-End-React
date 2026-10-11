import { AxiosError } from "axios";
import { API_CONFIG } from "../../config/api";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import { ApiResponse } from "../../response/ApiResponse";
import { CreateSocialLink, SocialLinkProps } from "./SocialLinkTypes";

export const getAllSocialLink = async (): Promise<
  ApiResponse<SocialLinkProps[]>
> => {
  try {
    const response = await fetchBaseResponse<SocialLinkProps[]>(
      `${API_CONFIG.ENDPOINTS.USER.SOCIAL_LINKS}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Social Link User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const getSocialLinkById = async (
  id: string
): Promise<ApiResponse<SocialLinkProps>> => {
  try {
    const response = await fetchBaseResponse<SocialLinkProps>(
      `${API_CONFIG.ENDPOINTS.USER.SOCIAL_LINKS_USER_BY_ID(id)}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get All Social Link User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const CreateSocialLinkAPI = async ({
  displayOrder,
  iconUrl,
  platform,
  url
}: CreateSocialLink): Promise<ApiResponse<SocialLinkProps>> => {
  const formData = new FormData();
  formData.append("displayOrder", displayOrder.toString());
  formData.append("platform", platform);
  formData.append("url", url);
  if (iconUrl) formData.append("iconUrl", iconUrl);
  try {
    const response = await fetchBaseResponse<SocialLinkProps>(
      `${API_CONFIG.ENDPOINTS.USER.SOCIAL_LINKS}`,
      requestConfig("POST", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Social Link User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const updateSocialLinkById = async (
  id: string,
  { displayOrder, iconUrl, platform, url }: CreateSocialLink
): Promise<ApiResponse<SocialLinkProps>> => {
  const formData = new FormData();
  formData.append("displayOrder", displayOrder.toString());
  formData.append("platform", platform);
  formData.append("url", url);
  if (iconUrl) formData.append("iconUrl", iconUrl);
  try {
    const response = await fetchBaseResponse<SocialLinkProps>(
      `${API_CONFIG.ENDPOINTS.USER.SOCIAL_LINKS_USER_BY_ID(id)}`,
      requestConfig("PUT", formData)
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Social Link User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
export const DeleteSocialLinkById = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchBaseResponse<null>(
      `${API_CONFIG.ENDPOINTS.USER.SOCIAL_LINKS_USER_BY_ID(id)}`,
      requestConfig("DELETE")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Update Social Link User Failure";
    if (errors.response && errors.response.data && errors.response.data.message)
      message = errors.response.data.message;
    throw message;
  }
};
