
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
        "**Build Your Professional Identity:** Create a verified profile in our global directory to showcase your skills and get discovered.",
        "**Find Local Opportunities:** Access a job board tailored for the Kenyan eye care market, from internships to full-time clinical roles.",
        "**Join Clinical Discussions:** Participate in our Case Forum to discuss complex cases and learn from senior practitioners.",
        "**Connect with Your Community:** Network with peers, mentors, and institutions right here in Kenya through our dedicated directory."
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
