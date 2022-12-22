import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../utils/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const expenseContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDeleteExpense = () => {
    Alert.alert("DELETE", "Are you sure want to delete the expense?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "default",
        onPress: async () => {
          setIsLoading(true);
          try {
            await deleteExpense(editedExpenseId);
            expenseContext.deleteExpense(editedExpenseId);
            navigation.goBack();
          } catch (error) {
            setError("Could not delete expense - please try again later!");
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const handleCancelPress = () => {
    navigation.goBack();
  };

  const handleConfirm = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData);
        expenseContext.updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancelPress}
        onSubmit={handleConfirm}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultUpdateValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
