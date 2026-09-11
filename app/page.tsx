import { ShadowHome } from '@/components/five-lives/shadow-home';
export const metadata = {
  title: 'Five lives. What if?',
  description:
    'Imagine five other lives. Notice what draws you to them, and bring a small part of one into this week.',
};
export default function HomePage() {
  return <ShadowHome variant="imagined" />;
}
