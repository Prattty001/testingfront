import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, PiggyBank, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Total Income',
    value: '$8,450.00',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
    gradient: 'gradient-success',
  },
  {
    title: 'Total Expenses',
    value: '$5,320.00',
    change: '-3.2%',
    changeType: 'decrease',
    icon: PiggyBank,
    gradient: 'gradient-primary',
  },
  {
    title: 'Total Savings',
    value: '$3,130.00',
    change: '+8.7%',
    changeType: 'increase',
    icon: PiggyBank,
    gradient: 'gradient-success',
  },
  {
    title: 'Budget Left',
    value: '$1,680.00',
    change: '68% of budget',
    changeType: 'neutral',
    icon: DollarSign,
    gradient: 'gradient-primary',
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="shadow-card border-0 gradient-card animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.gradient}`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div
              className={`text-sm flex items-center gap-1 ${
                stat.changeType === 'increase'
                  ? 'text-success'
                  : stat.changeType === 'decrease'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {stat.changeType === 'increase' && <TrendingUp className="w-3 h-3" />}
              {stat.changeType === 'decrease' && <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
