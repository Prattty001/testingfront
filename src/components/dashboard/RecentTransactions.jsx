import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

const transactions = [
  {
    id: 1,
    description: "Salary Deposit",
    amount: 3000,
    type: "income",
    date: "2024-01-15",
    category: "Salary",
  },
  {
    id: 2,
    description: "Rent Payment",
    amount: -1200,
    type: "expense",
    date: "2024-01-14",
    category: "Housing",
  },
  {
    id: 3,
    description: "Grocery Shopping",
    amount: -89.5,
    type: "expense",
    date: "2024-01-13",
    category: "Food",
  },
  {
    id: 4,
    description: "Freelance Project",
    amount: 500,
    type: "income",
    date: "2024-01-12",
    category: "Freelance",
  },
  {
    id: 5,
    description: "Utilities Bill",
    amount: -145,
    type: "expense",
    date: "2024-01-11",
    category: "Utilities",
  },
]

export const RecentTransactions = () => {
  return (
    <Card className="shadow-card border-0 gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                  {transaction.type === "income" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
