export const metadata = {
  title: "Terms of Service"
};

export default function TermsOfServicePage() {
  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">
          Version as of {new Date().toLocaleDateString("en-US")}
        </p>
      </header>
      <section className="space-y-4 text-sm text-muted-foreground">
        <p>
          By using Content Labs 416, you agree to the terms below. If you do not agree — do not use the service.
        </p>
        <h2 className="text-lg font-semibold text-foreground">1. Provision of Service</h2>
        <p>
          We provide access to AI tools "as is". Changes or discontinuation may occur without prior notice. Compensation is limited to the amount paid over the last 3 months.
        </p>
        <h2 className="text-lg font-semibold text-foreground">2. Acceptable Use</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not use the service for prohibited content (spam, malicious materials).</li>
          <li>Do not attempt to reverse engineer the infrastructure and models.</li>
          <li>Comply with the laws of the country where you operate.</li>
        </ul>
        <h2 className="text-lg font-semibold text-foreground">3. Liability</h2>
        <p>
          We are not responsible for decisions based on AI recommendations. Verify facts and use common sense.
        </p>
        <h2 className="text-lg font-semibold text-foreground">4. Privacy</h2>
        <p>
          Data management is described in the Privacy Policy. By using the service, you acknowledge that data may be processed by third-party AI providers.
        </p>
        <h2 className="text-lg font-semibold text-foreground">5. Billing and Cancellation</h2>
        <p>
          Subscriptions can be canceled at any time before the next billing period. Refunds are discussed on a case-by-case basis.
        </p>
        <h2 className="text-lg font-semibold text-foreground">6. Changes to Terms</h2>
        <p>
          We may update these terms. Changes take effect 7 days after publication. Continued use constitutes acceptance.
        </p>
      </section>
    </article>
  );
}
