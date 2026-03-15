import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="kontakt" className="border-t border-border bg-card/30 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
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
              Tworzymy nowoczesne strony internetowe i wdrażamy rozwiązania AI, które automatyzują obsługę klienta i zwiększają sprzedaż.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:kontakt@webai.pl"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
kontakt@synapsite.pl
              </a>
              <a
                href="tel:+48123456789"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                +48 123 456 789
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Warszawa, Polska
              </span>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Informacje</h4>
            <ul className="space-y-2">
              {[
                "O nas",
                "Realizacje",
                "Blog",
                "Polityka prywatności",
                "Regulamin",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Synapsite. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
