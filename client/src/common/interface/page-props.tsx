interface IPageProps {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined }
}

interface IMetadataProps {
    params: { slug: string },
}