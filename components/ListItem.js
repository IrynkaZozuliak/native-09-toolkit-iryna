import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

import { wordsLearningActions } from "../store/wordsLearningSlice";

function ListItem({ item, onDelete }) {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.theme.colors);

  function getStatusIcon(status) {
    if (status === 0) {
      return "battery-dead-sharp";
    }

    if (status === 1) {
      return "battery-half-sharp";
    }

    return "battery-full-sharp";
  }

  function handleDelete() {
    if (onDelete) {
      onDelete();
      return;
    }

    dispatch(wordsLearningActions.removeWord(item.word));
  }

  return (
    <View
      style={{
        ...styles.container,
        borderColor: colors.primary200,
        backgroundColor: colors.appBackground,
      }}
    >
      <Text
        style={{
          ...styles.word,
          color: colors.fontMain,
        }}
      >
        {item.word}
      </Text>

      <Ionicons
        name={getStatusIcon(item.status)}
        size={28}
        color={colors.primary900}
      />

      <Pressable onPress={handleDelete}>
        <Ionicons
          name="trash-outline"
          size={24}
          color={colors.secondary800}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  word: {
    flex: 1,
    fontSize: 22,
  },
});

export default ListItem;