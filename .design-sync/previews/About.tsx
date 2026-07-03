import { About } from "scarlett-website";

const revealOverride = ".reveal { opacity: 1 !important; transform: none !important; }";

export function Default() {
  return (
    <>
      <style>{revealOverride}</style>
      <div style={{ maxWidth: 1080, padding: "0 28px", background: "#080b14", color: "#f0ede8" }}>
        <About />
      </div>
    </>
  );
}
