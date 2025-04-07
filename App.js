import {
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CompletedTaskScreen from "./screens/CompletedTaskScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <StatusBar style="dark"/>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component= {HomeScreen} />
          <Stack.Screen name="Tasks" component= {CompletedTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

}

const styles = StyleSheet.create({
  appHeading: {
    fontSize: 32,
    color: "#27a9e1",
    marginBottom: 0,
    fontWeight: 700,
    shadowColor: 'red', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position (horizontal, vertical)
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 3, // Shadow blur
    // Android Shadow Properties
    elevation: 5, // Android shadow depth
  },
  appContainer: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 10,
    justifyContent: "top",
    alignItems: "center",  
  },
  taskContainer: {
    width: "100%",
    marginTop: 40,
    borderRadius: 12,
    maxHeight: '40%',
  },
  taskContainerHeading: {
    fontSize: 24,
    marginBottom: 20,
    padding: 10,
    textAlign: "center",
    backgroundColor:'coral',
    borderRadius: 12
  },
});
