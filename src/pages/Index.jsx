import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, BarChart3, Lightbulb, Users, Building, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-glow">
                <CreditCard className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
                AutoSplit
              </h1>
              <h2 className="text-2xl font-semibold text-foreground">
                Smart Income Planner & Budget Tool
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take control of your finances with AI-powered insights, automated budgeting, and team collaboration features.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-primary-foreground hover-glow transition-all duration-300 px-8 py-3">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8 py-3">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything you need to manage your finances</h2>
          <p className="text-muted-foreground text-lg">
            Powerful features designed to make financial planning simple and effective
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Card className="shadow-card border-0 gradient-card animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Smart Dashboard</CardTitle>
              <CardDescription>
                Get a complete overview of your financial health with interactive charts and real-time insights.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 2 */}
          <Card className="shadow-card border-0 gradient-card animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <div className="w-12 h-12 gradient-success rounded-lg flex items-center justify-center mb-2">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <CardTitle>AI-Powered Suggestions</CardTitle>
              <CardDescription>
                Receive personalized recommendations to optimize your spending and increase your savings.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 3 */}
          <Card className="shadow-card border-0 gradient-card animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Share budgets and financial goals with family members or business partners securely.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 4 */}
          <Card className="shadow-card border-0 gradient-card animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <div className="w-12 h-12 gradient-success rounded-lg flex items-center justify-center mb-2">
                <Building className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Bank Integration</CardTitle>
              <CardDescription>
                Connect your bank accounts securely and track all transactions in one place.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 5 */}
          <Card className="shadow-card border-0 gradient-card animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Budget Planning</CardTitle>
              <CardDescription>
                Create detailed budgets, track spending categories, and stay on top of your financial goals.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature 6 */}
          <Card className="shadow-card border-0 gradient-card animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <div className="w-12 h-12 gradient-success rounded-lg flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Automated Insights</CardTitle>
              <CardDescription>
                Set up automatic savings transfers and get notifications about important financial events.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-primary">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to take control of your finances?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Join thousands of users who have already transformed their financial planning with AutoSplit.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="px-8 py-3 bg-white text-primary hover:bg-white/90">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
