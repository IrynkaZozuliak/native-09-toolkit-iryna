import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WordCard from "../../components/WordCard";
import { wordsLearningActions } from "../../store/wordsLearningSlice";

function Play() {
  const dispatch = useDispatch();

  const words = useSelector((state) => state.wordsLearning.words);
  const colors = useSelector((state) => state.theme.colors);

  const wordsToLearn = words.filter((word) => word.status < 2);

  if (wordsToLearn.length === 0) {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.appBackground,
        }}
      >
        <Text style={{ ...styles.congrats, color: colors.fontMain }}>
          Congrats!
        </Text>
      </View>
    );
  }

  const word = wordsToLearn[0];

  function onDidntKnow() {
    dispatch(wordsLearningActions.updateStatuses());
  }

  function onKnewIt() {
    dispatch(wordsLearningActions.updateWordLearnInfo(word.word));
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.appBackground,
      }}
    >
      <WordCard wordInfo={word} />

      <View style={styles.buttons}>
        <Pressable
          style={{
            ...styles.button,
            backgroundColor: colors.primary200,
          }}
          onPress={onDidntKnow}
        >
          <Text style={{ ...styles.buttonText, color: colors.fontMain }}>
            Didn't know it
          </Text>
        </Pressable>

        <Pressable
          style={{
            ...styles.button,
            backgroundColor: colors.primary300,
          }}
          onPress={onKnewIt}
        >
          <Text style={{ ...styles.buttonText, color: colors.fontMain }}>
            Knew it
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  congrats: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  buttons: {
    marginTop: 30,
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Play;