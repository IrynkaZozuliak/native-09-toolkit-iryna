import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: "wordsLearning",
  initialState,

  reducers: {
    addWord: (state, action) => {
      const wordExists = state.words.some(
        (word) => word.word === action.payload.word
      );

      if (wordExists) {
        return;
      }

      const now = new Date().getTime();

      state.words.push({
        word: action.payload.word,
        phonetics: action.payload.phonetics,
        audio: action.payload.audio,
        meaning: action.payload.meaning,
        partOfSpeech: action.payload.partOfSpeech,

        dateForgets: now - INITIAL_FORGETTING_SPAN,
        dateTotallyForgets: now,

        forgettingSpan: INITIAL_FORGETTING_SPAN,
        status: 0,
      });
    },

    updateWord: (state, action) => {
      const wordIndex = state.words.findIndex(
        (word) => word.word === action.payload.word
      );

      if (wordIndex !== -1) {
        state.words[wordIndex] = {
          ...state.words[wordIndex],

          word: action.payload.word,
          phonetics: action.payload.phonetics,
          audio: action.payload.audio,
          meaning: action.payload.meaning,
          partOfSpeech: action.payload.partOfSpeech,
        };
      }
    },

    removeWord: (state, action) => {
      state.words = state.words.filter(
        (word) => word.word !== action.payload
      );
    },

    updateWordLearnInfo: (state, action) => {
      const word = state.words.find(
        (word) => word.word === action.payload
      );

      if (!word) {
        return;
      }

      const now = new Date().getTime();

      word.dateForgets = now + word.forgettingSpan;

      word.dateTotallyForgets =
        now + word.forgettingSpan * 2;

      word.forgettingSpan =
        word.forgettingSpan * 2;

      word.status = 2;
    },

    updateStatuses: (state) => {
      const now = new Date().getTime();

      state.words.forEach((word) => {
        if (now >= word.dateTotallyForgets) {
          word.status = 0;
        } else if (now >= word.dateForgets) {
          word.status = 1;
        } else {
          word.status = 2;
        }
      });
    },
  },
});

export const wordsLearningActions =
  wordsLearningSlice.actions;

export default wordsLearningSlice;