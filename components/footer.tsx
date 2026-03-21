import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="kontakt" className="border-t border-border bg-card/30 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src="/logo-icon.png"
                alt="Synapsite"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <span className="text-2xl font-semibold tracking-tight">
                <span className="text-white">SYNAP</span>
                <span className="text-primary">SITE</span>
              </span>
            </div>
            <p className="mb-6 max-w-md text-muted-foreground">
              Projektuję nowoczesne strony internetowe oraz wdrażam chatboty i
              voiceboty AI, które wspierają sprzedaż i automatyzują obsługę
              klienta.
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-foreground">Kacper Drozd</p>
              <a
                href="mailto:kontakt@synapsite.pl"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                kontakt@synapsite.pl
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Lublin, Polska
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Usługi</h4>
            <ul className="space-y-2">
              {[
                "Strony WWW",
                "Sklepy internetowe",
                "Chatboty AI",
                "Voiceboty AI",
                "Aplikacje webowe",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#cennik"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Informacje</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#jak-to-dziala"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  O mnie
                </a>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Realizacje
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  href="/regulamin"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Synapsite. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
