import { Metadata } from 'next';
import { CATEGORIES } from '@/constant/category-list';
import styles from './index.module.scss';
import ServiceList from '@/app/components/service/list';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/app/components/service/detail';

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description: ''
};

const DEFAULT_SERVICES = [
  {
    slug: 'dich-vu-1'
  }
]

export function generateStaticParams() {
  return DEFAULT_SERVICES;
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  let service = null;
  for (const i in CATEGORIES) {
    if (CATEGORIES[i]?.slug === params.slug) {
      service = CATEGORIES[i];
    }
    if (!CATEGORIES[i]?.is_leaf && CATEGORIES[i].childrens.length > 0) {
      for (const j in CATEGORIES[i].childrens) {
        if (CATEGORIES[i].childrens[j]?.slug === params.slug) {
          service = CATEGORIES[i].childrens[j];
        }
      }
    }
  }

  if (!service) return notFound();

  metadata.title = `${service.name.toUpperCase()}`;
  metadata.description = `Discover more about ${service.name}. Learn about our services and offerings in detail.`;

  return (
      <div className={styles.main}>
        {service.is_leaf ? (
          <ServiceDetail {...service} />
        ) : (
          <ServiceList name={service.name} services={service.childrens} />
        )}
      </div>
  );
}
