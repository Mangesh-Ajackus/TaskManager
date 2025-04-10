import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Animated,Button, Image, TouchableOpacity } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TaskItemList from "../components/TaskItemList";
import TaskInput from "../components/TaskInput";
import {useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [newAddedTasks, setNewAddedTasks] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [filter, setFilter] = useState("all"); // New state for filter
  const navigation = useNavigation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);

  const appContainer = {
    backgroundColor: isDark ? '#000' : '#d5d6f9',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "top",
    alignItems: "center",
  };

  useEffect(() => {

    // Load tasks from AsyncStorage on app start
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setNewAddedTasks(JSON.parse(storedTasks)); // Parse the tasks if they exist
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

  // Save tasks to AsyncStorage
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
      saveTasks(updatedTasks); // Save updated tasks to AsyncStorage

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
    saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
  };

  const deleteTaskHandler = (id) => {
    const updatedTasks = newAddedTasks.filter((task) => task.id !== id);
    setNewAddedTasks(updatedTasks);
    saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
  };

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
    <View style={appContainer}>
        {/* <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
        /> */}
        {/* <DarkMode /> */}

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
              ? require('../assets/night.png') // Your moon icon
              : require('../assets/day.png')  // Your sun icon
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

  //toggle styling
  toggleContainer: {
    width: 60,
    height: 32,
    borderRadius: 20,
    padding: 0,
    justifyContent: 'center',
  },
  knob: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // Optional shadow
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
