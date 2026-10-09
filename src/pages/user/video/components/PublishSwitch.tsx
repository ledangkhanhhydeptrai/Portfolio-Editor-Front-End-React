import React from "react";

interface PublishSwitchProps {
  published: boolean;
  onChange: () => void;
  title: string;
}

const PublishSwitch: React.FC<PublishSwitchProps> = ({
  published,
  onChange,
  title
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={published}
    aria-label={`${published ? "Unpublish" : "Publish"} ${title}`}
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
      published ? "bg-indigo-600" : "bg-slate-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
        published ? "translate-x-4" : "translate-x-0.5"
      }`}
    />
  </button>
);

export default PublishSwitch;
