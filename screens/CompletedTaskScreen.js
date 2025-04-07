import { View, Text, StyleSheet } from "react-native";

const CompletedTaskScreen = ({ route }) => {
  // Get the task details passed from HomeScreen
  const { taskDetails } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text style={styles.details}>Task - {taskDetails.text}</Text>
      <Text style={styles.details}>Completed - {taskDetails.completed ? "Yes" : "No"}</Text>
      <Text style={styles.details}>Created At - {taskDetails.createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#bfe5f2"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  details: {
    fontSize: 18,
    marginBottom: 8,
    borderWidth: 1,
    padding: 12,
    marginVertical: 20,
    width: "100%",
    textAlign: "center",
    borderRadius: 8,
  },
});

export default CompletedTaskScreen;
