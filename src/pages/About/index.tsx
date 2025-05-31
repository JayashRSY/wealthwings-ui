import { Card } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Empowering Your
            <span className="text-primary"> Financial Journey</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We help you make smarter financial decisions with personalized credit card recommendations and spending analytics.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow border-border dark:bg-card/80 dark:hover:bg-card/90">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">Smart Recommendations</h3>
            <p className="mt-2 text-muted-foreground">
              Get personalized credit card recommendations based on your spending patterns and preferences.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-border dark:bg-card/80 dark:hover:bg-card/90">
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">Advanced Analytics</h3>
            <p className="mt-2 text-muted-foreground">
              Track your spending patterns with detailed analytics and visual insights.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-border dark:bg-card/80 dark:hover:bg-card/90">
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">Real-time Tracking</h3>
            <p className="mt-2 text-muted-foreground">
              Monitor your rewards and cashback in real-time across all your cards.
            </p>
          </Card>
        </div>

        {/* Mission Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16 border border-blue-100 dark:border-blue-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              We believe everyone deserves to maximize their credit card benefits without the complexity. 
              Our platform simplifies credit card management and helps you make the most of your spending.
            </p>
          </div>
        </div>

        {/* Team Section with Modern Cards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: '/team/placeholder.png' },
              { name: 'Michael Chen', role: 'CTO', image: '/team/placeholder.png' },
              { name: 'Emily Rodriguez', role: 'Head of Product', image: '/team/placeholder.png' },
              { name: 'David Kim', role: 'Lead Developer', image: '/team/placeholder.png' },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 text-center hover:shadow-xl transition-all duration-300 border border-transparent dark:border-blue-900/20">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 flex items-center justify-center shadow-md dark:shadow-blue-900/30">
                    <span className="text-2xl font-bold text-white dark:text-white/90">{member.name[0]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-muted rounded-2xl p-8 border border-border dark:border-muted">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
            <a 
              href="mailto:contact@yourapp.com" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary/80 transition-colors"
            >
              Contact Us
              <Mail className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;