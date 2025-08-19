import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingDown, TrendingUp, Target, RefreshCw, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockSuggestions = [
  {
    id: '1',
    title: 'Switch to Annual Subscriptions',
    description: 'Save 20% by switching your monthly Netflix, Spotify, and Adobe subscriptions to annual plans.',
    type: 'save',
    priority: 'high',
    potentialSavings: 50,
    implemented: false,
  },
  {
    id: '2',
    title: 'Optimize Grocery Spending',
    description: 'You\'ve been spending 15% more on groceries than similar households. Consider meal planning and buying generic brands.',
    type: 'reduce',
    priority: 'medium',
    potentialSavings: 75,
    implemented: false,
  },
  {
    id: '3',
    title: 'Emergency Fund Investment',
    description: 'Your emergency fund could earn 4.5% APY in a high-yield savings account instead of 0.1% in checking.',
    type: 'invest',
    priority: 'high',
    potentialSavings: 120,
    implemented: false,
  },
  {
    id: '4',
    title: 'Reduce Dining Out Frequency',
    description: 'You\'re spending 40% of your food budget on restaurants. Try cooking 2 more meals per week at home.',
    type: 'reduce',
    priority: 'medium',
    potentialSavings: 60,
    implemented: false,
  },
  {
    id: '5',
    title: 'Auto-Transfer to Savings',
    description: 'Set up automatic transfers of $200/month to your savings account on payday to build wealth consistently.',
    type: 'optimize',
    priority: 'low',
    potentialSavings: 200,
    implemented: false,
  },
];

const SmartSuggestions = () => {
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getTypeIcon = (type) => {
    switch (type) {
      case 'save': return <TrendingDown className="w-4 h-4" />;
      case 'invest': return <TrendingUp className="w-4 h-4" />;
      case 'reduce': return <Lightbulb className="w-4 h-4" />;
      case 'optimize': return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'save': return 'bg-green-100 text-green-800';
      case 'invest': return 'bg-blue-100 text-blue-800';
      case 'reduce': return 'bg-yellow-100 text-yellow-800';
      case 'optimize': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleImplement = (id) => {
    setSuggestions(suggestions.map(s =>
      s.id === id ? { ...s, implemented: true } : s
    ));
    toast({
      title: "Suggestion Implemented!",
      description: "Great job taking action on your financial goals.",
    });
  };

  const refreshSuggestions = async () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Suggestions Updated",
        description: "Fetched the latest personalized recommendations for you.",
      });
      setLoading(false);
    }, 1000);
  };

  const totalPotentialSavings = suggestions
    .filter(s => !s.implemented)
    .reduce((sum, s) => sum + s.potentialSavings, 0);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Smart Suggestions</h1>
            <p className="text-muted-foreground">AI-powered recommendations to optimize your finances</p>
          </div>
          <Button onClick={refreshSuggestions} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Savings Potential */}
        <Card className="shadow-card border-0 gradient-success">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Potential Monthly Savings
            </CardTitle>
            <CardDescription className="text-white/80">
              Implement these suggestions to save money each month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              ${totalPotentialSavings.toLocaleString()}
            </div>
            <p className="text-white/80 text-sm">
              {suggestions.filter(s => !s.implemented).length} suggestions available
            </p>
          </CardContent>
        </Card>

        {/* Suggestions List */}
        <div className="grid gap-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className={`shadow-card border-0 gradient-card ${suggestion.implemented ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {suggestion.title}
                      {suggestion.implemented && (
                        <CheckCircle className="w-5 h-5 text-success" />
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityVariant(suggestion.priority)}>
                      {suggestion.priority} priority
                    </Badge>
                    {suggestion.potentialSavings > 0 && (
                      <Badge variant="outline" className="text-success border-success">
                        +${suggestion.potentialSavings}/month
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {suggestion.description}
                </p>
                {!suggestion.implemented && (
                  <Button 
                    onClick={() => handleImplement(suggestion.id)}
                    className="gradient-primary"
                    size="sm"
                  >
                    Mark Implemented
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SmartSuggestions;
