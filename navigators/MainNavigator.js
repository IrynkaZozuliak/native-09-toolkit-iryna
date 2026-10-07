// navigators/MainNavigator.js

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

import WordsNavigation from "./WordsNavigation";
import LearningNavigation from "./LearningNavigation";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const colors = useSelector((state) => state.theme.colors);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: colors.primary900,
          tabBarInactiveTintColor: colors.fontMain,
          tabBarStyle: {
            backgroundColor: colors.appBackground,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen
          name="Words"
          component={WordsNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="list-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Learning"
          component={LearningNavigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="book-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;