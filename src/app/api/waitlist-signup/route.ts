
import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1472294474133798943/ZydS4sfdSc8zUnkpSZVw55_bqHz18_nxGZMw7j2tw2okgpB6aYwPJzaue25oRgdvpBN2';

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const embed = {
      title: 'OptoScholar Waitlist Signup',
      description: 'A new user has signed up for the waitlist.',
      color: 5814783, // A nice green color
      fields: [
        {
          name: 'Name',
          value: name,
          inline: true,
        },
        {
          name: 'Email',
          value: email,
          inline: true,
        },
        {
            name: 'Timestamp',
            value: new Date().toISOString(),
            inline: false,
        }
      ],
      footer: {
        text: 'OptoScholar Waitlist',
      },
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      console.error('Failed to send waitlist notification to Discord', await response.text());
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successfully signed up for the waitlist!' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
