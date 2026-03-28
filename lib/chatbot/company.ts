export type OfferCategory =
  | "website"
  | "chatbot"
  | "voicebot"
  | "custom";

export interface ProcessStep {
  step: number;
  name: string;
  description: string;
}

export interface OfferPackage {
  id: string;
  category: OfferCategory;
  name: string;
  subtitle: string;
  pricePLN?: number;
  monthlyMaintenancePLN?: number;
  pricingNote?: string;
  idealFor: string;
  features: string[];
}

export interface CompanyData {
  brand: string;
  website: string;
  positioning: string;
  heroTitle: string;
  heroDescription: string;
  coreServices: string[];
  valuePropositions: string[];
  outcomes: string[];
  targetClients: string[];
  process: ProcessStep[];
  packages: OfferPackage[];
  leadPrompt: string;
  responseRules: {
    defaultLanguage: string;
    tone: string[];
    doNotClaim: string[];
    escalationWhenUnknown: string[];
  };
}

export const COMPANY: CompanyData = {
  brand: "Synapsite",
  website: "https://synapsite.pl",
  positioning: "Strony WWW & AI dla firm",
  heroTitle: "Strony internetowe i boty AI, które pomagają zdobywać klientów",
  heroDescription:
    "Projektujemy nowoczesne strony internetowe oraz wdrażamy chatboty i voiceboty AI, które wspierają sprzedaż, automatyzują obsługę klienta i oszczędzają czas zespołu.",
  coreServices: [
    "Strony internetowe dla firm",
    "Chatboty AI",
    "Voiceboty AI",
    "Rozwiązania szyte na miarę",
  ],
  valuePropositions: [
    "Nowoczesny i profesjonalny wizerunek online",
    "Czytelny przekaz sprzedażowy",
    "Techniczne przygotowanie pod SEO",
    "Automatyzacja obsługi dzięki AI",
    "Wygodne zarządzanie treścią",
    "Rozwiązanie dopasowane do branży, celu i budżetu",
  ],
  outcomes: [
    "Budowanie zaufania od pierwszego wejścia na stronę",
    "Większa liczba zapytań dzięki lepiej zaprojektowanej komunikacji",
    "Szybka i responsywna strona dopasowana do telefonów i komputerów",
    "Mniej powtarzalnych pytań dzięki chatbotowi lub voicebotowi AI",
  ],
  targetClients: [
    "Małe i średnie firmy",
    "Lokalne usługi",
    "Marki osobiste",
    "Startupy",
    "Firmy, które chcą zautomatyzować kontakt z klientem",
  ],
  process: [
    {
      step: 1,
      name: "Brief",
      description: "Klient wysyła brief lub krótki opis firmy.",
    },
    {
      step: 2,
      name: "Bezpłatny projekt",
      description:
        "Analizujemy potrzeby i przygotowujemy bezpłatny projekt strony głównej.",
    },
    {
      step: 3,
      name: "Konsultacja",
      description: "Omawiamy uwagi i dopracowujemy kierunek.",
    },
    {
      step: 4,
      name: "Realizacja",
      description: "Realizujemy stronę lub wdrożenie AI.",
    },
    {
      step: 5,
      name: "Publikacja",
      description:
        "Publikujemy gotowe rozwiązanie i przekazujemy je do dalszego użycia.",
    },
  ],
  packages: [
    {
      id: "start",
      category: "website",
      name: "Pakiet Start",
      subtitle: "Landing page / one page",
      pricePLN: 999,
      pricingNote: "999 zł bez CMS lub 1499 zł z CMS do samodzielnej edycji",
      idealFor:
        "Szybki start z profesjonalną obecnością online i zbieraniem zapytań.",
      features: [
        "Nowoczesny projekt strony",
        "Jedna długa strona sprzedażowa",
        "Pełna responsywność",
        "Formularz kontaktowy",
        "CMS do samodzielnej edycji za dopłatą",
        "Wersja z CMS: 1499 zł",
        "Wdrożenie techniczne",
      ],
    },
    {
      id: "business",
      category: "website",
      name: "Pakiet Business",
      subtitle: "Strona firmowa",
      pricePLN: 2899,
      idealFor:
        "Firmy, które potrzebują mocniejszego wizerunku, kilku podstron i dobrej bazy pod rozwój.",
      features: [
        "Do 5 podstron",
        "Indywidualny projekt",
        "Techniczne SEO",
        "Optymalizacja szybkości",
        "Integracje kontaktowe i analityczne",
        "CMS i łatwa edycja treści",
      ],
    },
    {
      id: "custom",
      category: "custom",
      name: "Pakiet Custom",
      subtitle: "Aplikacja / sklep / rozwiązanie szyte na miarę",
      pricingNote: "Wycena indywidualna",
      idealFor:
        "Biznesy, które potrzebują więcej niż standardowa strona internetowa.",
      features: [
        "Sklep internetowy",
        "Aplikacja webowa",
        "Integracje API",
        "Niestandardowe moduły",
        "Rozwiązania dopasowane do procesu w firmie",
      ],
    },
    {
      id: "chatbot-ai",
      category: "chatbot",
      name: "Chatbot AI",
      subtitle:
        "Chatbot AI, który odpowiada klientom nawet wtedy, gdy zespół pracuje nad czymś innym",
      pricePLN: 1999,
      monthlyMaintenancePLN: 200,
      idealFor:
        "Firmy, które codziennie odpowiadają na te same pytania i chcą szybciej zamieniać ruch na stronie w zapytania.",
      features: [
        "Odpowiadanie na pytania klientów 24/7",
        "Przedstawianie oferty",
        "Zbieranie leadów",
        "Kwalifikacja zapytań",
        "Odciążenie z powtarzalnej komunikacji",
      ],
    },
    {
      id: "voicebot-ai",
      category: "voicebot",
      name: "Voicebot AI",
      subtitle:
        "Voicebot AI, który odbiera połączenia i prowadzi rozmowę za firmę",
      pricePLN: 4499,
      monthlyMaintenancePLN: 450,
      idealFor:
        "Firmy, które chcą obsługiwać więcej połączeń bez zwiększania obciążenia zespołu.",
      features: [
        "Odbieranie telefonów",
        "Przekazywanie podstawowych informacji",
        "Umawianie terminów",
        "Kwalifikowanie rozmów",
        "Przekierowywanie klienta do odpowiedniej osoby",
      ],
    },
  ],
  leadPrompt:
    "Opowiedz krótko, czego potrzebujesz: strony internetowej, chatbota AI, voicebota AI lub pełnego rozwiązania.",
  responseRules: {
    defaultLanguage: "pl",
    tone: [
      "profesjonalny",
      "konkretny",
      "jasny",
      "doradczy",
      "sprzedażowy, ale nienachalny",
    ],
    doNotClaim: [
      "Nie obiecuj gwarantowanych wyników biznesowych.",
      "Nie deklaruj terminów realizacji bez doprecyzowania zakresu.",
      "Nie podawaj cen innych niż zapisane w packages.",
      "Nie wymyślaj funkcji, case studies ani opinii klientów.",
    ],
    escalationWhenUnknown: [
      "To zależy od zakresu i wymaga doprecyzowania.",
      "Mogę pomóc to wstępnie oszacować, jeśli opiszesz potrzeby.",
      "W przypadku bardziej złożonego wdrożenia przygotujemy indywidualną wycenę.",
    ],
  },
};

export default COMPANY;
