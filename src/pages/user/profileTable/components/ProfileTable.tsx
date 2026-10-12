import React from "react";
import ProfileTableRow from "./ProfileTableRow";
import { PROFILE_FIELDS } from "./Fields";
import type { Profile } from "./types";

const toText = (value: unknown): string | null =>
  value === null || value === undefined ? null : String(value);

const ProfileTable: React.FC<{ profile: Profile }> = ({ profile }) => {
  const record = profile as unknown as Record<string, unknown>;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="h-full w-full min-w-[480px] table-fixed border-collapse text-left sm:table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-500 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-400">
              <th className="w-14 px-4 py-2 sm:w-64">Trường dữ liệu</th>
              <th className="px-4 py-2">Giá trị</th>
              <th className="w-12 px-3 py-2">
                <span className="sr-only">Thao tác</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {PROFILE_FIELDS.map((field) => (
              <ProfileTableRow
                key={field.key}
                field={field}
                value={toText(record[field.key])}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProfileTable;
