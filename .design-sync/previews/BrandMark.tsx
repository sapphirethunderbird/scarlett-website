import { BrandMark } from "scarlett-website";

export function OnDark() {
  return (
    <div style={{ padding: 40, background: "#080b14", display: "inline-flex" }}>
      <BrandMark />
    </div>
  );
}

export function OnLight() {
  return (
    <div style={{ padding: 40, background: "#f5f2ec", display: "inline-flex" }}>
      <BrandMark />
    </div>
  );
}
