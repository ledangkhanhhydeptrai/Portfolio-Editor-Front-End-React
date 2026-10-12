import { AxiosError } from "axios";
import { ApiResponse } from "../../response/ApiResponse";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { API_CONFIG } from "../../config/api";
import { requestConfig } from "../../config/requestConfig";
import { HTTP_STATUS } from "../../constants/api";
import {
  CreateUserProfile,
  UpdateProfileProps,
  UserProfile
} from "./profileTypes";

export const getCurrentUser = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await fetchBaseResponse<UserProfile>(
      `${API_CONFIG.ENDPOINTS.USER.PROFILE}`,
      requestConfig("GET")
    );
    if (response.status !== HTTP_STATUS.OK)
      throw new Error(`HTTP_STATUS:${response.status}`);
    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Get Profile Failure";
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
export const CreateProfile = async ({
  aboutMe,
  availabilityStatus,
  avatarUrl,
  cvUrl,
  email,
  fullName,
  jobTitle,
  location,
  phone,
  quote,
  shortDescription,
  workDirection
}: CreateUserProfile): Promise<ApiResponse<UserProfile>> => {
  const formData = new FormData();

  formData.append("aboutMe", aboutMe);
  formData.append("availabilityStatus", availabilityStatus);
  formData.append("cvUrl", cvUrl);
  formData.append("email", email);
  formData.append("fullName", fullName);
  formData.append("jobTitle", jobTitle);
  formData.append("location", location);
  formData.append("phone", phone);
  formData.append("quote", quote);
  formData.append("shortDescription", shortDescription);
  formData.append("workDirection", workDirection);

  if (avatarUrl !== null) {
    formData.append("avatarUrl", avatarUrl);
  }

  try {
    const response = await fetchBaseResponse<UserProfile>(
      API_CONFIG.ENDPOINTS.USER.PROFILE,
      requestConfig("POST", formData)
    );

    if (response.status !== HTTP_STATUS.CREATED) {
      throw new Error(`HTTP_STATUS:${response.status}`);
    }

    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Profile Failure";

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
export const UpdateProfile = async ({
  aboutMe,
  availabilityStatus,
  email,
  fullName,
  jobTitle,
  location,
  phone,
  quote,
  shortDescription,
  workDirection
}: UpdateProfileProps): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await fetchBaseResponse<UserProfile>(
      `${API_CONFIG.ENDPOINTS.USER.USERPROFILE}`,
      requestConfig("PUT", {
        aboutMe,
        availabilityStatus,
        email,
        fullName,
        jobTitle,
        location,
        phone,
        quote,
        shortDescription,
        workDirection
      })
    );
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error(`HTTP_STATUS:${response.status}`);
    }

    return response;
  } catch (error) {
    const errors = error as AxiosError<ApiResponse<string>>;
    let message = "Create Profile Failure";

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
