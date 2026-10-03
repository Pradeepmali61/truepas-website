"use client";

import Button from "./Button";

// Every demo CTA books through this Calendly event
const CALENDLY_URL = "https://calendly.com/pradeepmali269/30min";
const WIDGET = "https://assets.calendly.com/assets/external/widget";

type Calendly = { initPopupWidget(options: { url: string }): void };

declare global {
  interface Window {
    Calendly?: Calendly;
  }
}

// Loaded on first click so pages don't ship Calendly's script up front
let widget: Promise<Calendly> | undefined;
function loadWidget() {
  widget ??= new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${WIDGET}.css`;
    const js = document.createElement("script");
    js.src = `${WIDGET}.js`;
    js.onload = () => (window.Calendly ? resolve(window.Calendly) : reject());
    js.onerror = () => {
      css.remove();
      js.remove();
      widget = undefined;
      reject();
    };
    document.head.append(css, js);
  });
  return widget;
}

async function openPopup(e: React.MouseEvent<HTMLAnchorElement>) {
  // Modified clicks (new tab/window) follow the href to Calendly's own page
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  try {
    (await loadWidget()).initPopupWidget({ url: CALENDLY_URL });
  } catch {
    // Widget blocked (e.g. ad blocker): fall back to the booking page
    window.location.assign(CALENDLY_URL);
  }
}

type Props = {
  size?: "md" | "lg";
  className?: string;
  /** Runs alongside opening the popup, e.g. to close the mobile menu */
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function BookDemoButton({ size, className, onClick, children = "Book a Demo" }: Props) {
  return (
    <Button
      href={CALENDLY_URL}
      icon
      size={size}
      className={className}
      onClick={(e) => {
        openPopup(e);
        onClick?.();
      }}
    >
      {children}
    </Button>
  );
}
