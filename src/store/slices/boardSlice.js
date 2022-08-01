import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../../init-firebase";

const STATUSES = {
  succeeded: "succeeded",
  failed: "failed",
  pending: "pending"
};

const initialState = {
  status: null,
  boards: [],
};

export const getBoards = createAsyncThunk(
  "boardSlice/getBoards",
  async (_, { rejectedWithValue }) => {
    try {
      const docSnap = await getDocs(collection(db, "boards"));
      return docSnap.docs.map(doc => ({...doc.data(), id: doc.id}));
    } catch (err){
      rejectedWithValue(err.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  "boardSlice/addBoard",
  async (newBoard, { rejectedWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "boards"), newBoard);
      return {...newBoard, id: docRef.id};
    } catch (err) {
      rejectedWithValue(err.message);
    }
  }
)

const setError = (state, action) => {
  state.status = action.payload;
};

const setPending = (state) => {
  state.status = STATUSES.pending;
};

const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      state.status = STATUSES.succeeded;
      state.boards = action.payload;
    },
    [addBoard.fulfilled]: (state, action) => {
      state.status = STATUSES.succeeded;
      state.boards.push(action.payload);
    },
    [getBoards.pending]: setPending,
    [addBoard.pending]: setPending,
    [getBoards.rejected]: setError,
    [addBoard.rejected]: setError,
  }
})

export default boardSlice.reducer;
