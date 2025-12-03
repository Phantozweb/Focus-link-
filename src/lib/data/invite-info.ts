
export type RegionInviteInfo = {
    welcomeMessage: string;
    contactInfo: string;
    regionBenefits: string[];
};

export const inviteInfo: { [key: string]: RegionInviteInfo } = {
  'kenya': {
    welcomeMessage: "Karibu! I am excited to welcome you to the Focus Links community in Kenya. Our goal is to build a strong, collaborative network of eye care students and professionals right here. By joining, you'll connect with local peers, access tailored events, and help shape the future of eye care in our nation.",
    contactInfo: "If you have any questions, feel free to reach out to me directly. Let's grow together!",
    regionBenefits: [
        "Build Your Network: Connect with leading optometrists, educators, and students across Kenya.",
        "Local Opportunities: Get priority access to job listings, internships, and clinical workshops in your region.",
        "Exclusive Events: Be the first to know about local study groups, webinars, and meetups tailored for the Kenyan eye care community.",
        "Shape the Future: Play a role in building a stronger, more connected professional community in Kenya."
    ]
  },
  'default': {
    welcomeMessage: "Welcome to Focus Links! I am excited to invite you to our global community. Our mission is to connect eye care students and professionals to foster growth, collaboration, and innovation in the vision science field.",
    contactInfo: "If you have any questions, please feel free to reach out.",
    regionBenefits: [
        "Access a global directory of professionals.",
        "Join international events and webinars.",
        "Participate in clinical case discussions."
    ]
  }
};
