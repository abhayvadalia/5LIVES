import { LegalPage } from '@/components/five-lives/legal-page';
export const metadata = { title: 'Cancellation and refunds' };
export default function RefundsPage() {
  return (
    <LegalPage title="Cancellation and refunds.">
      <h2>No charges are being taken</h2>
      <p>
        The exercise and interest lists are free. There is no active checkout,
        subscription or booking on this version, so there is no charge to cancel
        or refund.
      </p>
      <h2>Planned membership policy</h2>
      <p>
        When paid membership opens, cancellation will stop future renewal from
        the account page in one click. No email or retention conversation will
        be required.
      </p>
      <p>
        The planned refund window is 14 days from an annual charge. Within that
        window, the unused portion of the annual fee will be refundable
        pro-rata; after 14 days, no refund will be offered for that annual
        period. Cancelling outside the refund window will stop the next renewal
        while preserving access for the paid period.
      </p>
      <h2>Renewal information</h2>
      <p>
        Before an annual mandate is authorised, checkout will show the amount,
        frequency, next renewal date and cancellation method. A renewal reminder
        is planned seven days before a charge. Recurring billing is not enabled
        yet.
      </p>
      <h2>Hosted experiences</h2>
      <p>
        Each confirmed experience will publish its own cancellation,
        rescheduling and refund terms before booking opens. No experience can
        currently be purchased.
      </p>
    </LegalPage>
  );
}
