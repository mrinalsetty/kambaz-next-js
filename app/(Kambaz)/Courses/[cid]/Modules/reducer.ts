/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  modules: modules,
  moduleNameDraft: "" as string,
  moduleEditorOpen: false as boolean,
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModuleNameDraft: (state, { payload }: { payload: string }) => {
      state.moduleNameDraft = payload;
    },
    setModuleEditorOpen: (state, { payload }: { payload: boolean }) => {
      state.moduleEditorOpen = payload;
    },
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const {
  setModuleNameDraft,
  setModuleEditorOpen,
  addModule,
  deleteModule,
  updateModule,
  editModule,
} = modulesSlice.actions;
export default modulesSlice.reducer;
