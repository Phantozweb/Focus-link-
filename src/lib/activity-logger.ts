
'use client';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1433518247705186415/HU3nmKoZYX17z3S0bPwoEJ_QAglEvuOngD3jVrfQ4fvpUIy67BwNwp7Rgu4oRYkf9Ach';

const TRACKING_ID_KEY = 'focuslinks_tracking_id';
const QUIZ_SESSION_KEY_PREFIX = 'quizSession-';

function getTrackingId(): string {
    if (typeof window === 'undefined') {
        return 'server';
    }

    // Prioritize quiz membership ID if it exists and is valid
    for (const key in localStorage) {
        if (key.startsWith(QUIZ_SESSION_KEY_PREFIX)) {
            try {
                const sessionData = JSON.parse(localStorage.getItem(key) || '{}');
                if (sessionData.membershipId) {
                    return `👤 ${sessionData.membershipId}`;
                }
            } catch (e) {
                // Ignore parsing errors
            }
        }
    }

    // Fallback to anonymous tracking ID
    let trackingId = localStorage.getItem(TRACKING_ID_KEY);
    if (!trackingId) {
        trackingId = `anon-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
        localStorage.setItem(TRACKING_ID_KEY, trackingId);
    }
    return `🕵️ ${trackingId}`;
}


export async function logActivity(message: string) {
    if (typeof window === 'undefined' || !WEBHOOK_URL) return;

    const trackingId = getTrackingId();

    const embed = {
        description: message,
        author: {
            name: trackingId,
        },
        color: 8421504, // Grey color
        timestamp: new Date().toISOString(),
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
