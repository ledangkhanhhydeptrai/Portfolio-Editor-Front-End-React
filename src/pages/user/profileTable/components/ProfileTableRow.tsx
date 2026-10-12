import React, { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { FieldConfig } from "./Fields";

interface ProfileTableRowProps {
  field: FieldConfig;
  value: string | null;
}

const ProfileTableRow: React.FC<ProfileTableRowProps> = ({ field, value }) => {
  const [copied, setCopied] = useState(false);
  const text = value && value.trim() !== "" ? value : null;

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bị chặn: bỏ qua */
    }
  };

  const renderValue = () => {
    if (!text) {
      return <span className="italic text-gray-400">Chưa cập nhật</span>;
    }

    if (field.kind === "image" || field.kind === "link") {
      return (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-2 text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {field.kind === "image" && (
            <img
              src={text}
              alt=""
              className="h-8 w-8 shrink-0 rounded-md border border-gray-200 object-cover dark:border-gray-700"
            />
          )}
          <span className="truncate">{text}</span>
          <ExternalLink size={13} className="shrink-0" />
        </a>
      );
    }

    return (
      <p className="whitespace-pre-wrap break-words leading-5 text-gray-900 dark:text-gray-100">
        {text}
      </p>
    );
  };

  return (
    <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40">
      <td className="w-14 px-4 py-1.5 align-middle text-indigo-500 sm:w-auto sm:whitespace-nowrap sm:pr-2">
        <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          {field.icon}
          <span className="hidden font-medium sm:inline">{field.label}</span>
        </span>
      </td>

      <td className="w-full max-w-0 px-4 py-1.5 align-middle text-sm leading-5">
        {renderValue()}
      </td>

      <td className="w-12 px-3 py-1.5 text-right align-middle">
        {text && field.kind === "copy" && (
          <button
            type="button"
            onClick={handleCopy}
            title="Sao chép"
            aria-label={`Sao chép ${field.label}`}
            className="rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            {copied ? (
              <Check size={15} className="text-emerald-500" />
            ) : (
              <Copy size={15} />
            )}
          </button>
        )}
      </td>
    </tr>
  );
};

export default ProfileTableRow;
