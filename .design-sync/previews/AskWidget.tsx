import { AskWidget } from "scarlett-website";

const revealOverride = ".reveal { opacity: 1 !important; transform: none !important; }";

export function Default() {
  return (
    <>
      <style>{revealOverride}</style>
      <div style={{ maxWidth: 720, padding: "40px 28px", background: "#080b14" }}>
        <AskWidget />
      </div>
    </>
  );
}
