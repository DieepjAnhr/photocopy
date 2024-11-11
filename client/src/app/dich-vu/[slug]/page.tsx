import { Metadata } from 'next';
import { CATEGORIES } from '@/constant/category-list';
import styles from './index.module.scss';
import ServiceList from '@/components/service/list';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/components/service/detail';

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

export default function ServicePage({ params, searchParams }: IPageProps) {
  const service = getService(params.slug)
  if (!service) return notFound();

  const { value } = searchParams

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

export async function generateMetadata(props: { params: { slug: string } }) {
    const { slug } = props.params
    return {
        title: `My Page - ${slug}`,
    }
}
