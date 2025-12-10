import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nom et email sont obligatoires.' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook non configuré côté serveur.' },
        { status: 500 }
      );
    }

    const payload = {
      name,
      email,
      timestamp: new Date().toISOString()
    };

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('Erreur webhook:', res.status, text);
      return NextResponse.json(
        { error: 'Erreur lors de la transmission aux automatisations.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur API /api/collect:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}
