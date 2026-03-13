import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Oops! Page not found.</p>
        <button className={styles.btn} onClick={() => navigate("/dashboard")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}