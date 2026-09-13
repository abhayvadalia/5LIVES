import { ShadowHome } from '@/components/five-lives/shadow-home';
export const metadata = {
  title: 'Five lives. One beginning.',
  description:
    'Imagine five other lives. Find the people, lessons and experiences to live a little of each.',
};
export default function HomePage() {
  return <ShadowHome variant="imagined" />;
}
