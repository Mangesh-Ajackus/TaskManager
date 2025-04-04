import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import TaskItemList from "./components/TaskItemList";
import TaskInput from "./components/TaskInput";

export default function App() {
  
  const [newAddedTasks, setNewAddedTasks] = useState([]);
  const [modalIsVisible, setModalISVisible] = useState(false)
  
  // To open modal
  function startAddTaskHandler(){
    setModalISVisible(true);
  }

  // To close modal
  function endAddTaskHandler(){
    setModalISVisible(false);
  }

  //  when button clicked
  function addTaskHandler(enteredTaskText) {
    // Only add the task if the entered value is not empty
    if (enteredTaskText.trim() === "" || enteredTaskText.length < 3) {
      // Show error toast if the task is empty or too short
      Toast.show({
        type: "error",
        position: "top",
        text1: "Empty Task!",
        text2: "Please enter a task with at least 3 characters.",
      });
    } else {
      setNewAddedTasks((newAddedTasks) => [
        ...newAddedTasks,
        { text: enteredTaskText, id: Math.random().toString(), completed: false },
      ]);
      endAddTaskHandler();

      // Show success toast if task is added
      Toast.show({
        type: "success",
        position: "top",
        text1: "Task Added!",
        text2: "Your task was successfully added to the list.",
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
    
  }

  return (
    //  main container of app
      <View style={styles.appContainer}>

        <View>
          <Text style={styles.appHeading}>Task Manager App</Text>
        </View>

        <Button 
          title="ADD NEW TASK" 
          color="purple"
          onPress={startAddTaskHandler}
          >
        </Button>

        <TaskInput 
        visible={modalIsVisible} 
        onAddTask = {addTaskHandler}
        onCancel = {endAddTaskHandler}
        />

        <View style={styles.taskContainer}>
          

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
          {newAddedTasks.length > 0 && (
            <Text style={styles.taskContainerHeading}> List of all tasks : </Text>
          )}

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
    paddingTop: "20%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  taskContainer: {
    flex: 6,
    width: "100%",
  },
  taskContainerHeading: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'coral',
    padding: 8,
    textAlign: 'center',
    borderRadius: 8,
  },
  
});
