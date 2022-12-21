import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../utils/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  const content = (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{fallbackText}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length === 0 ? content : <ExpensesList expenses={expenses} />}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
