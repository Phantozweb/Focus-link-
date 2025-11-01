
type ModuleResult = {
  topic: string;
  score: number;
  total: number;
  timeTaken: number;
  totalTime: number;
  passed: boolean;
  totalPoints: number;
  bonusPoints: number;
};

interface QuizResultPayload {
    membershipId: string;
    finalScore: number;
    totalPossiblePoints: number;
    totalTimeTaken: number;
    overallPercentage: number;
    overallPassed: boolean;
    moduleResults: ModuleResult[];
    attemptsLeft: number;
}

const START_WEBHOOK_URL = 'https://discord.com/api/webhooks/1433513938867196049/Vj3XRu2e1IttN_mvwdRK9RWv-SaIywdSI_cqlrxZpIuMi9KcvDMp6v759xe2CMRNOHQp';
const RESULTS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyJGaDf-xT9XnI49HmKdktKrxti3N5cxKGGfJZEUAZQCaGvPCJR9iR00FnbqqGbo6bhdw/exec';


const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export async function sendQuizStartNotification(membershipId: string) {
    // This logs the entry to your Google Sheet via the new API route
    try {
        await fetch('/api/log-quiz-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ membershipId }),
        });
    } catch (error) {
        console.error("Failed to log quiz entry to Google Sheet:", error);
    }
    
    // This sends a notification to your Discord channel
    const embed = {
        title: '🚀 Quiz Arena Entry',
        description: `A new participant has entered the arena!`,
        color: 3447003, // Blue
        fields: [
            {
                name: 'Membership ID',
                value: `\`${membershipId}\``,
                inline: true
            },
             {
                name: 'Timestamp',
                value: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
                inline: true
            }
        ],
        footer: {
            text: 'Eye Q Arena 2025'
        }
    };

    try {
        await fetch(START_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] }),
        });
    } catch (error) {
        console.error("Failed to send quiz start notification:", error);
    }
}


export async function sendQuizResultNotification(payload: QuizResultPayload) {
    const { membershipId, finalScore, totalPossiblePoints, totalTimeTaken, overallPercentage, overallPassed, moduleResults, attemptsLeft } = payload;
    
    // Send to Google Apps Script
    try {
        await fetch(RESULTS_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Use no-cors as Apps Script webhooks often have CORS issues
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Failed to send quiz result to Google Sheet:", error);
    }

    // Send to Discord
    const webhookUrl = overallPassed 
        ? 'https://discord.com/api/webhooks/1433514964987150477/7KpL0rAmZIOihjNOMFxbibt-tHeD_M7JNQjKnEuzpm1o101vGCZjgWKw0mJ8Uar2MjA2' 
        : 'https://discord.com/api/webhooks/1433515934475223040/ZMFuaw1Qlv02vhSBujdo1TvdogNQXngfJurDfDORvP02-p4asokLauPysL8xToo6zDu5';
        
    const title = overallPassed ? '✅ Quiz Passed!' : '❌ Quiz Failed';
    const color = overallPassed ? 3066993 : 15158332; // Green or Red

    const moduleFields = moduleResults.map(r => ({
        name: `${r.passed ? '🟢' : '🔴'} ${r.topic}`,
        value: `Score: **${r.score}/${r.totalPoints}** | Bonus: **${r.bonusPoints}** | Time: ${formatTime(r.timeTaken)}`,
        inline: false
    }));

    const embed = {
        title: title,
        description: `**Participant:** \`${membershipId}\`\n**Attempts Left:** ${attemptsLeft}`,
        color: color,
        fields: [
            {
                name: 'Final Score',
                value: `**${finalScore} / ${totalPossiblePoints}** (${(overallPercentage * 100).toFixed(1)}%)`,
                inline: true
            },
            {
                name: 'Total Time',
                value: formatTime(totalTimeTaken),
                inline: true
            },
            {
                name: '--- Module Breakdown ---',
                value: '​' // Zero-width space
            },
            ...moduleFields
        ],
        footer: {
            text: `Eye Q Arena 2025 | ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`
        }
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] }),
        });
    } catch (error) {
        console.error("Failed to send quiz result notification to Discord:", error);
    }
}
