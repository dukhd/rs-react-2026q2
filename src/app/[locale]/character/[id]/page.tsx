import RootPage from '../../page';

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function CharacterBackgroundPage(
  props: Readonly<PageProps>
) {
  return <RootPage {...props} />;
}
