// navigators/WordsNavigation.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import AllWords from "../screens/Words/AllWords";
import AddWord from "../screens/Words/AddWord";
import EditWord from "../screens/Words/EditWord";

const Stack = createNativeStackNavigator();

function WordsNavigation() {
  const colors = useSelector((state) => state.theme.colors);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.appBackground,
        },
        headerTintColor: colors.primary900,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="AllWords"
        component={AllWords}
        options={{ title: "All words" }}
      />

      <Stack.Screen
        name="AddWord"
        component={AddWord}
        options={{ title: "Adding word" }}
      />

      <Stack.Screen
        name="EditWord"
        component={EditWord}
        options={({ route }) => ({
          title: route.params?.wordData?.word
            ? `Editing word "${route.params.wordData.word}"`
            : "Editing word",
        })}
      />
    </Stack.Navigator>
  );
}

export default WordsNavigation;