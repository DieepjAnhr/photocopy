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

function getService(slug: string) {
    for (const i in CATEGORIES) {
        const category = CATEGORIES[i];
        if (!category) continue;

        if (category.slug === slug) {
            return category;
        }

        if (!category.is_leaf && category.childrens.length > 0) {
            for (const j in category.childrens) {
                const children = category.childrens[j];
                if (!children) continue;

                if (children.slug === slug) {
                    return children;
                }
            }
        }
    }
    return null;
}

export function generateStaticParams() {
    const results = [];
    for (const i in CATEGORIES) {
        const category = CATEGORIES[i];
        if (!category) continue;

        results.push({
            slug: category.slug
        })

        if (!category.is_leaf && category.childrens.length > 0) {
            for (const j in category.childrens) {
                const children = category.childrens[j];
                if (!children) continue;

                results.push({
                    slug: children.slug
                })
            }
        }
    }

    return results;
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
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
