import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>

      <Link href="/about" style={styles.button}>
        Go to about screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "#fff",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#25292e",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
