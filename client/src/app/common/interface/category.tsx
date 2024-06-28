interface ICategory {
    name: string,
    label: string,
    slug: string,
    image: string,
    image_configs: {
        display_in_pages: string[],
    }
    description: string,
    content: string,
    path: string,
    is_leaf: boolean,
    childrens: ICategory[]
  }