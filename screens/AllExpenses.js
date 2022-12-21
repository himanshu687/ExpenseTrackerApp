import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesPeriod={"Total"}
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
