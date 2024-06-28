import { Metadata } from 'next';
import { CATEGORIES } from '@/constant/category-list';
import ServiceList from '../components/service/list';
import styles from './index.module.scss';

export const metadata: Metadata = {
    title: 'Dịch vụ',
    description: ''
};

export default function ListServicePage() {
    const props = {
        name: "Dịch vụ của chúng tôi",
        services: CATEGORIES
    }

    metadata.title = `Danh sách dịch vụ`;
    metadata.description = `Discover more about Service`;
  
    return <div className={styles.main}>
        <ServiceList {...props}/>
    </div>
}