import { useState } from "react";
import { StyleSheet, TextInput, View, Button, Image, Animated } from "react-native";

function TaskInput (props){
    const [enteredTaskText, setEnteredTaskText] = useState("");
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

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
        <Image style={styles.topImage} source={require('../assets/images/goal.png')} />
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
      // margin: 20
    },
    inputContainer: {
        // flex: 2,
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
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow position (horizontal, vertical)
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 5, // Shadow blur
        // Android Shadow Properties
        elevation: 5, // Android shadow depth
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