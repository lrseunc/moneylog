const groupBudgetService = require('../grp_expenses/group-budget.service');

module.exports = {
  addBudget: async (req, res) => {
    try {
      const groupId = parseInt(req.params.groupId, 10);
      const budget_amount = parseFloat(req.body.budget_amount);

      if (isNaN(groupId)) {
        return res.status(400).json({
          success: 0,
          message: "Group ID is required and must be a valid number"
        });
      }

      if (isNaN(budget_amount)) {
        return res.status(400).json({
          success: 0,
          message: "Budget amount is required and must be a valid number"
        });
      }

      console.log("Adding budget with:", { groupId, budget_amount });

      // Check if a budget already exists for this group
      const existingBudget = await groupBudgetService.checkBudgetExists(groupId);

      if (existingBudget) {
        return res.status(409).json({
          success: 0,
          message: "Budget already set for this group. Try updating it instead."
        });
      }

      // Add the new budget
      const result = await groupBudgetService.addBudget(groupId, budget_amount);

      return res.json({
        success: 1,
        message: "Budget added successfully",
        data: result
      });
    } catch (err) {
      console.error("Error adding budget:", err);
      return res.status(500).json({
        success: 0,
        message: err.message || "Database error"
      });
    }
  },

  updateBudget: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const groupId = parseInt(req.params.groupId, 10);
      const budget_amount = parseFloat(req.body.budget_amount);

      if (isNaN(id) || isNaN(groupId)) {
        return res.status(400).json({
          success: 0,
          message: "Valid ID and Group ID are required"
        });
      }

      if (isNaN(budget_amount)) {
        return res.status(400).json({
          success: 0,
          message: "Budget amount must be a valid number"
        });
      }

      // Check if the budget exists for this group
      const currentBudget = await groupBudgetService.getBudgetByGroupId(groupId);

      if (!currentBudget) {
        return res.status(404).json({
          success: 0,
          message: "Budget not found for this group"
        });
      }

      // Update the budget
      const result = await groupBudgetService.updateBudget(id, groupId, budget_amount);

      return res.json({
        success: 1,
        message: "Budget updated successfully",
        data: result
      });
    } catch (err) {
      console.error("Error updating budget:", err);
      return res.status(500).json({
        success: 0,
        message: err.message || "Database error occurred"
      });
    }
  },

  getBudget: async (req, res) => {
    try {
      const groupId = parseInt(req.params.groupId, 10);

      if (isNaN(groupId)) {
        return res.status(400).json({
          success: 0,
          message: "Invalid group ID"
        });
      }

      const budget = await groupBudgetService.getBudgetByGroupId(groupId);

      return res.json({
        success: 1,
        data: budget || { groupId, budget_amount: 0 }
      });
    } catch (err) {
      console.error("Error fetching group budget:", err);
      return res.status(500).json({
        success: 0,
        message: "Database error"
      });
    }
  },

  getAllBudgets: async (req, res) => {
    try {
      const budgets = await groupBudgetService.getAllBudgets();
      return res.json({
        success: 1,
        data: budgets
      });
    } catch (err) {
      console.error("Error fetching all budgets:", err);
      return res.status(500).json({
        success: 0,
        message: "Database error"
      });
    }
  }
};