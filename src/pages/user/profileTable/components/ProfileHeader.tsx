import React from "react";
import { RefreshCw } from "lucide-react";

interface ProfileHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isFetching,
  onRefresh,
}) => (
  <div className="flex shrink-0 items-center justify-between gap-4">
    <div>
      <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Quản lý profile
      </h1>

      <p className="mt-0.5 text-sm text-gray-500">
        Xem thông tin hồ sơ cá nhân từ hệ thống.
      </p>
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onRefresh}
        disabled={isFetching}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <RefreshCw
          size={15}
          className={isFetching ? "animate-spin" : ""}
        />
        Làm mới
      </button>

     
    </div>
  </div>
);

export default ProfileHeader;