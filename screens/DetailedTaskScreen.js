import { View, Text, StyleSheet} from "react-native";

const DetailedTaskScreen = ({ route }) => {
  // Get the task details passed from HomeScreen
  const { taskDetails } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text style={styles.details}>Title - {taskDetails.text}</Text>
      <Text style={styles.details}>Status -
        <Text style={{ color: taskDetails.completed ? '#0af225' : '#ff110d' }}>
          {taskDetails.completed ? " Completed" : " Pending"}
        </Text>
      </Text>
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
    backgroundColor: "#d5d6f9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 5,
    color: '#fff',
    borderBottomWidth: 2,
    padding: 6,
    width: "100%",
    textAlign:"center"
  },
  details: {
    fontSize: 18,
    marginBottom: 8,
    borderWidth: 2,
    padding: 12,
    marginVertical: 20,
    width: "100%",
    textAlign: "center",
    borderRadius: 8,
    borderColor: '#fff',
    backgroundColor: "#000",
    color: '#fff',
    fontWeight: 'bold',
    shadowColor: "black",
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default DetailedTaskScreen;
