import styles from './index.module.scss';

export default function ServicePage({ params }: { params: { slug: string } }) {
  return <div className={styles.main}>My Post: {params.slug}</div>
}