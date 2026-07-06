import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Update FROM once you verify unmatrix.in in Resend dashboard
const FROM = process.env.RESEND_FROM ?? 'Unmatrix <onboarding@resend.dev>'

function buildHtml(name: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:48px 0;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;padding:0 24px;">
      <tr><td style="padding-bottom:36px;">
        <span style="font-size:17px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Unmatrix</span>
      </td></tr>
      <tr><td style="padding-bottom:20px;">
        <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">Thanks, ${name}.</h1>
      </td></tr>
      <tr><td style="padding-bottom:32px;">${bodyHtml}</td></tr>
      <tr><td style="border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;">
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.8;">
          Unmatrix &middot; Build Beyond the System<br>
          Pune, India &middot;
          <a href="mailto:founder@unmatrix.in" style="color:rgba(255,255,255,0.4);text-decoration:none;">founder@unmatrix.in</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

export async function sendLeadEmail(to: string, name: string) {
  if (!resend) return
  try {
    await resend.emails.send({
      from: FROM,
      to: [to],
      subject: "Welcome to Unmatrix — We'll be in touch",
      html: buildHtml(name, `
        <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">
          Thank you for visiting <strong style="color:#ffffff;">Unmatrix</strong> and showing interest in what we're building.
          It means a lot to us.
        </p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">
          We've received your request and will personally reach out to you within
          <strong style="color:#ffffff;">24 hours</strong> to discuss how we can help you build beyond the system.
        </p>
        <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">
          Until then, feel free to write to us anytime at
          <a href="mailto:founder@unmatrix.in" style="color:#ffffff;">founder@unmatrix.in</a>.
        </p>
      `),
    })
  } catch (err) {
    console.error('[email] sendLeadEmail failed:', err)
  }
}

export async function sendContactEmail(to: string, name: string) {
  if (!resend) return
  try {
    await resend.emails.send({
      from: FROM,
      to: [to],
      subject: "Welcome to Unmatrix — We'll be in touch",
      html: buildHtml(name, `
        <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">
          Thank you for visiting <strong style="color:#ffffff;">Unmatrix</strong> and taking the time to reach out.
          It means a lot to us.
        </p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">
          We've received your message and will get back to you within
          <strong style="color:#ffffff;">24 hours</strong>. We're excited to connect and explore how we can work together.
        </p>
        <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.65);">
          In the meantime, feel free to reach us directly at
          <a href="mailto:founder@unmatrix.in" style="color:#ffffff;">founder@unmatrix.in</a>.
        </p>
      `),
    })
  } catch (err) {
    console.error('[email] sendContactEmail failed:', err)
  }
}
