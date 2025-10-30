
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1433518247705186415/HU3nmKoZYX17z3S0bPwoEJ_QAglEvuOngD3jVrfQ4fvpUIy67BwNwp7Rgu4oRYkf9Ach';

export async function logActivity(message: string) {
    const embed = {
        description: message,
        color: 8421504, // Grey color
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] }),
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}
