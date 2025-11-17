"use client";
import ArrayStateVariable from "./ArrayStateVariables";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariables";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import ReduxExamples from "./ReduxExamples";
import store from "./store";
import { Provider } from "react-redux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import AddRedux from "./ReduxExamples/AddRedux";
import TodoList from "./ReduxExamples/todos/TodoList";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab4">
        <h2>Lab 4</h2>
        <div id="wd-click-event">
          <ClickEvent />
        </div>
        <div id="wd-passing-data-on-event">
          <PassingDataOnEvent />
        </div>
        <div id="wd-passing-functions">
          <PassingFunctions theFunction={sayHello} />
        </div>
        <div id="wd-counter">
          <Counter />
        </div>
        <div id="wd-boolean-state-variables">
          <BooleanStateVariables />
        </div>
        <div id="wd-string-state-variables">
          <StringStateVariables />
        </div>
        <div id="wd-date-state-variables">
          <DateStateVariable />
        </div>
        <div id="wd-object-state-variables">
          <ObjectStateVariable />
        </div>
        <div id="wd-array-state-variables">
          <ArrayStateVariable />
        </div>
        <div id="wd-parent-state-component">
          <ParentStateComponent />
        </div>
        <div id="wd-redux-examples">
          <ReduxExamples />
        </div>
        <div id="wd-counter-redux">
          <CounterRedux />
        </div>
        <div id="wd-add-redux">
          <AddRedux />
        </div>
        <div id="wd-todo-list">
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}
