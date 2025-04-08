import { useState, useEffect } from "react";
import {View, Text, Switch, useColorScheme } from "react-native";


export default function DarkMode() {
  const systemTheme = useColorScheme(); // Detects system theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  // Update the theme when the system theme changes
  useEffect(() => {
    setIsDarkMode(systemTheme === 'dark');
  }, [systemTheme]);

  // Toggle dark mode on and off
  const toggleSwitch = () => setIsDarkMode(!isDarkMode);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle = {
    color: isDarkMode ? '#FFF' : '#000',
  };
  
  return (
    <>
      <View style={backgroundStyle}>
        <Text style={textStyle}>Dark Mode is {isDarkMode ? 'On' : 'Off'}</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
        />
      </View>
    </>
  );

}

