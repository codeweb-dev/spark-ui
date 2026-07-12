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
        <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <div className="space-y-2 border-b border-border pb-6">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              {SITE_CONFIG.name} is a client-side component library. We do not collect, store, or process any personal data from the code packages or components you integrate into your own apps. If you browse our documentation website, standard anonymous analytical data may be collected via platforms like Vercel Analytics to monitor and improve website performance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Cookies & Local Storage</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              Our documentation website may use cookies and browser local storage solely to preserve user preferences (for example, saving your dark mode/light mode theme selection) and to enable basic analytics. We do not use advertising cookies or target tracking identifiers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              We deploy our documentation website on Vercel. Vercel automatically collects server logs and provides web analytics. Vercel processes this data in accordance with their privacy guidelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              We may update this Privacy Policy from time to time. Any updates will be published on this page with an updated &ldquo;Last Updated&rdquo; timestamp. We encourage you to review this page periodically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Contact</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              If you have any questions or feedback regarding our privacy practices, feel free to open an issue on our GitHub repository or contact us on Twitter.
            </p>
          </section>
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
