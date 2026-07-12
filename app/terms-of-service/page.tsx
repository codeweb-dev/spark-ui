import { Navbar } from "@/components/landing/Navbar";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_CONFIG.name}`,
};

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-20">
        <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <div className="space-y-2 border-b border-border pb-6">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              By accessing, downloading, or using {SITE_CONFIG.name}, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you are prohibited from using the components, templates, or documentation provided on this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. License & Ownership</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              {SITE_CONFIG.name} is open-source software licensed under the MIT License. You are granted the right to use, copy, modify, merge, publish, and distribute the components for both personal and commercial purposes. You must include the original copyright notice and permission notice in all copies or substantial portions of the Software.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Disclaimer of Warranty</h2>
            <p className="text-muted-foreground leading-relaxed font-light italic">
              THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Code Modifications</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              We reserve the right to modify, update, or discontinue any component, documentation page, or code registry item at any time without prior notice. Your continued use of the library after updates are published constitutes acceptance of those changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed font-light">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the developer resides, without regard to its conflict of law provisions.
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
