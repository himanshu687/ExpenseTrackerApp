import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../utils/styles";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} color="#ffffff" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
