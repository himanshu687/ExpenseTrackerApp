import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../utils/styles";

const IconButton = ({ icon, color, size, onPress }) => {
  return (
    <View style={styles.button}>
      <Pressable
        android_ripple={{ color: GlobalStyles.colors.primary800 }}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.buttonContainer}>
          <Ionicons name={icon} color={color} size={size} />
        </View>
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    overflow: "hidden",
  },
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    overflow: "hidden",
    marginVertical: 4,
  },
  pressed: {
    opacity: 0.75,
  },
});
