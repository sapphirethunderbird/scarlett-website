import { HeroMark } from "scarlett-website";

const reduceMotion = "@media not (prefers-reduced-motion: reduce) { .cell, .crescent { opacity: 1 !important; } }";

export function Default() {
  return (
    <>
      <style>{reduceMotion}</style>
      <div style={{ padding: 40, background: "#080b14", display: "inline-flex" }}>
        <HeroMark />
      </div>
    </>
  );
}
