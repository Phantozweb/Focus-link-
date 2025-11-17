
export type CourseModule = {
  title: string;
  description: string;
  interactiveElements: {
    icon: string;
    name: string;
  }[];
};

export const retinoscopyModules: CourseModule[] = [
  {
    title: "Introduction to Retinoscopy",
    description: "Understand what retinoscopy is and why it's a crucial skill for every eye care practitioner.",
    interactiveElements: [
      { icon: "video", name: "AI-Narrated Video" },
      { icon: "list-checks", name: "History Quiz" },
    ],
  },
  {
    title: "The Retinoscope Deep Dive",
    description: "Explore the components of a retinoscope and how they work together.",
    interactiveElements: [
      { icon: "orbit", name: "Interactive 3D Model" },
      { icon: "bot", name: "AI Q&A Chatbot" },
    ],
  },
  {
    title: "Setting Up for Success",
    description: "Learn the optimal patient positioning, room illumination, and setup for accurate results.",
    interactiveElements: [
      { icon: "video", name: "Animated Setup Guide" },
      { icon: "list-checks", name: "Interactive Checklist" },
    ],
  },
  {
    title: "Mastering Working Distance",
    description: "Understand the impact of working distance and how to correctly calculate your working distance lens.",
    interactiveElements: [
      { icon: "dna", name: "Working Distance Simulator" },
      { icon: "list-checks", name: "Calculation Quiz" },
    ],
  },
  {
    title: "Decoding the Retinoscopy Reflex",
    description: "Learn to confidently identify 'with,' 'against,' and 'neutral' reflex movements.",
    interactiveElements: [
      { icon: "video", name: "Reflex Video Demos" },
      { icon: "list-checks", name: "Reflex Identification Quiz" },
    ],
  },
  {
    title: "Core Retinoscopy Techniques",
    description: "Dive into spot, streak, and cylinder retinoscopy with in-depth tutorials.",
    interactiveElements: [
      { icon: "video", name: "Technique Tutorials" },
      { icon: "dna", name: "AI Role-Playing Simulation" },
    ],
  },
  {
    title: "Understanding the Optical Cross",
    description: "Visualize astigmatism and learn how to plot your findings on an optical cross.",
    interactiveElements: [
      { icon: "video", name: "Animated Explainer" },
      { icon: "puzzle", name: "Optical Cross Plotting Tool" },
    ],
  },
  {
    title: "Calculating the Final Prescription",
    description: "A step-by-step guide to confidently convert your retinoscopy findings into a final prescription.",
    interactiveElements: [
      { icon: "file-text", name: "Step-by-Step Guide" },
      { icon: "puzzle", name: "Interactive Rx Calculator" },
    ],
  },
  {
    title: "Cross Retinoscopy in 3 Easy Steps",
    description: "A quick-reference guide and video for performing efficient cross retinoscopy.",
    interactiveElements: [
      { icon: "video", name: "Video Tutorial" },
      { icon: "file-text", name: "Quick-Reference Guide" },
    ],
  },
  {
    title: "Practice Makes Perfect",
    description: "Apply your skills on an advanced simulator with a variety of patient cases.",
    interactiveElements: [
      { icon: "dna", name: "Advanced Patient Simulator" },
      { icon: "list-checks", name: "Timed Challenges" },
    ],
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Learn to identify and solve common problems like scissor reflex, dim reflexes, and patient fixation issues.",
    interactiveElements: [
      { icon: "bot", name: "AI Diagnostic Tool" },
      { icon: "file-text", name: "Problem-Solving Guide" },
    ],
  },
  {
    title: "Final Assessment & Certification",
    description: "Test your knowledge and skills to earn your course certification.",
    interactiveElements: [
      { icon: "trophy", name: "Comprehensive Final Exam" },
      { icon: "check-circle", name: "Simulation-Based Assessment" },
    ],
  },
];
