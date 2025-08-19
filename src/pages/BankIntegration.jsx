import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Trash2,
} from "lucide-react";

const mockBankAccounts = [
  {
    id: "1",
    bankName: "Chase Bank",
    accountType: "checking",
    accountNumber: "****1234",
    balance: 2500.5,
    isConnected: true,
  },
  {
    id: "2",
    bankName: "Wells Fargo",
    accountType: "savings",
    accountNumber: "****5678",
    balance: 8000.0,
    isConnected: true,
  },
  {
    id: "3",
    bankName: "Capital One",
    accountType: "credit",
    accountNumber: "****9876",
    balance: -850.25,
    isConnected: true,
  },
];

const mockTransactions = [
  {
    id: "1",
    accountId: "1",
    date: "2024-01-15",
    description: "Direct Deposit - Salary",
    amount: 3500,
    type: "income",
    category: "Salary",
  },
  {
    id: "2",
    accountId: "1",
    date: "2024-01-14",
    description: "Rent Payment",
    amount: -1200,
    type: "expense",
    category: "Housing",
  },
  {
    id: "3",
    accountId: "1",
    date: "2024-01-13",
    description: "Grocery Store",
    amount: -89.5,
    type: "expense",
    category: "Food",
  },
  {
    id: "4",
    accountId: "2",
    date: "2024-01-12",
    description: "Interest Payment",
    amount: 50,
    type: "income",
    category: "Interest",
  },
  {
    id: "5",
    accountId: "1",
    date: "2024-01-11",
    description: "Electric Bill",
    amount: -145,
    type: "expense",
    category: "Utilities",
  },
];

const BankIntegration = () => {
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts);
  const [transactions] = useState(mockTransactions);

  const getAccountIcon = (type) => {
    switch (type) {
      case "checking":
        return <Building className="w-5 h-5" />;
      case "savings":
        return <CreditCard className="w-5 h-5" />;
      case "credit":
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case "checking":
        return "bg-primary text-primary-foreground";
      case "savings":
        return "bg-success text-success-foreground";
      case "credit":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleDisconnectAccount = (accountId) => {
    setBankAccounts(
      bankAccounts.map((account) =>
        account.id === accountId
          ? { ...account, isConnected: false }
          : account
      )
    );
  };

  const totalBalance = bankAccounts
    .filter((account) => account.isConnected && account.accountType !== "credit")
    .reduce((sum, account) => sum + account.balance, 0);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Bank Integration</h1>
            <p className="text-muted-foreground">
              Connect and manage your bank accounts securely
            </p>
          </div>
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Connect Account
          </Button>
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalBalance)}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Connected Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {bankAccounts.filter((a) => a.isConnected).length}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">2m ago</div>
            </CardContent>
          </Card>
        </div>

        {/* Bank Accounts */}
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your linked bank accounts and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-background/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${getAccountTypeColor(
                        account.accountType
                      )}`}
                    >
                      {getAccountIcon(account.accountType)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{account.bankName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {account.accountType.charAt(0).toUpperCase() +
                          account.accountType.slice(1)}{" "}
                        • {account.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div
                        className={`font-semibold ${
                          account.balance >= 0
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {formatCurrency(account.balance)}
                      </div>
                      <Badge
                        variant={account.isConnected ? "default" : "secondary"}
                      >
                        {account.isConnected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                    {account.isConnected && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisconnectAccount(account.id)}
                        className="text-destructive hover-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Recent transactions from your connected accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => {
                const account = bankAccounts.find(
                  (a) => a.id === transaction.accountId
                );
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "income"
                            ? "bg-success/10"
                            : "bg-destructive/10"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {account?.bankName} •{" "}
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span
                        className={`font-semibold ${
                          transaction.type === "income"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BankIntegration;
