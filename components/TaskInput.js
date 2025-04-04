import { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function TaskInput (props){
    const [enteredTaskText, setEnteredTaskText] = useState("");

    //  To get input value
    function taskInputHandler(enteredValue) {
        setEnteredTaskText(enteredValue);
    }

    function addTaskHandler(){
        props.onAddTask(enteredTaskText);
        setEnteredTaskText(""); // Clear the input field by resetting the enteredTaskText state
    }

    return  (
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a new task"
            onChangeText={taskInputHandler}
            value={enteredTaskText} // Binding the value here to update the input
          />
          <View style={styles.addTaskButton}>
            <Button title="Add Task" onPress={addTaskHandler} color='#fff'/>
          </View>
      </View>
    );

};
export default TaskInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
      textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        padding: 20,
        fontSize: 16
    },
    addTaskButton:{
      backgroundColor: 'skyblue',
      marginVertical: 10,
      color: '#fff',
      borderRadius: 6,
      padding: 4,
      paddingHorizontal: 20
    }
})