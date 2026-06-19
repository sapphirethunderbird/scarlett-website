import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Scarlett Whisnant · built from model to interface
    </footer>
  );
}
