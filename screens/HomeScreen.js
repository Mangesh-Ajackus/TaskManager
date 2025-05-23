import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Animated, Image, TouchableOpacity } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TaskItemList from "../components/TaskItemList";
import TaskInput from "../components/TaskInput";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [newAddedTasks, setNewAddedTasks] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [filter, setFilter] = useState("all");
  const navigation = useNavigation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const appContainer = {
    backgroundColor: isDark ? '#000' : '#d5d6f9',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setNewAddedTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks from AsyncStorage', error);
      }
    };

    loadTasks();

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

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage', error);
    }
  };

  const addTaskHandler = (enteredTaskText) => {
    if (enteredTaskText.trim() !== "" && enteredTaskText.length >= 3) {
      const newTask = {
        text: enteredTaskText,
        id: Math.random().toString(),
        completed: false,
        createdAt: new Date().toLocaleString(),
      };

      const updatedTasks = [...newAddedTasks, newTask];
      setNewAddedTasks(updatedTasks);
      saveTasks(updatedTasks);

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
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = newAddedTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setNewAddedTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTaskHandler = (id) => {
    const updatedTasks = newAddedTasks.filter((task) => task.id !== id);
    setNewAddedTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filteredTasks = newAddedTasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <View style={appContainer}>
      <TouchableOpacity
        style={[
          styles.toggleContainer,
          { backgroundColor: isDark ? '#f5f6fa' : '#f5f6fa' },
        ]}
        onPress={toggleTheme}
      >
        <Animated.View
          style={[
            styles.knob,
            {
              alignSelf: isDark ? 'flex-end' : 'flex-start',
              backgroundColor: isDark ? '#29accc' : '#fbc531',
            },
          ]}
        >
          <Image
            source={
              isDark
                ? require('../assets/night.png')
                : require('../assets/day.png')
            }
            style={styles.icon}
          />
        </Animated.View>
      </TouchableOpacity>

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
            <TouchableOpacity
              style={[
                styles.filterTasksButton,
                filter === "all" && styles.viewAllTasksButton,
              ]}
              onPress={() => setFilter("all")}
            >
              <Text style={styles.filterButtonText}>View All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterTasksButton,
                filter === "pending" && styles.pendingTasksButton,
              ]}
              onPress={() => setFilter("pending")}
            >
              <Text style={styles.filterButtonText}>Pending</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterTasksButton,
                filter === "completed" && styles.completeTasksButton,
              ]}
              onPress={() => setFilter("completed")}
            >
              <Text style={styles.filterButtonText}>Completed</Text>
            </TouchableOpacity>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  taskContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    borderRadius: 12,
  },
  taskContainerHeading: {
    fontSize: 24,
    marginTop: 20,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#FB923C",
    borderRadius: 12,
    width: "100%",
    letterSpacing: 2,
    color: "#fff",
    fontWeight: "600",
  },
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 2,
  },
  filterTasksButton: {
    backgroundColor: 'gray',
    marginVertical: 10,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    width: "32%",
    alignItems: 'center',
  },
  viewAllTasksButton: {
    backgroundColor: '#0EA5E9',
  },
  pendingTasksButton: {
    backgroundColor: '#ff110d',
  },
  completeTasksButton: {
    backgroundColor: '#09ed1c',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  toggleContainer: {
    width: 60,
    height: 32,
    borderRadius: 20,
    justifyContent: 'center',
  },
  knob: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
