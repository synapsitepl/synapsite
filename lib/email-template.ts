interface ContactEmailProps {
  name: string
  company?: string
  email: string
  phone?: string
  serviceType?: string
  budget?: string
  timeline?: string
  message?: string
}

const serviceLabels: Record<string, string> = {
  www: "Strona WWW",
  sklep: "Sklep internetowy",
  chatbot: "Chatbot AI",
  voicebot: "Voicebot AI",
  automatyzacja: "Automatyzacja procesów",
  inne: "Inne",
}

export function buildContactEmail(data: ContactEmailProps): string {
  const serviceLabel = data.serviceType
    ? serviceLabels[data.serviceType] || data.serviceType
    : "Nie podano"

  return `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="color:#8b5cf6;font-size:24px;font-weight:700;margin:0;">
        SYNAP<span style="color:#d946ef;">SITE</span>
      </h1>
      <p style="color:#a1a1aa;font-size:14px;margin:8px 0 0;">Nowe zapytanie z formularza kontaktowego</p>
    </div>

    <!-- Content -->
    <div style="background-color:#111111;border:1px solid #262626;border-radius:12px;padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;width:140px;vertical-align:top;">Imię i nazwisko</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;font-weight:500;">${escapeHtml(data.name)}</td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;vertical-align:top;">Firma</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;">${escapeHtml(data.company)}</td>
        </tr>` : ""}
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;vertical-align:top;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;">
            <a href="mailto:${escapeHtml(data.email)}" style="color:#8b5cf6;text-decoration:none;">${escapeHtml(data.email)}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;vertical-align:top;">Telefon</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;">
            <a href="tel:${escapeHtml(data.phone)}" style="color:#8b5cf6;text-decoration:none;">${escapeHtml(data.phone)}</a>
          </td>
        </tr>` : ""}
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;vertical-align:top;">Usługa</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;">${escapeHtml(serviceLabel)}</td>
        </tr>
        ${data.budget ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;vertical-align:top;">Budżet</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;">${escapeHtml(data.budget)}</td>
        </tr>` : ""}
        ${data.timeline ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#a1a1aa;font-size:13px;vertical-align:top;">Termin</td>
          <td style="padding:12px 0;border-bottom:1px solid #262626;color:#fafafa;font-size:14px;">${escapeHtml(data.timeline)}</td>
        </tr>` : ""}
        ${data.message ? `
        <tr>
          <td style="padding:12px 0;color:#a1a1aa;font-size:13px;vertical-align:top;">Wiadomość</td>
          <td style="padding:12px 0;color:#fafafa;font-size:14px;line-height:1.6;">${escapeHtml(data.message).replace(/\n/g, "<br/>")}</td>
        </tr>` : ""}
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:24px;">
      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background-color:#8b5cf6;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:8px;">
        Odpowiedz klientowi
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid #262626;">
      <p style="color:#a1a1aa;font-size:12px;margin:0;">
        Ta wiadomość została wygenerowana automatycznie przez formularz kontaktowy na stronie Synapsite.
      </p>
    </div>
  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
