import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function App() {
  const [enteredTaskText, setEnteredTaskText] = useState("");
  const [newTask, setNewTask] = useState([]);
  const [newAddedTasks, setNewAddedTasks] = useState([]);

  //  To get input value
  function taskInputHandler(enteredValue) {
    setEnteredTaskText(enteredValue);
    // console.log(enteredValue);
  }

  //  when button clicked
  function addTaskHandler() {
    // Only add the task if the entered value is not empty
    if ((enteredTaskText.trim() !== "") && (enteredTaskText.length >= 3)) {
      setNewAddedTasks((newAddedTasks) => [
        ...newAddedTasks,
        { text: enteredTaskText, id: Math.random().toString() },
      ]);
  
      // Clear the input field by resetting the enteredTaskText state
      setEnteredTaskText("");

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
        position: 'center',
        text1: 'Empty Task!',
        text2: 'Please enter a task with at least 3 characters.',
      });
    }
  }
  

  return (
    //  main container of app
    <View style={styles.appContainer}>

      <View>
        <Text style={styles.appHeading}>Task Manager App</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new task"
          onChangeText={taskInputHandler}
          value={enteredTaskText} // Binding the value here to update the input
        />
        <Button title="Add Task" onPress={addTaskHandler} />
      </View>

      <View style={styles.taskContainer}>
        <Text style={styles.taskContainerHeading}> List of all tasks </Text>

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
            return (
              <Text style={styles.taskContainerListItem}>{itemData.item.text}</Text>
            );
          }}

          keyExtractor={(item, index)=>{
            return item.id;
          }}
        />

      </View>

      {/* Toast component */}
      <Toast />

    </View>
  );
}

const styles = StyleSheet.create({
  appHeading: {
    fontSize: 32,
    color: "purple",
    borderBottomWidth: 1,
    borderBlockColor: "red",
    marginBottom: 50,
  },
  appContainer: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "70%",
    marginRight: 10,
    padding: 20,
  },
  taskContainer: {
    flex: 6,
    width: "100%",
  },
  taskContainerHeading: {
    fontSize: 24,
    marginBottom: 20,
  },
  taskContainerListItem: {
    fontSize: 14,
    textAlign: "left",
    // width: '100',
    backgroundColor: "lightgray",
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#CCC",
    marginBottom: 16,
    borderRadius: 10,
  },
});
