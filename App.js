import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailedTaskScreen from "./screens/DetailedTaskScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <StatusBar style="dark"/>

      <NavigationContainer>
        <Stack.Navigator>
          {/* we can change the initial screen by changing the "<Stack.Screen>" order */}

          {/* <Stack.Screen name="Tasks" component= {DetailedTaskScreen} />       initial screen
          <Stack.Screen name="Home" component= {HomeScreen} />  */}


          {/* Alternatively, there also is an initialRouteName prop that can be set on the navigator component (i.e., on <Stack.Navigator> in this case): */}
          {/* <Stack.Navigator initialRouteName="Tasks">
            <Stack.Screen name="Home" component= {HomeScreen} /> 
            <Stack.Screen name="Tasks" component= {DetailedTaskScreen} />     initial screen
          </Stack.Navigator> */}

          {/*initial screen*/}
          <Stack.Screen name="Home" component= {HomeScreen} /> 
          <Stack.Screen name="Tasks" component= {DetailedTaskScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

}

