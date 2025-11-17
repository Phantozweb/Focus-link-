
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
      { icon: "quiz", name: "History Quiz" },
    ],
  },
  {
    title: "The Retinoscope Deep Dive",
    description: "Explore the components of a retinoscope and how they work together.",
    interactiveElements: [
      { icon: "3d-model", name: "Interactive 3D Model" },
      { icon: "chatbot", name: "AI Q&A Chatbot" },
    ],
  },
  {
    title: "Setting Up for Success",
    description: "Learn the optimal patient positioning, room illumination, and setup for accurate results.",
    interactiveElements: [
      { icon: "video", name: "Animated Setup Guide" },
      { icon: "checklist", name: "Interactive Checklist" },
    ],
  },
  {
    title: "Mastering Working Distance",
    description: "Understand the impact of working distance and how to correctly calculate your working distance lens.",
    interactiveElements: [
      { icon: "simulation", name: "Working Distance Simulator" },
      { icon: "quiz", name: "Calculation Quiz" },
    ],
  },
  {
    title: "Decoding the Retinoscopy Reflex",
    description: "Learn to confidently identify 'with,' 'against,' and 'neutral' reflex movements.",
    interactiveElements: [
      { icon: "video", name: "Reflex Video Demos" },
      { icon: "quiz", name: "Reflex Identification Quiz" },
    ],
  },
  {
    title: "Core Retinoscopy Techniques",
    description: "Dive into spot, streak, and cylinder retinoscopy with in-depth tutorials.",
    interactiveElements: [
      { icon: "video", name: "Technique Tutorials" },
      { icon: "simulation", name: "AI Role-Playing Simulation" },
    ],
  },
  {
    title: "Understanding the Optical Cross",
    description: "Visualize astigmatism and learn how to plot your findings on an optical cross.",
    interactiveElements: [
      { icon: "video", name: "Animated Explainer" },
      { icon: "tool", name: "Optical Cross Plotting Tool" },
    ],
  },
  {
    title: "Calculating the Final Prescription",
    description: "A step-by-step guide to confidently convert your retinoscopy findings into a final prescription.",
    interactiveElements: [
      { icon: "guide", name: "Step-by-Step Guide" },
      { icon: "tool", name: "Interactive Rx Calculator" },
    ],
  },
  {
    title: "Cross Retinoscopy in 3 Easy Steps",
    description: "A quick-reference guide and video for performing efficient cross retinoscopy.",
    interactiveElements: [
      { icon: "video", name: "Video Tutorial" },
      { icon: "guide", name: "Quick-Reference Guide" },
    ],
  },
  {
    title: "Practice Makes Perfect",
    description: "Apply your skills on an advanced simulator with a variety of patient cases.",
    interactiveElements: [
      { icon: "simulation", name: "Advanced Patient Simulator" },
      { icon: "quiz", name: "Timed Challenges" },
    ],
  },
  {
    title: "Troubleshooting Common Issues",
    description: "Learn to identify and solve common problems like scissor reflex, dim reflexes, and patient fixation issues.",
    interactiveElements: [
      { icon: "chatbot", name: "AI Diagnostic Tool" },
      { icon: "guide", name: "Problem-Solving Guide" },
    ],
  },
  {
    title: "Final Assessment & Certification",
    description: "Test your knowledge and skills to earn your course certification.",
    interactiveElements: [
      { icon: "exam", name: "Comprehensive Final Exam" },
      { icon: "assessment", name: "Simulation-Based Assessment" },
    ],
  },
];
