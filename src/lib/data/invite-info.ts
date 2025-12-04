
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
  'india': {
    welcomeMessage: "Namaste! I'm delighted to welcome you to the Focus Links community for India. We are building a powerful network to connect every eye care student and professional across the country. By joining, you'll gain access to nationwide opportunities and a platform to showcase your talent.",
    contactInfo: "If you have questions about getting started or want to collaborate on initiatives in India, please feel free to reach out to me.",
    regionBenefits: [
        "**Nationwide Directory:** Create your professional profile and connect with peers, mentors, and leading institutions from all over India.",
        "**Career Opportunities:** Explore our job board for internships and positions at top hospitals and companies across the country.",
        "**Collaborate & Learn:** Join the Case Forum to discuss clinical challenges with experts and participate in India-specific events and competitions.",
        "**Gain Recognition:** Showcase your skills and achievements on a platform designed to highlight emerging talent in Indian optometry."
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
