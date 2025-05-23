import { useState, useRef } from "react";
import { StyleSheet,Text, TextInput, View, Image, PanResponder, Animated, TouchableOpacity } from "react-native";

const TaskInput = (props) => {
    const [enteredTaskText, setEnteredTaskText] = useState("");
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,// make false to stop animation
        onPanResponderMove: Animated.event(
          [null, { dx: pan.x, dy: pan.y }],
          { useNativeDriver: false } // Add this to specify options
        ),
        onPanResponderRelease: () => {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }).start();
        },
      }),
    ).current;

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
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <Image 
            style={styles.topImage} 
            source={require('../assets/images/TMA.png')} 
          />
        </Animated.View>
          <TextInput
            style={styles.textInput}
            placeholder="Add a new task"
            onChangeText={taskInputHandler}
            value={enteredTaskText} // Binding the value here to update the input
          />
          {/* <View style={styles.addTaskButton}>
            <Button title="Add Task" onPress={addTaskHandler} color='#fff'/>
          </View> */}
          <TouchableOpacity style={styles.addTaskButton} onPress={addTaskHandler}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
      </View>
    );

};
export default TaskInput;

const styles = StyleSheet.create({
    topImage:{
      width: 120,
      height: 120,
      margin: 8
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
        backgroundColor: '#E5E7EB',
        borderRadius: 8,
    },
    addTaskButton: {
      backgroundColor: '#0EA5E9',
      marginVertical: 10,
      borderRadius: 6,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    }    
})