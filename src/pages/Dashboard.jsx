import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { IncomeExpenseChart } from '@/components/dashboard/IncomeExpenseChart';
import { SavingsProgress } from '@/components/dashboard/SavingsProgress';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your financial overview.
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpenseChart />
          <SavingsProgress />
        </div>

        <RecentTransactions />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
