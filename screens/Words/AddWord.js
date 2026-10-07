import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getWordInfo } from "../../services/wordsHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../../services/soundHandler";
import { wordsLearningActions } from "../../store/wordsLearningSlice";
import { COLORS_DARK } from "../../constants";

function AddWord({ navigation }) {
  const [text, setText] = useState();
  const [wordData, setWordData] = useState();

  const dispatch = useDispatch();

  function onChangeText(text) {
    setWordData(undefined);
    setText(text);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (text) {
        const wordDataReceived = await getWordInfo(text);
        setWordData(wordDataReceived);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  useEffect(() => {
    navigation.setOptions({
      title: wordData?.word
        ? `Adding word "${wordData.word}"`
        : "Adding word",
    });
  }, [navigation, wordData]);

  function onAdd() {
    if (!wordData?.word) {
      return;
    }

    dispatch(
      wordsLearningActions.addWord({
        word: wordData.word,
        phonetics: wordData.phonetics,
        audio: wordData.audio,
        meaning: wordData.meaning,
        partOfSpeech: wordData.partOfSpeech,
      })
    );

    navigation.navigate("AllWords");
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/add-koala.png")}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your word to search:</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="type here.."
          placeholderTextColor={COLORS_DARK.grey600}
        />
      </View>

      {wordData && (
        <View style={styles.receivedInfoContainer}>
          <View style={styles.wordRow}>
            <Text style={styles.word}>{wordData.word}</Text>

            {wordData.audio && (
              <Pressable
                style={styles.playPressable}
                onPress={() => playSound(wordData.audio)}
              >
                <Ionicons
                  name="volume-medium-outline"
                  size={28}
                  color={COLORS_DARK.primary900}
                />
              </Pressable>
            )}

            <Text style={styles.phonetics}>
              {wordData.phonetics}
            </Text>
          </View>

          <Text style={styles.partOfSpeech}>
            {wordData.partOfSpeech}
          </Text>

          <Text style={styles.meaning}>
            {wordData.meaning}
          </Text>

          {wordData.word && (
            <Pressable
              style={styles.buttonContainer}
              onPress={onAdd}
            >
              <Text style={styles.buttonText}>Add</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_DARK.appBackground,
  },

  image: {
    marginTop: 80,
    marginBottom: 20,
    width: "40%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },

  inputContainer: {
    marginHorizontal: 12,
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    color: COLORS_DARK.grey600,
  },

  input: {
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: COLORS_DARK.primary200,
    color: COLORS_DARK.fontMain,
  },

  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  wordRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  word: {
    fontSize: 32,
    paddingHorizontal: 10,
    color: COLORS_DARK.fontMain,
  },

  phonetics: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: COLORS_DARK.fontMain,
  },

  partOfSpeech: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: COLORS_DARK.fontMain,
  },

  meaning: {
    fontSize: 16,
    padding: 13,
    color: COLORS_DARK.fontMain,
  },

  buttonContainer: {
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS_DARK.primary900,
  },

  buttonText: {
    fontSize: 24,
    color: COLORS_DARK.fontInverse,
  },

  playPressable: {
    marginHorizontal: 20,
  },
});

export default AddWord;