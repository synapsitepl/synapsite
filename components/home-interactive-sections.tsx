"use client"

import dynamic from "next/dynamic"

const FAQ = dynamic(() => import("@/components/faq").then((mod) => ({ default: mod.FAQ })), {
  ssr: false,
  loading: () => (
    <section id="faq" className="relative px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Najczęstsze <span className="text-primary">pytania</span>
          </h2>
        </div>
      </div>
    </section>
  ),
})

const InlineContactForm = dynamic(
  () => import("@/components/inline-contact-form").then((mod) => ({ default: mod.InlineContactForm })),
  {
    ssr: false,
    loading: () => (
      <section id="kontakt-formularz" className="relative px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Opowiedz krótko, czego <span className="text-primary">potrzebujesz</span>
            </h2>
          </div>
        </div>
      </section>
    ),
  }
)

export function HomeInteractiveSections() {
  return (
    <>
      <FAQ />
      <InlineContactForm />
    </>
  )
}
