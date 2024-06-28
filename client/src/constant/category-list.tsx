import { CategoryContent } from "./category-contents/content";

export const CATEGORIES: ICategory[] = [
    {
        name: 'dịch vụ in và photocopy',
        label: 'Photocopy',
        slug: 'photocopy',
        image: 'https://inthienhang.com/wp-content/uploads/2019/01/mayin.png.webp',
        image_configs: {
            display_in_pages: ['home', 'service'],
        },
        description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
        path: 'dich-vu/photocopy',
        content: CategoryContent,
        is_leaf: false,
        childrens: [
            {
                name: 'photocopy khổ lớn',
                label: 'Photocopy khổ lớn',
                slug: 'photocopy-kho-lon',
                image: 'https://inthienhang.com/wp-content/uploads/2019/01/Photocopy-kho-lon.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/photocopy-kho-lon',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            },
            {
                name: 'in màu khổ lớn: a0, a1, a2',
                label: 'In màu khổ lớn',
                slug: 'in-mau-kho-lon',
                image: 'https://inthienhang.com/wp-content/uploads/2020/05/anh-dai-dien-scan-280x280.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/in-mau-kho-lon',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            },
            {
                name: 'scan tài liệu, scan ảnh',
                label: 'Scan tài liệu, ảnh',
                slug: 'scan-tai-lieu-anh',
                image: 'https://inthienhang.com/wp-content/uploads/2018/01/22119611_1415562281896871_1210704096_o-600x600.jpg',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/scan-tai-lieu-anh',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            },
            {
                name: 'in trắng đen',
                label: 'In trắng đen',
                slug: 'in-trang-denh',
                image: 'https://inthienhang.com/wp-content/uploads/2020/05/in-trang-den-a4-280x278.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/in-trang-den',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            }
        ]
    },
    {
        name: 'DỊCH VỤ IN MÀU KỸ THUẬT SỐ',
        label: 'In màu',
        slug: 'in-mau',
        image: 'https://inthienhang.com/wp-content/uploads/2019/01/mayin.png.webp',
        image_configs: {
            display_in_pages: ['service'],
        },
        description: 'Chúng tôi sử dụng dòng máy in màu công nghiệp Konica Minolta – dòng máy in chuyên về chất lượng trung và cao cấp, độ phân giải ảnh lên đến 1200 x 1200 dpi. Cho bản in mịn màng, sắc nét, bám sát với màu nhìn thấy trên PC; đúng với những gì mà người thiết kế muốn thể hiện.',
        path: 'dich-vu/in-mau',
        content: CategoryContent,
        is_leaf: false,
        childrens: [
            {
                name: 'photocopy khổ lớn',
                label: 'Photocopy khổ lớn',
                slug: 'photocopy-kho-lon',
                image: 'https://inthienhang.com/wp-content/uploads/2019/04/in-bia-ho-so-gia-re-tai-ha-noi-3.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/photocopy-kho-lon',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            },
            {
                name: 'in màu khổ lớn: a0, a1, a2',
                label: 'In màu khổ lớn',
                slug: 'in-mau-kho-lon',
                image: 'https://inthienhang.com/wp-content/uploads/2020/05/in-sticker-trong-550x550.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/in-mau-kho-lon',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            },
            {
                name: 'scan tài liệu, scan ảnh',
                label: 'Scan tài liệu, ảnh',
                slug: 'scan-tai-lieu-anh',
                image: 'https://inthienhang.com/wp-content/uploads/2019/04/dia-chi-in-bookmark-tai-in-thien-hang-6.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/scan-tai-lieu-anh',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            },
            {
                name: 'in trắng đen',
                label: 'In trắng đen',
                slug: 'in-trang-den',
                image: 'https://inthienhang.com/wp-content/uploads/2019/09/cach-viet-profile-cong-ty-chuyen-nghiep-6-280x280.jpg.webp',
                image_configs: {
                    display_in_pages: ['home', 'service'],
                },
                description: 'Máy in và photocopy kỹ thuật số đen trắng - sử dụng dòng máy của hãng Ricoh từ máy ricoh MP 7500 đến máy ricoh MP 9001 và các máy pro 1107EX cho tốc độ cao, sản lượng in đen trắng - photocopy trên lý thuyết đạt tới 105.000 lượt in trên giờ.',
                path: 'dich-vu/in-trang-den',
                content: CategoryContent,
                is_leaf: true,
                childrens: []
            }
        ]
    }
]