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
        <Button title="Add Task" onPress={addTaskHandler} />
      </View>
    );

};
export default TaskInput;

const styles = StyleSheet.create({
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
})