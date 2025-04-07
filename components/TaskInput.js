import { useState } from "react";
import { StyleSheet, TextInput, View, Button, Image } from "react-native";

const TaskInput = (props) => {
    const [enteredTaskText, setEnteredTaskText] = useState("");

    //  To get input value
    const taskInputHandler = (enteredValue) => {
        setEnteredTaskText(enteredValue);
    }

    const addTaskHandler = () => {
        props.onAddTask(enteredTaskText);
        setEnteredTaskText(""); // Clear the input field by resetting the enteredTaskText state
    }

    return  (
      <View style={styles.inputContainer}>
        <Image 
          style={styles.topImage} 
          source={require('../assets/images/goal.png')} 
        />
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
    topImage:{
      width: 100,
      height: 100,
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: "100%",
        padding: 20,
        fontSize: 16,
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
    },
    addTaskButton:{
      backgroundColor: '#27a9e1',
      marginVertical: 10,
      color: '#fff',
      borderRadius: 6,
      padding: 4,
      paddingHorizontal: 20
    },
})