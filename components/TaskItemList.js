import { Pressable, StyleSheet, Text, Switch, View, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

function TaskItemList(props) {
  // Toggle handler
  const toggleSwitch = () => {
    props.onToggleCompletion(props.id); // Toggle completion on task
  };

// Delete handler with confirmation
const handleDelete = () => {
  Alert.alert(
    "Delete Task", // Title of the popup
    "Are you sure you want to delete this task?", // Message
    [
      {
        text: "Cancel", // Cancel button
        style: "cancel",
      },
      {
        text: "Delete", // Delete button
        style: "destructive",
        onPress: () => props.onDeleteTask(props.id), // Delete task
      },
    ],
    { cancelable: true }
  );
};

  return (
    <Pressable
      // onLongPress={() => props.onDeleteTask(props.id)} // Delete on long press
      // onLongPress={handleDelete}
      // onPress={() => props.onToggleCompletion(props.id)} // Toggle completion on press- list toggle
    >
      <View style={styles.toggleList}>
      <Icon name="trash" size={30} color="red" onPress={handleDelete}/>
        <Text
          style={[
            styles.taskContainerListItem,
            props.completed && styles.completedTaskText, // Apply strike-through if completed
          ]}
        >
          {props.text}
        </Text>
        {/* Toggle switch for completion */}
        <Switch
          value={props.completed}
          onValueChange={toggleSwitch}
          trackColor={{ true: "#81b0ff", false: "#767577" }}
          thumbColor={props.completed ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </Pressable>
    
  );
}

export default TaskItemList;

const styles = StyleSheet.create({
  taskContainerListItem: {
    fontSize: 16,
    flexWrap: 'wrap',
    maxWidth: '80%'
  },
  completedTaskText: {
    textDecorationLine: "line-through", 
    textDecorationColor: 'red',
  },
  toggleList:{
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10,
    zIndex: 2,
    backgroundColor: "#e7c8d9",
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  }
});
