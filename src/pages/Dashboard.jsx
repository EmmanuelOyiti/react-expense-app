// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  exportToCsv,
  fetchData,
  waait,
} from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

// pie chart colors
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28EFF",
  "#FF6C8F",
];

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  const handleExportBudgets = () => {
    if (budgets && budgets.length > 0) {
      exportToCsv(budgets);
    } else {
      toast.warn("No budgets to export");
    }
  };

  // pie chart data from expenses
  const pieData = (expenses || []).reduce((acc, expense) => {
    const name = expense.name;
    const amount = parseFloat(expense.amount);
    if (!acc[name]) {
      acc[name] = 0;
    }
    acc[name] += amount;
    return acc;
  }, {});
  const chartData = Object.entries(pieData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>

                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 6)}
                    />

                    {expenses.length > 6 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "0.5rem",
                        }}
                      >
                        <Link
                          to="expenses"
                          className="btn btn--dark"
                          style={{
                            fontSize: "0.875rem",
                            padding: "0.4rem 0.8rem",
                          }}
                        >
                          View all expenses
                        </Link>
                      </div>
                    )}

                    {/* Export Budgets to CSV button */}
                    <div
                      className="grid-sm"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn btn--dark"
                        onClick={handleExportBudgets}
                      >
                        Export Budgets to CSV
                      </button>
                    </div>
                  </div>
                )}

                {/* Pie Chart and Bar Chart Section */}
                {chartData.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Link to="charts" className="btn btn--dark">
                      View as Charts
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
