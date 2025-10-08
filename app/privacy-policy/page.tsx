export const metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPolicyPage() {
  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString("en-US")}
        </p>
      </header>
      <section className="space-y-4 text-sm text-muted-foreground">
        <p>
          We value your trust. This policy explains what data we collect, how we use it, and what rights you have.
        </p>
        <h2 className="text-lg font-semibold text-foreground">1. Data Collection</h2>
        <p>
          We collect data that you provide manually (forms, comments), as well as technical information (cookies, IP, device). If you use AI tools, your inputs are stored to improve quality and for audit purposes.
        </p>
        <h2 className="text-lg font-semibold text-foreground">2. Use</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Responding to inquiries and customer support.</li>
          <li>Analytics and improving UX.</li>
          <li>Personalizing recommendations and templates.</li>
        </ul>
        <h2 className="text-lg font-semibold text-foreground">3. Third Parties</h2>
        <p>
          We use cloud providers and AI APIs. Data is transmitted over encrypted channels and processed according to confidentiality agreements. We do not sell or rent your data.
        </p>
        <h2 className="text-lg font-semibold text-foreground">4. Storage</h2>
        <p>
          Data is stored in the EU/US on servers that comply with security standards (SOC2, ISO 27001). Retention periods depend on the type of data and are governed by client policies.
        </p>
        <h2 className="text-lg font-semibold text-foreground">5. Your Rights</h2>
        <p>
          You can request a copy of your data, delete it, or restrict processing. Contact us at [support@gorilladome.com](mailto:support@gorilladome.com).
        </p>
        <h2 className="text-lg font-semibold text-foreground">6. Policy Updates</h2>
        <p>
          We update this policy as our services change. The latest version is published on this page.
        </p>
      </section>
    </article>
  );
}
