import { Header, Footer } from '@/components/five-lives/shell';
import { IntakeFlow } from '@/components/five-lives/intake-flow';
export const metadata = {
  title: 'My five',
  robots: { index: false, follow: false },
};
export default function MyFivePage() {
  return (
    <>
      <Header />
      <IntakeFlow review />
      <Footer />
    </>
  );
}
