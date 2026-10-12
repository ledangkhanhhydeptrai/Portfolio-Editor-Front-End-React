import { useCurrentUser } from "../../../../hooks/useCurrentUser";

type CurrentUserResult = ReturnType<typeof useCurrentUser>;

/** Kiểu dữ liệu profile suy ra trực tiếp từ hook, không cần khai báo lại. */
export type Profile = NonNullable<
  NonNullable<CurrentUserResult["data"]>["data"]
>;
