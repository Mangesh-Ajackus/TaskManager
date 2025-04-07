import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TaskItemList from "../components/TaskItemList"; // Ensure this path is correct.
import TaskInput from "../components/TaskInput"; // Ensure this path is correct.
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [newAddedTasks, setNewAddedTasks] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0
  const [scaleAnim] = useState(new Animated.Value(0.5)); // Initial scale is 0.5
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.5,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  // Add a new task with Alert Message
  const addTaskHandler = (enteredTaskText) => {
    if (enteredTaskText.trim() !== "" && enteredTaskText.length >= 3) {
      setNewAddedTasks((prevTasks) => [
        ...prevTasks,
        { text: enteredTaskText, 
          id: Math.random().toString(), 
          completed: false, 
          createdAt: new Date().toLocaleString(), 
        },
      ]);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Task Added!",
        text2: "Your task was successfully added to the list.",
      });
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Empty Task!",
        text2: "Please enter a task with at least 3 characters.",
      });
    }
  }

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setNewAddedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Delete a task
  const deleteTaskHandler = (id) => {
    setNewAddedTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.appContainer}>
      <Animated.Text
        style={[
          styles.appHeading,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        Task Manager App
      </Animated.Text>

      <TaskInput onAddTask={addTaskHandler} />

      <View style={styles.taskContainer}>
        {newAddedTasks.length > 0 && (
          <Text style={styles.taskContainerHeading}>List of all tasks</Text>
        )}

        <FlatList
          data={newAddedTasks}
          renderItem={(itemData) => (
            <TaskItemList
              text={itemData.item.text}
              id={itemData.item.id}
              completed={itemData.item.completed}
              createdAt={itemData.item.createdAt}
              onDeleteTask={deleteTaskHandler}
              onToggleCompletion={toggleTaskCompletion}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  appHeading: {
    fontSize: 32,
    color: "#5B21B6",
    marginBottom: 0,
    fontWeight: "700",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#d5d6f9"
  },
  taskContainer: {
    width: "100%",
    marginTop: 40,
    borderRadius: 12,
    maxHeight: "40%",
  },
  taskContainerHeading: {
    fontSize: 24,
    marginBottom: 20,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#FB923C",
    borderRadius: 12,
  },
});

export default HomeScreen;
