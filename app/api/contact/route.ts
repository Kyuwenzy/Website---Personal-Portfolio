import { NextRequest, NextResponse } from 'next/server';

/*
  /app/api/contact/route.ts
  ──────────────────────────
  Receives form data, sends email via Resend API.

  ONE-TIME SETUP:
  1. npm install resend
  2. Sign up free at https://resend.com (no credit card needed)
  3. Go to resend.com/api-keys → Create API key
  4. Create .env.local in your project root:
       RESEND_API_KEY=re_xxxxxxxxxxxx
       CONTACT_EMAIL=quenzzynavelgas123@gmail.com
  5. Restart dev server: npm run dev

  For Vercel deployment:
  - Go to your Vercel project → Settings → Environment Variables
  - Add RESEND_API_KEY and CONTACT_EMAIL there

  NOTE: On Resend free plan you can send from onboarding@resend.dev
  to any email. To send from a custom domain like hi@quenzzy.dev,
  you'll need to verify a domain in Resend (free).
*/

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || 'quenzzynavelgas123@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: subject
          ? `[Portfolio] ${subject}`
          : `[Portfolio] New message from ${name}`,
        html: `
          <div style="font-family: 'JetBrains Mono', monospace; max-width: 600px; margin: 0 auto; padding: 40px; background: #0E0D0B; color: #F0EDE6;">
            <div style="border-bottom: 1px solid rgba(240,237,230,0.15); padding-bottom: 24px; margin-bottom: 24px;">
              <p style="font-size: 10px; letter-spacing: 0.3em; color: #B8922A; text-transform: uppercase; margin: 0 0 8px;">
                PORTFOLIO TRANSMISSION
              </p>
              <h1 style="font-size: 28px; font-weight: 300; margin: 0; font-family: 'Cormorant Garamond', serif; letter-spacing: -0.02em;">
                New Message Received
              </h1>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid rgba(240,237,230,0.1);">
                <td style="padding: 12px 0; font-size: 9px; letter-spacing: 0.3em; color: rgba(240,237,230,0.4); text-transform: uppercase; width: 120px;">From</td>
                <td style="padding: 12px 0; font-size: 14px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(240,237,230,0.1);">
                <td style="padding: 12px 0; font-size: 9px; letter-spacing: 0.3em; color: rgba(240,237,230,0.4); text-transform: uppercase;">Email</td>
                <td style="padding: 12px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #D4A843; text-decoration: none;">${email}</a></td>
              </tr>
              ${subject ? `
              <tr style="border-bottom: 1px solid rgba(240,237,230,0.1);">
                <td style="padding: 12px 0; font-size: 9px; letter-spacing: 0.3em; color: rgba(240,237,230,0.4); text-transform: uppercase;">Subject</td>
                <td style="padding: 12px 0; font-size: 14px;">${subject}</td>
              </tr>` : ''}
            </table>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(240,237,230,0.1);">
              <p style="font-size: 9px; letter-spacing: 0.3em; color: rgba(240,237,230,0.4); text-transform: uppercase; margin: 0 0 16px;">
                MESSAGE
              </p>
              <p style="font-size: 15px; line-height: 1.8; color: rgba(240,237,230,0.85); font-family: 'DM Sans', sans-serif; white-space: pre-wrap;">
                ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
              </p>
            </div>

            <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid rgba(240,237,230,0.08); font-size: 8px; letter-spacing: 0.2em; color: rgba(240,237,230,0.3); text-transform: uppercase;">
              QJN.PORTFOLIO // AUTOMATED DISPATCH // ${new Date().toUTCString()}
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resend error:', errorData);
      return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
