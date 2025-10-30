
'use client';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1433518247705186415/HU3nmKoZYX17z3S0bPwoEJ_QAglEvuOngD3jVrfQ4fvpUIy67BwNwp7Rgu4oRYkf9Ach';

const TRACKING_ID_KEY = 'focuslinks_tracking_id';
const QUIZ_SESSION_KEY_PREFIX = 'quizSession-';

function getTrackingId(): string {
    if (typeof window === 'undefined') {
        return 'server';
    }

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

    let trackingId = localStorage.getItem(TRACKING_ID_KEY);
    if (!trackingId) {
        trackingId = `anon-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
        localStorage.setItem(TRACKING_ID_KEY, trackingId);
    }
    return `🕵️ ${trackingId}`;
}

function getPageTitle(pathname: string): string {
    if (pathname === '/') return '🏠 Viewing Homepage';
    
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];

    if (pathname.startsWith('/profile/')) {
        return `👤 Viewing Profile: **${lastPart}**`;
    }
    if (pathname.startsWith('/events/') || pathname.startsWith('/academy/')) {
        const prefix = pathname.startsWith('/academy/') ? 'Academy Event' : 'Event';
        return `🗓️ Viewing ${prefix}: **${lastPart}**`;
    }
     if (pathname.startsWith('/jobs/')) {
        return `💼 Viewing Job: **${lastPart}**`;
    }
    if (pathname.startsWith('/forum/')) {
        return `💬 Viewing Forum Post: **${lastPart}**`;
    }

    const pageName = (lastPart || 'page').replace(/-/g, ' ');
    const capitalized = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return `📄 Navigating to: **${capitalized}**`;
}

export function logActivity(pathname: string, queryString?: string) {
    if (typeof window === 'undefined' || !WEBHOOK_URL) return;

    let message = getPageTitle(pathname);
    if(queryString) {
        message += `\n*Query:* \`${queryString}\``
    }
    
    const trackingId = getTrackingId();

    const embed = {
        description: message,
        author: {
            name: trackingId,
        },
        color: 8421504,
        timestamp: new Date().toISOString(),
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
    }).catch(error => {
        console.error("Failed to log activity:", error);
    });
}

export function logFormSubmission(message: string) {
     if (typeof window === 'undefined' || !WEBHOOK_URL) return;
    
    const trackingId = getTrackingId();

    const embed = {
        description: message,
        author: {
            name: trackingId,
        },
        color: 3066993, // Green color
        timestamp: new Date().toISOString(),
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
    }).catch(error => {
        console.error("Failed to log form submission:", error);
    });
}

export function logSearch(message: string) {
     if (typeof window === 'undefined' || !WEBHOOK_URL) return;
    
    const trackingId = getTrackingId();

    const embed = {
        description: message,
        author: {
            name: trackingId,
        },
        color: 3447003, // Blue color
        timestamp: new Date().toISOString(),
    };

    fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
    }).catch(error => {
        console.error("Failed to log search:", error);
    });
}
