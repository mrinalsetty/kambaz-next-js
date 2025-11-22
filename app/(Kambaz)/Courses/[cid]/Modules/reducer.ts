import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Module } from "../../client";

interface ModulesState {
  modules: Module[];
  moduleDraftName: string;
}
const initialState: ModulesState = { modules: [], moduleDraftName: "" };

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    resetModules: () => initialState,
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    updateModuleLocal: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    setModuleDraftName: (state, action: PayloadAction<string>) => {
      state.moduleDraftName = action.payload;
    },
    resetModuleDraftName: (state) => {
      state.moduleDraftName = "";
    },
  },
});
export const {
  resetModules,
  setModules,
  updateModuleLocal,
  setModuleDraftName,
  resetModuleDraftName,
} = modulesSlice.actions;
export default modulesSlice.reducer;
