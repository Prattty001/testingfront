import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const BudgetModal = ({ isOpen, onClose, onSave, editingItem }) => {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [spent, setSpent] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (editingItem) {
      setCategory(editingItem.category)
      setAmount(editingItem.amount.toString())
      setSpent(editingItem.spent.toString())
      setNotes(editingItem.notes)
    } else {
      setCategory('')
      setAmount('')
      setSpent('0')
      setNotes('')
    }
  }, [editingItem, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      category,
      amount: Number(amount) || 0,
      spent: Number(spent) || 0,
      notes,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm-w-[425px] gradient-card border-0">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Edit Budget Category' : 'Add Budget Category'}
          </DialogTitle>
          <DialogDescription>
            {editingItem
              ? 'Update your budget category details'
              : 'Create a new budget category to track your spending'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Name</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Food & Groceries"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spent">Amount Spent</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              {editingItem ? 'Update' : 'Add'} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
