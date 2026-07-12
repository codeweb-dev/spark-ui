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
        <article className="typeset typeset-docs max-w-[37em] mx-auto">
          <h1>Terms of Service</h1>
          <p>
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing, downloading, or using {SITE_CONFIG.name}, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you are prohibited from using the components, templates, or documentation provided on this site.
          </p>

          <h2>2. License &amp; Ownership</h2>
          <p>
            {SITE_CONFIG.name} is open-source software licensed under the MIT License. You are granted the right to use, copy, modify, merge, publish, and distribute the components for both personal and commercial purposes. You must include the original copyright notice and permission notice in all copies or substantial portions of the Software.
          </p>

          <h2>3. Disclaimer of Warranty</h2>
          <p>
            <em>
              THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </em>
          </p>

          <h2>4. Code Modifications</h2>
          <p>
            We reserve the right to modify, update, or discontinue any component, documentation page, or code registry item at any time without prior notice. Your continued use of the library after updates are published constitutes acceptance of those changes.
          </p>

          <h2>5. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the developer resides, without regard to its conflict of law provisions.
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
