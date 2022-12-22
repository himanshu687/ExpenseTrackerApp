import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallbackText="No expenses registered for last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
