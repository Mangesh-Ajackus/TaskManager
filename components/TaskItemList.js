import { Pressable, StyleSheet, Text, Switch, View, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const TaskItemList = (props) => {
  // Toggle handler
  const toggleSwitch = () => {
    props.onToggleCompletion(props.id); // Toggle completion on task
  };

  // Delete task from list with confirmation pop-up
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

  const navigation = useNavigation();

  const detailedTask = () => {
    navigation.navigate('Tasks', {
      taskDetails: {
        text: props.text,
        completed: props.completed,
        createdAt: props.createdAt,
      },
    });
  };

  return (
    <Pressable
      onPress={detailedTask}
    >
      <View style={styles.toggleList}>
      <Icon name="trash" size={30} color="#EF4444" onPress={handleDelete}/>
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
          trackColor={{ true: "#D1D5DB", false: "#767577" }}
          thumbColor={props.completed ? "#0EA5E9" : "#f4f3f4"}
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
    backgroundColor: "#C7A8F4",
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "purple",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  }
});
