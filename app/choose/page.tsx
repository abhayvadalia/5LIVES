import { Header, Footer } from '@/components/five-lives/shell';
import { IntakeFlow } from '@/components/five-lives/intake-flow';
export const metadata = {
  title: 'Choose your five',
  robots: { index: false, follow: false },
};
export default function ChoosePage() {
  return (
    <>
      <Header />
      <IntakeFlow />
      <Footer />
    </>
  );
}
