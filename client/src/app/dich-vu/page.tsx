import { Metadata } from 'next';
import { CATEGORIES } from '@/constant/category-list';
import ServiceList from '../../components/service/list';
import styles from './index.module.scss';

export async function generateMetadata(): Promise<Metadata> {
    return {
      metadataBase: new URL("https://example.com"),
      title:"Name",
      description: "description",
      authors: [
        {
          name: "Site Name",
          url: "https://example.com",
        },
      ],
      twitter: {
        card: "summary_large_image",
        creator: "@example",
        images: "some-image",
      },
      robots: "index, follow",
      alternates: {
        canonical: `https://example.com`,
        languages: {
          "en-US": "/",
        },
      },
      openGraph: {
        type: "website",
        url: `https://example.com`,
        title: "name",
        description: "description",
        siteName: "Site Name",
        images: [
          {
            url: "some-image",
          },
        ],
      },
      assets: "some-image",
      keywords: [
        "keywords"
      ],
    };
  }

export default function ListServicePage() {
    const props = {
        name: "Dịch vụ của chúng tôi",
        services: CATEGORIES
    }
  
    return <div className={styles.main}>
        <ServiceList {...props}/>
    </div>
}