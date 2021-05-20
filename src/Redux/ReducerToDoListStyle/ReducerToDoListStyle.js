import { ToDoListDarkTheme } from "../../Page/ToDoListStyle/Themes/ToDoListDarkTheme";
import { ToDoListPrimaryTheme } from "../../Page/ToDoListStyle/Themes/ToDoListPrimaryTheme";
import { arrTheme } from "../../Page/ToDoListStyle/Themes/QuanLyTheme";
let taskRedux = [];
if (localStorage.getItem("TaskKNT")) {
  let taskLocal = JSON.parse(localStorage.getItem("TaskKNT"));
  taskRedux = taskLocal;
}

const initialState = {
  themeToDoList: ToDoListPrimaryTheme,
  taskList: taskRedux,
  taskEditKNT: {
    id: Math.floor(Math.random() * 10),
    taskName: "",
    doneTask: false,
  },
};

export const ReducerToDoListStyle = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCAL_KNT": {
      return { ...state, taskList: action.taskLocal };
    }
    case "ADD_TASK_KNT": {
      const taskListReset = [...state.taskList];
      let taskNameTrung = taskListReset.findIndex(
        (item) => item.taskName == action.values.taskName
      );
      if (action.values.taskName === "") {
        alert("task name sai dinh dang");
        return { ...state };
      } else if (taskNameTrung !== -1) {
        alert("Task Co Roi");
        return { ...state };
      } else {
        taskListReset.push(action.values);
        localStorage.setItem("TaskKNT", JSON.stringify(taskListReset));
      }
      //   let index = taskListReset.findIndex(
      //     (item) => item.taskName === action.values.taskName
      //   );
      //   if (index !== 1) {
      //     alert("Task Đã Có Rồi");
      //   } else {

      //   }
      state.taskList = taskListReset;
      return { ...state };
    }
    case "CHECK_TASK_KNT": {
      const taskListReset = [...state.taskList];
      const indexDone = taskListReset.findIndex(
        (task) => task.id === action.item.id
      );
      if (indexDone !== -1) {
        taskListReset[indexDone].doneTask = true;
      }
      localStorage.setItem("TaskKNT", JSON.stringify(taskListReset));
      return { ...state, taskList: taskListReset };
    }
    case "XOA_TASK_KNT": {
      const indexABC = state.taskList.findIndex(
        (item) => item.id === action.item.id
      );
      if (indexABC !== -1) {
        state.taskList.splice(indexABC, 1);
      }
      localStorage.setItem("TaskKNT", JSON.stringify(state.taskList));
      return { ...state };
    }
    case "CHANGE_THEME_KNT": {
      const indexTheme = arrTheme.find((item) => item.id == action.value);
      if (indexTheme !== -1) {
        state.themeToDoList = { ...indexTheme.theme };
      }
      return { ...state };
    }
    case "EDIT_TASK_KNT": {
      return { ...state, taskEditKNT: action.item };
    }
    case "UPDATE_TASK_KNT": {
      // console.log(action.values);
      console.log(action);
      let stateUpdate = [...state.taskList];
      let index = stateUpdate.findIndex((item) => item.id === action.values.id);
      if (index !== -1) {
        stateUpdate[index].taskName = action.values.taskName;
        state.taskList = stateUpdate;
        localStorage.setItem("TaskKNT", JSON.stringify(state.taskList));
        return { ...state };
      }
    }

    default:
      return { ...state };
  }
};
