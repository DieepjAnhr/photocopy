import styles from "./index.module.scss";
import Slider from "./components/slider";
import HomeCategory from "./components/home/category";
import HomeCommit from "./components/home/commit";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Slider />
      <HomeCommit />
      <HomeCategory />
    </main>
  );
}
