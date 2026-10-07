import { View, StyleSheet, Text, Pressable, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

import { wordsLearningActions } from "../../store/wordsLearningSlice";
import ListItem from "../../components/ListItem";

function AllWords({ navigation }) {
  const dispatch = useDispatch();

  const words = useSelector((state) => state.wordsLearning.words);
  const colors = useSelector((state) => state.theme.colors);

  function onAddWord() {
    navigation.navigate("AddWord");
  }

  function onWordPress(wordData) {
    navigation.navigate("EditWord", { wordData });
  }

  function onDeleteWord(word) {
    dispatch(wordsLearningActions.removeWord(word));
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.appBackground,
      }}
    >
      <Pressable style={styles.addButton} onPress={onAddWord}>
        <Ionicons
          name="add-outline"
          size={32}
          color={colors.primary900}
        />
      </Pressable>

      {words.length === 0 ? (
        <View
          style={{
            ...styles.noWordsOuterContainer,
            backgroundColor: colors.fontInverse,
          }}
        >
          <View style={styles.noWordsInnerContainer}>
            <Text
              style={{
                ...styles.noWordsText,
                color: colors.primary200,
              }}
            >
              No words yet
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={words}
          keyExtractor={(item) => item.word}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() => onWordPress(item)}
              onDelete={() => onDeleteWord(item.word)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addButton: {
    alignSelf: "flex-end",
    margin: 10,
  },

  noWordsOuterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noWordsInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  noWordsText: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AllWords;