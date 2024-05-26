import styles from "./page.module.css";
import Slider from "./components/slider";
import Services from "./components/services";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Slider></Slider>
      <Services></Services>
    </main>
  );
}
