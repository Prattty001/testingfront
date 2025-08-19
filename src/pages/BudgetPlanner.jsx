import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { BudgetModal } from "@/components/budget/BudgetModal";

// ✅ Corrected mock data (id, category, amount, spent, notes)
const mockBudgetItems = [
  { id: "1", category: "Housing", amount: 1200, spent: 800, notes: "Monthly rent payment" },
  { id: "2", category: "Food & Groceries", amount: 500, spent: 300, notes: "Weekly grocery shopping" },
  { id: "3", category: "Transportation", amount: 300, spent: 120, notes: "Gas and public transport" },
  { id: "4", category: "Entertainment", amount: 200, spent: 100, notes: "Movies, dining out" },
  { id: "5", category: "Utilities", amount: 250, spent: 180, notes: "Electricity, internet, phone" },
];

const BudgetPlanner = () => {
  const [budgetItems, setBudgetItems] = useState(mockBudgetItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const remaining = totalBudget - totalSpent;

  const getSpentPercentage = (spent, amount) => {
    if (!amount) return 0;
    return Math.round((spent / amount) * 100);
  };

  const getBadgeVariant = (percentage) => {
    if (percentage >= 90) return "destructive";
    if (percentage >= 70) return "default";
    return "secondary";
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Budget Planner</h1>
            <p className="text-muted-foreground">
              Manage your spending categories and track progress
            </p>
          </div>
          <Button onClick={handleAddItem} className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Budget Category
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalBudget.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${totalSpent.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Remaining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  remaining >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                ${remaining.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Items */}
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>
              Track spending across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetItems.map((item) => {
                const percentage = getSpentPercentage(item.spent, item.amount);
                return (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg bg-background/50"
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{item.category}</h3>
                        <Badge variant={getBadgeVariant(percentage)}>
                          {percentage}% used
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${item.spent.toLocaleString()} spent</span>
                        <span>${item.amount.toLocaleString()} budgeted</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            percentage >= 90
                              ? "bg-destructive"
                              : percentage >= 70
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.notes}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(budgetItem) => {
            if (editingItem) {
              setBudgetItems(
                budgetItems.map((item) =>
                  item.id === editingItem.id ? { ...budgetItem, id: item.id } : item
                )
              );
            } else {
              setBudgetItems([
                ...budgetItems,
                { ...budgetItem, id: Date.now().toString() },
              ]);
            }
            setIsModalOpen(false);
          }}
          editingItem={editingItem}
        />
      </div>
    </AppLayout>
  );
};

export default BudgetPlanner;
