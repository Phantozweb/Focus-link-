import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.error('DISCORD_WEBHOOK_URL environment variable is not set.');
    return NextResponse.json({ message: 'Server configuration error: Webhook URL is missing.' }, { status: 500 });
  }

  try {
    const data = await request.json();
    const { name, email, country, role } = data;

    if (!name || !email || !country || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const discordPayload = {
      embeds: [
        {
          title: 'New Membership Application',
          color: 3447003, // A nice blue color
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Country', value: country, inline: true },
            { name: 'Role', value: role, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      console.error('Failed to send to Discord:', discordResponse.status, await discordResponse.text());
      return NextResponse.json({ message: 'Failed to send notification' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
