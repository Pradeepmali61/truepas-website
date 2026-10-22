"use client";

import Button, { DownloadIcon } from "./Button";
import { openDownloadDialog } from "./DownloadDialog";

type Props = {
  size?: "md" | "lg";
  className?: string;
  iconClassName?: string;
  /** Runs alongside the click, e.g. to close the mobile menu */
  onClick?: () => void;
};

// Opens the "Download and Sign Up" dialog with the store badges (store links live in DownloadDialog)
export default function DownloadButton({ size, className, iconClassName, onClick }: Props) {
  return (
    <Button
      size={size}
      icon={<DownloadIcon className={iconClassName} />}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openDownloadDialog();
        onClick?.();
      }}
    >
      Download the app
    </Button>
  );
}
