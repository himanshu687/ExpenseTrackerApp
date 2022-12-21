import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { GlobalStyles } from "../../utils/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();

  const handleExpenseItemPress = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };

  return (
    <View style={styles.expenseItem}>
      <Pressable
        onPress={handleExpenseItemPress}
        android_ripple={{ color: GlobalStyles.colors.primary800 }}
        style={({ pressed }) => [
          pressed && Platform.OS === "ios" && styles.pressed,
          styles.expenseInnerContainer,
        ]}
      >
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            <FontAwesome5
              name="rupee-sign"
              size={14}
              color={GlobalStyles.colors.primary400}
            />{" "}
            {amount.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    overflow: "hidden",
  },
  expenseInnerContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 90,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
