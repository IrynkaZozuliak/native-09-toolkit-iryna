// components/WordCard.js

import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

import { playSound } from "../services/soundHandler";

function WordCard({ wordInfo }) {
  const colors = useSelector((state) => state.theme.colors);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.appBackground,
        },
      ]}
    >
      <View style={styles.wordRow}>
        <Text style={[styles.word, { color: colors.fontMain }]}>
          {wordInfo.word}
        </Text>

        {wordInfo.audio && (
          <Pressable onPress={() => playSound(wordInfo.audio)}>
            <Ionicons
              name="volume-medium-outline"
              size={28}
              color={colors.primary900}
            />
          </Pressable>
        )}
      </View>

      <Text style={[styles.phonetics, { color: colors.fontMain }]}>
        {wordInfo.phonetics}
      </Text>

      <Text style={[styles.partOfSpeech, { color: colors.fontMain }]}>
        {wordInfo.partOfSpeech}
      </Text>

      <Text style={[styles.meaning, { color: colors.fontMain }]}>
        {wordInfo.meaning}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  word: {
    fontSize: 28,
    fontWeight: "bold",
  },
  phonetics: {
    fontSize: 18,
    marginTop: 5,
  },
  partOfSpeech: {
    fontSize: 16,
    marginTop: 15,
  },
  meaning: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default WordCard;