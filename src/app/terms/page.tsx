
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Community Guidelines | Focus Links',
  description: 'Read the Terms of Service and Community Guidelines for using the Focus Links platform. Learn about profile submissions, content ownership, and our rules for fostering a respectful and growing community.',
};

export default function TermsPage() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-6">Terms of Service & Community Guidelines</h1>
          
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="text-sm text-gray-500 mb-8">Last Updated: October 26, 2024</p>
            
            <p>Welcome to Focus Links! We are a growing community dedicated to uniting the global eye care industry, from students to seasoned professionals. These Terms of Service and Community Guidelines ("Terms") govern your use of our website and services ("Service"). By joining us, you become part of a movement to connect, share, and grow together.</p>
            
            <p>Please read these carefully before using our Service.</p>

            <h2 className="text-3xl font-bold text-slate-800 mt-12 mb-4">Terms of Service</h2>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Acceptance of Terms</h3>
            <p>By accessing or using the Service, you agree to be bound by these Terms. The Service is intended for eye care professionals, students, and related organizations. If you disagree with any part of the terms, then you may not access the Service.</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Profile Submissions & Membership</h3>
            <p>To be listed in our directory and become a member, you must submit information through our membership application form. You agree to provide information that is accurate, complete, and current. Submitting false, misleading, or incomplete information is a breach of these Terms and may result in your profile being rejected, removed, or your membership being revoked.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Profile Information and Content</h3>
            <p>You are responsible for the information you submit for your profile ("Profile Content"). By submitting your information, you grant us a worldwide, non-exclusive, royalty-free license to display this content on the Service. We reserve the right to review, format, and, if necessary, remove or edit any profile that violates our guidelines or is deemed inappropriate for our community.</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Intellectual Property</h3>
            <p>The Service and its original content (excluding user-submitted Profile Content), features, and functionality are and will remain the exclusive property of Focus Links and its licensors. You retain ownership of your Profile Content.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Disclaimer and Limitation of Liability</h3>
            <p>Focus Links is a professional directory and community platform. While we encourage authenticity and may award a "Verified" status to profiles we believe are genuine, we do not formally verify the credentials or qualifications of all listed individuals or organizations. You are responsible for your own interactions and due diligence. We are not liable for any damages or disputes that may arise between users.</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Termination</h3>
            <p>We may remove your profile and terminate or suspend your access to the Service immediately, without prior notice, for any reason, including a breach of these Terms or the Community Guidelines.</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. Governing Law & International Use</h3>
            <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our Service is accessible globally. If you access the Service from outside India, you are responsible for compliance with your local laws.</p>
            
            <hr className="my-12" />

            <h2 className="text-3xl font-bold text-slate-800 mt-12 mb-4">Community Rules & Regulations</h2>
            <p>Our mission is to create a supportive, professional, and collaborative space. To ensure our community remains a trusted resource for everyone, we require all members to adhere to the following guidelines:</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Be Respectful and Constructive</h3>
            <p>Treat all members with respect, even when you disagree. We encourage healthy debates and discussions, but personal attacks, harassment, bullying, and hate speech will not be tolerated. Provide constructive feedback and contribute positively to conversations.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Share with Integrity</h3>
            <p>This is a community for professionals and aspiring professionals. Do not share misinformation, unverified claims, or copyrighted material without permission. When sharing clinical cases or information, ensure you have patient consent and have anonymized all patient-identifying data.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Maintain Professionalism</h3>
            <p>While we aim to be a friendly and welcoming community, all interactions should remain professional. Do not post content that is obscene, vulgar, or otherwise inappropriate for a professional setting.</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. No Spam or Excessive Self-Promotion</h3>
            <p>This community is for connection and learning, not for unsolicited advertising. You may share information about your work, services, or products when it is relevant to a discussion, but do not spam the forum or other members with promotional material. Your profile is the best place for self-promotion.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Respect Privacy</h3>
            <p>Do not share private or confidential information about other members without their explicit consent. This includes contact details, private messages, or any other non-public information.</p>
            
            <p className="mt-8">By participating in the Focus Links community, you agree to uphold these rules. Violations may result in content removal, a warning, or permanent suspension from the platform. Together, we can build the most trusted and valuable community in eye care.</p>
            

            <hr className="my-12" />

            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Changes to These Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide notice of material changes. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@focuslink.com" className="text-primary hover:underline">support@focuslink.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
