import { Navbar } from "@/components/landing/Navbar";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-20">
        <article className="typeset typeset-docs max-w-[37em] mx-auto">
          <h1>Privacy Policy</h1>
          <p>
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            {SITE_CONFIG.name} is a client-side component library. We do not collect, store, or process any personal data from the code packages or components you integrate into your own apps. If you browse our documentation website, standard anonymous analytical data may be collected via platforms like Vercel Analytics to monitor and improve website performance.
          </p>

          <h2>2. Cookies &amp; Local Storage</h2>
          <p>
            Our documentation website may use cookies and browser local storage solely to preserve user preferences (for example, saving your dark mode/light mode theme selection) and to enable basic analytics. We do not use advertising cookies or target tracking identifiers.
          </p>

          <h2>3. Third-Party Services</h2>
          <p>
            We deploy our documentation website on Vercel. Vercel automatically collects server logs and provides web analytics. Vercel processes this data in accordance with their privacy guidelines.
          </p>

          <h2>4. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any updates will be published on this page with an updated &ldquo;Last Updated&rdquo; timestamp. We encourage you to review this page periodically.
          </p>

          <h2>5. Contact</h2>
          <p>
            If you have any questions or feedback regarding our privacy practices, feel free to open an issue on our GitHub repository or contact us on Twitter.
          </p>
        </article>

        {/* Simple Policy Footer */}
        <footer className="mt-24 border-t border-border/40 pt-10 pb-6 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
            <div className="flex gap-6 font-light">
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
