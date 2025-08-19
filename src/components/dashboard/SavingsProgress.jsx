import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp } from 'lucide-react';

const savingsGoals = [
  {
    title: 'Emergency Fund',
    current: 3000,
    target: 10000,
    color: 'bg-success',
  },
  {
    title: 'Vacation Fund',
    current: 1500,
    target: 5000,
    color: 'bg-primary',
  },
  {
    title: 'New Car',
    current: 8000,
    target: 20000,
    color: 'bg-accent',
  },
];

export const SavingsProgress = () => {
  const totalProgress =
    savingsGoals.reduce((acc, goal) => acc + (goal.current / goal.target) * 100, 0) /
    savingsGoals.length;

  return (
    <Card className="shadow-card border-0 gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Savings Goals
        </CardTitle>
        <CardDescription>
          Track your progress towards financial milestones
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-success">
            {Math.round(totalProgress)}%
          </div>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
        </div>

        {/* Individual Goals */}
        <div className="space-y-4">
          {savingsGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.title} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-muted-foreground">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progress)}% complete</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ${(goal.target - goal.current).toLocaleString()} to go
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
