// word.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const CREATE = "word/CREATE";
const LOAD = "word/LOAD";
const UPDATE = "word/UPDATE";
const DELETE = "word/DELETE";
const LOADED = "word/LOADED";
const CHECK = "word/CHECK";
const CHECKED = "word/CHECKED";

const initialState = {
  is_loaded: false,
  list: [],
};

// Action Crestors
export function loadWord(word_list) {
  return { type: LOAD, word_list };
}

export function createWord(word) {
  return { type: CREATE, word};
}

export function updateWord(update_word) {
  return { type: UPDATE, update_word};
}

export function deleteWord(word_index) {
  return { type:DELETE, word_index };
}

export function isLoaded(loaded){
  return {type: LOADED, loaded};
}

export function check(word_index) {
  return {type:CHECK, word_index};
}

export function checked(word_index) {
  return {type:CHECKED, word_index};
}

// middlesares
export const loadWordFB = () => {
    return async function (dispatch) {
        const word_data = await getDocs(collection(db, "word"));
        // console.log(word_data);

        let word_list = [];
        
        word_data.forEach((b) => {
          word_list.push({id : b.id, ...b.data()})
        });

        dispatch(loadWord(word_list));
    };
};

export const addWordFB = (word) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "word"), word);
    const word_data = { id:docRef.id, ...word };
    console.log(word_data);
    dispatch(createWord(word_data));
  }
}

export const updateWordFB = (word) => {
  return async function (dispatch, getState) {
    // console.log(word.id);
    const docRef = doc(db, "word", word.id);
    await updateDoc(docRef, {word: word.word, mean: word.mean, example: word.example});

    dispatch(updateWord(word));
  }
}

export const deleteWordFB = (word_id) => {
  return async function (dispatch, getState) {
    if (!word_id){
      window.alert("없는 단어입니다!");
      return;
    }
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((w) => {
      return w.id === word_id;
    });

    dispatch(deleteWord(word_index));
  }
}

export const checkFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "word", word_id);
    await updateDoc(docRef, {completed: true});

    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((w) => {
      return w.id === word_id;
    })

    dispatch(check(word_index));
  }
}

export const checkedFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "word", word_id);
    await updateDoc(docRef, {completed: false});

    const _word_list = getState().word.list;
    const word_index = _word_list.findIndex((w) => {
      return w.id === word_id;
    })

    dispatch(checked(word_index));
  }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "word/LOAD": {
      return { list: action.word_list, is_loaded: true };
    }
    case "word/CREATE": {
      const new_word_list = [...state.list, action.word];
      return { ...state, list: new_word_list, is_loaded: true};
    }
    case "word/UPDATE": {
      const new_word_list = state.list.map((l, idx) => {
        if (action.update_word.id === l.id) {
          return { ...action.update_word };
        } else {
          return l;
        }
      })
      return {...state, list: new_word_list };
    }
    case "word/DELETE": {
      const new_word_list = state.list.filter((l, idx) => {
        return parseInt(action.word_index) !== idx;
      })
      return {...state, list: new_word_list};
    }
    case "word/CHECK": {
      const new_word_list = state.list.map((l, idx) => {
        if (parseInt(action.word_index) === idx) {
          return { ...l, completed: true};
        } else {
          return l;
        }
      });
      return {...state, list: new_word_list};
    }
    case "word/CHECKED": {
      const new_word_list = state.list.map((l, idx) => {
        if (parseInt(action.word_index) === idx) {
          return { ...l, completed: false};
        } else {
          return l;
        }
      });
      return {...state, list: new_word_list};
    }
    default:
      return state;
  }
}
