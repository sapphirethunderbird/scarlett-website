import { ThemeToggle } from "scarlett-website";

export function DarkTheme() {
  return (
    <div style={{ padding: 24, background: "#080b14", display: "inline-flex" }}>
      <ThemeToggle />
    </div>
  );
}

export function LightTheme() {
  return (
    <div
      data-theme="light"
      style={{ padding: 24, background: "#f5f2ec", display: "inline-flex" }}
    >
      <ThemeToggle />
    </div>
  );
}
