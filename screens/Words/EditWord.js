import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { playSound } from "../../services/soundHandler";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { wordsLearningActions } from "../../store/wordsLearningSlice";


function EditWord({ route, navigation }) {
  const [wordData, setWordData] = useState(
    () => route.params.wordData
  );

  const dispatch = useDispatch();

  const colors = useSelector(
    (state) => state.theme.colors
  );


  function onSave() {
    dispatch(
      wordsLearningActions.updateWord({
        word: wordData.word,
        phonetics: wordData.phonetics,
        audio: wordData.audio,
        meaning: wordData.meaning,
        partOfSpeech: wordData.partOfSpeech,
      })
    );

    navigation.navigate("AllWords");
  }


  function onChangeWordData(text, propName) {
    setWordData((prevData) => ({
      ...prevData,
      [propName]: text,
    }));
  }


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.appBackground,
        },
      ]}
    >
      <Image
        style={styles.image}
        source={require("../../assets/edit-koala.png")}
      />

      <View style={styles.receivedInfoContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Text
            style={[
              styles.word,
              {
                color: colors.fontMain,
              },
            ]}
          >
            {wordData.word}
          </Text>

          {wordData.audio && (
            <Pressable
              style={styles.playPressable}
              onPress={() =>
                playSound(wordData.audio)
              }
            >
              <Ionicons
                name="volume-medium-outline"
                size={28}
                color={colors.primary900}
              />
            </Pressable>
          )}
        </View>


        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.grey600,
                },
              ]}
            >
              phonetics:
            </Text>

            <TextInput
              value={wordData.phonetics}
              style={[
                styles.input,
                {
                  borderColor: colors.primary200,
                  color: colors.fontMain,
                },
              ]}
              onChangeText={(text) =>
                onChangeWordData(
                  text,
                  "phonetics"
                )
              }
            />
          </View>


          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.label,
                {
                  color: colors.grey600,
                },
              ]}
            >
              part of speach:
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.primary200,
                  color: colors.fontMain,
                },
              ]}
              value={wordData.partOfSpeech}
              onChangeText={(text) =>
                onChangeWordData(
                  text,
                  "partOfSpeech"
                )
              }
            />
          </View>
        </View>


        <Text
          style={[
            styles.label,
            {
              color: colors.grey600,
            },
          ]}
        >
          meaning:
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.meaningInput,
            {
              borderColor: colors.primary200,
              color: colors.fontMain,
            },
          ]}
          multiline
          numberOfLines={4}
          onChangeText={(text) =>
            onChangeWordData(
              text,
              "meaning"
            )
          }
          value={wordData.meaning}
          textAlignVertical="top"
        />


        {wordData.word && (
          <Pressable
            style={[
              styles.buttonContainer,
              {
                backgroundColor: colors.primary900,
              },
            ]}
            onPress={onSave}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: colors.fontInverse,
                },
              ]}
            >
              Save
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: "40%",
    marginTop: 80,
    marginBottom: 20,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
  },

  meaningInput: {
    minHeight: 100,
  },

  label: {
    fontSize: 12,
    marginBottom: 4,
    paddingTop: 10,
  },

  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  word: {
    fontSize: 32,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },

  buttonText: {
    fontSize: 24,
  },

  playPressable: {
    marginHorizontal: 20,
  },
});


export default EditWord;