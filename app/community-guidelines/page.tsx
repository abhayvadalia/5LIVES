import { LegalPage } from '@/components/five-lives/legal-page';
export const metadata = { title: 'Community guidelines' };
export default function GuidelinesPage() {
  return (
    <LegalPage title="A little care for each other.">
      <h2>Begin without comparison</h2>
      <p>
        People bring different histories, bodies, budgets and amounts of free
        time. Make room for beginners. Ask before giving advice. A missed
        session does not need an explanation.
      </p>
      <h2>Keep private things private</h2>
      <p>
        Do not copy someone’s story, photograph, message or contact details
        outside their circle without permission. Ask before taking or posting
        photographs. A name in a circle is not permission to contact that person
        elsewhere.
      </p>
      <h2>Share what happened</h2>
      <p>
        When member threads open, use them for what you actually did: a draft, a
        small attempt, a difficulty or a finished thing. No unsolicited sales
        messages or pressure to buy services.
      </p>
      <h2>Respect boundaries</h2>
      <p>
        Harassment, discrimination, threats, sexual pressure and repeated
        unwanted contact have no place here. Follow the teacher’s safety
        instructions and published participation requirements for an activity.
      </p>
      <h2>Speak up</h2>
      <p>
        A reporting and review process will be published before member posting
        opens. We will not open a shared space before people have a clear way to
        report a problem.
      </p>
    </LegalPage>
  );
}
