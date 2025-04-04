import { useState } from "react";
import { StyleSheet, TextInput, View, Button, Modal } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function TaskInput (props){
    const [enteredTaskText, setEnteredTaskText] = useState("");

    //  To get input value
    function taskInputHandler(enteredValue) {
        setEnteredTaskText(enteredValue);
    }

    function addTaskHandler(){
      if (enteredTaskText.trim() === "" || enteredTaskText.length < 3) {
        // Show error toast if the task is empty or too short
        Toast.show({
          type: "error",
          position: "top",
          text1: "Empty Task!",
          text2: "Please enter a task with at least 3 characters.",
        });
      } 
      else {
        // Show success toast if task is added
        Toast.show({
          type: "success",
          position: "top",
          text1: "Task Added!",
          text2: "Your task was successfully added to the list.",
        });
      }
        props.onAddTask(enteredTaskText);
        setEnteredTaskText(""); // Clear the input field by resetting the enteredTaskText state
    }

    return  (
      <Modal visible={props.visible} animationType= 'slide'>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a new task"
            onChangeText={taskInputHandler}
            value={enteredTaskText} // Binding the value here to update the input
          />
          <View style={styles.buttonContainer}>

            <View style={styles.addTaskBtn}>
              <Button title="Add Task" onPress={addTaskHandler} />
            </View>

            <View style={styles.cancelBtn}>
              <Button title="Cancel" onPress={props.onCancel}/>
            </View>

          </View>
        </View>

        <Toast/>
      </Modal>
    );

};
export default TaskInput;

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      // flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      // borderBottomWidth: 1,
      // borderBottomColor: "blue",
    },
    textInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      width: "90%",
      // marginRight: 10,
      padding: 20,
    },
    buttonContainer:{
      flexDirection: "row",
      gap: 20,
      marginTop: 20,
    },
    addTaskBtn: {
      backgroundColor: 'skyblue',
      borderRadius: 10,
    },
    cancelBtn: {
      backgroundColor: 'skyblue',
      borderRadius: 10,
    },
})