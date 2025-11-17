import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Module } from "../../client";

interface ModulesState {
  modules: Module[];
}
const initialState: ModulesState = { modules: [] };

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    updateModuleLocal: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
  },
});
export const { setModules, updateModuleLocal } = modulesSlice.actions;
export default modulesSlice.reducer;
