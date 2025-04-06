import { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TaskItemList from "./components/TaskItemList";
import TaskInput from "./components/TaskInput";
import { StatusBar } from "expo-status-bar";
export default function App() {
  
  const [newAddedTasks, setNewAddedTasks] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0
  const [scaleAnim] = useState(new Animated.Value(0.5)); // Initial scale is 0.5

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
  

  //  when button clicked
  function addTaskHandler(enteredTaskText) {
    // Only add the task if the entered value is not empty
    if ((enteredTaskText.trim() !== "") && (enteredTaskText.length >= 3)) {
      setNewAddedTasks((newAddedTasks) => [
        ...newAddedTasks,
        { text: enteredTaskText, id: Math.random().toString(), completed: false },
      ]);
  
      // Show a success toast
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Task Added!',
        text2: 'Your task was successfully added to the list.',
      });

    } else {
      // Optionally, you can alert the user that the task cannot be empty
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Empty Task!',
        text2: 'Please enter a task with at least 3 characters.',
      });
    }
  }
  
  function toggleTaskCompletion(id) {
    setNewAddedTasks((newAddedTasks) =>
    newAddedTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTaskHandler(id){
    setNewAddedTasks((newAddedTasks)=>{
      return newAddedTasks.filter((task)=> task.id !== id)
    });
    // console.log('one list item deleted');
  }

  return (
    <>
    <StatusBar style="light"/>
    {/* main container of app */}
      <View style={styles.appContainer}>

        <View>
          {/* <Text style={styles.appHeading}>Task Manager App</Text> */}
          <Animated.Text
              style={[
                styles.appHeading,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
              ]}
            >
              Task Manager App
          </Animated.Text>

        </View>

        <TaskInput onAddTask = {addTaskHandler}/>

        <View style={styles.taskContainer}>

          {newAddedTasks.length > 0 && (
            <Text style={styles.taskContainerHeading}> List of all tasks </Text>
          )}

          {/* small list we can use <ScrollView> */}
          {/* <ScrollView alwaysBounceVertical= {true}>
            {newAddedTasks.length > 0 ? (
              newAddedTasks.map((task, index) => (
                <Text style={styles.taskContainerListItem} key={index}>
                  {task}
                </Text>
              ))
            ) : (
              <Text>No tasks added</Text>
            )}
          </ScrollView> */}
          
          {/* long list we must use <FlatList> - it rendered only required data */}
          <FlatList
            data={newAddedTasks}
            //itemData is the temporay variable, we can write anything x,y,z
            renderItem={(itemData) => {
              
              return <TaskItemList 
              text= {itemData.item.text}
              id = {itemData.item.id}
              onDeleteTask={deleteTaskHandler}
              completed={itemData.item.completed}
              onToggleCompletion={toggleTaskCompletion}
              />
            }}

            keyExtractor={(item, index)=>{
              return item.id;
            }}
          />

        </View>

        {/* Toast component */}
        <Toast />

      </View>
      </>
  );
}

const styles = StyleSheet.create({
  appHeading: {
    fontSize: 32,
    color: "#27a9e1",
    // borderWidth: 1,
    // borderBlockColor: "#fff",
    marginBottom: 0,
    fontWeight: 700,
    shadowColor: 'red', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position (horizontal, vertical)
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 3, // Shadow blur
    // Android Shadow Properties
    elevation: 5, // Android shadow depth
  },
  appContainer: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 10,
    justifyContent: "top",
    alignItems: "center", 
    // backgroundColor: '#000'   
  },
  taskContainer: {
    // flex: 2,
    width: "100%",
    marginTop: 40,
    borderRadius: 12,
    maxHeight: '40%',
    // borderWidth: 2
  },
  taskContainerHeading: {
    fontSize: 24,
    marginBottom: 20,
    padding: 10,
    textAlign: "center",
    backgroundColor:'coral',
    borderRadius: 12
  },
});
