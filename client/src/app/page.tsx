import { Metadata } from 'next';
import styles from "./index.module.scss";
import Slider from "../components/slider";
import HomeCategory from "../components/home/category";
import HomeCommit from "../components/home/commit";

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description: ''
};

export default async function HomePage() {
  metadata.title = `Photocopy99`;
  metadata.description = `Photocopy`;
  return <main className={styles.main}>
      <Slider />
      <HomeCommit />
      <HomeCategory />
  </main>
}
