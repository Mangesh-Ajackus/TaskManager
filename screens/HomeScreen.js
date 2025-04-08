import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Animated,Button, } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TaskItemList from "../components/TaskItemList";
import TaskInput from "../components/TaskInput";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [newAddedTasks, setNewAddedTasks] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [filter, setFilter] = useState("all"); // New state for filter
  const navigation = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 0.5, duration: 2000, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  const addTaskHandler = (enteredTaskText) => {
    if (enteredTaskText.trim() !== "" && enteredTaskText.length >= 3) {
      setNewAddedTasks((prevTasks) => [
        ...prevTasks,
        { 
          text: enteredTaskText, 
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

  const toggleTaskCompletion = (id) => {
    setNewAddedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const deleteTaskHandler = (id) => {
    setNewAddedTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Filter tasks based on the selected filter type
  const filteredTasks = newAddedTasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }
    return true; // Return all tasks when filter is 'all'
  });

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

      {newAddedTasks.length > 0 && (
        <>
          <Text style={styles.taskContainerHeading}>List of Tasks</Text>
          <View style={styles.listButton}>
            <View style={[styles.filterTasksButton, filter === "all" && styles.viewAllTasksButton,]}>
              <Button title="View All" color='#fff' onPress={() => setFilter("all")} />
            </View>

            <View style={
              [styles.filterTasksButton, filter === "pending" && styles.pendingTasksButton, ]}>
              <Button title="Pending" color='#fff' onPress={() => setFilter("pending")} />
            </View>

            <View style={[styles.filterTasksButton, filter === "completed" && styles.completeTasksButton, ]}>
              <Button title="Completed" color='#fff' onPress={() => setFilter("completed")} />
            </View>
          </View>
        </>
      )}


      <View style={styles.taskContainer}>
        <FlatList
          data={filteredTasks}
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
    marginTop: 20,
    borderRadius: 12,
    maxHeight: "40%",
  },
  taskContainerHeading: {
    fontSize: 24,
    marginTop: 20,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#FB923C",
    borderRadius: 12,
    width:"100%",
    letterSpacing: 2
  },
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 2
  },
  filterTasksButton: {
    backgroundColor: 'gray',
    marginVertical: 10,
    color: '#fff',
    borderRadius: 6,
    padding: 4,
    width: "32%"
  },
  viewAllTasksButton: {
    backgroundColor: '#0EA5E9',
    marginVertical: 10,
    color: '#fff',
    borderRadius: 6,
    padding: 4,
    width: "32%"
  },
  pendingTasksButton: {
    backgroundColor: '#ff110d',
    marginVertical: 10,
    color: '#fff',
    borderRadius: 6,
    padding: 4,
    width: "32%"
  },
  completeTasksButton: {
    backgroundColor: '#09ed1c',
    marginVertical: 10,
    color: '#fff',
    borderRadius: 6,
    padding: 4,
    width: "32%"
  },
});

export default HomeScreen;
