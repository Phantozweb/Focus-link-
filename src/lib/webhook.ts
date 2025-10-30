
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
const PASS_WEBHOOK_URL = 'https://discord.com/api/webhooks/1433514964987150477/7KpL0rAmZIOihjNOMFxbibt-tHeD_M7JNQjKnEuzpm1o101vGCZjgWKw0mJ8Uar2MjA2';
const FAIL_WEBHOOK_URL = 'https://discord.com/api/webhooks/1433515934475223040/ZMFuaw1Qlv02vhSBujdo1TvdogNQXngfJurDfDORvP02-p4asokLauPysL8xToo6zDu5';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export async function sendQuizStartNotification(membershipId: string) {
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

    const webhookUrl = overallPassed ? PASS_WEBHOOK_URL : FAIL_WEBHOOK_URL;
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
                value: '\u200b' // Zero-width space
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
        console.error("Failed to send quiz result notification:", error);
    }
}
