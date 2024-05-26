import styles from "./page.module.css";
import Header from "./components/header";
import Slider from "./components/slider";
import Services from "./components/services";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header></Header>
      <Slider></Slider>
      <Services></Services>
      <Footer></Footer>
    </main>
  );
}
