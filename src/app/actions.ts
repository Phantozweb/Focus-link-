
'use server';

interface FeedbackPayload {
    page: string;
    feedback: string;
    contact?: string;
}

const FEEDBACK_WEBHOOK_URL = 'https://discord.com/api/webhooks/1443283270765641812/33KsSWnUfoBRTNgCogRCCao4VU-dSkUgSBYlGnIkIfRHnMWQUpTDEa-Szh0eUdi6InLy';

export async function submitFeedback(payload: FeedbackPayload) {
    const { page, feedback, contact } = payload;
    const embed = {
        title: `📝 New Feedback for: ${page}`,
        description: `> ${feedback}`,
        color: 16776960, // Yellow
        fields: contact ? [{ name: 'Contact Info', value: contact, inline: false }] : [],
        footer: { text: 'Focus Links Platform Feedback' },
        timestamp: new Date().toISOString()
    };
    
    try {
        const response = await fetch(FEEDBACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] }),
        });
        if (!response.ok) {
            throw new Error('Failed to send feedback to webhook.');
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to send feedback notification:", error);
        return { success: false, error: 'Could not send feedback.' };
    }
}
