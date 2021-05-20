import React, { useEffect, useState } from "react";
import { arrTheme } from "../ToDoListStyle/Themes/QuanLyTheme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Container } from "../ToDoListStyle/Container/Container";
import { Dropdown } from "../ToDoListStyle/Component/Dropdown";
import { Heading3 } from "../ToDoListStyle/Component/Heading";
import { Label, Input } from "../ToDoListStyle/Component/TextField";
import { Button } from "../ToDoListStyle/Component/Button";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "../ToDoListStyle/Component/Table";

export default function ToDoListStyle() {
  const dispatch = useDispatch();
  const { themeToDoList } = useSelector((state) => state.ReducerToDoListStyle);
  const { taskList } = useSelector((state) => state.ReducerToDoListStyle);
  const { taskEditKNT } = useSelector((state) => state.ReducerToDoListStyle);
  const RenDerThemesKNT = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };
  const renderTaskToDoKNT = () => {
    return taskList
      ?.filter((task) => task.doneTask === false)
      ?.map((item, index) => {
        return (
          <Tr key={index}>
            <Th>{item.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  dispatch({ type: "CHECK_TASK_KNT", item: item });
                }}
                type="button"
                className="mr-2"
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  document.getElementById("taoLaTrum").style.display = "block";
                  dispatch({
                    type: "EDIT_TASK_KNT",
                    item: item,
                  });
                }}
                type="button"
                className="mr-2"
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: "XOA_TASK_KNT", item: item });
                }}
                type="button"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  const renderTaskToDoneKNT = () => {
    return taskList
      ?.filter((task) => task.doneTask === true)
      ?.map((item, index) => {
        return (
          <Tr key={index}>
            <Th>{item.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  dispatch({ type: "XOA_TASK_KNT", item: item });
                }}
                type="button"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: taskEditKNT,
    validationSchema: Yup.object().shape({
      taskName: Yup.string().required("Không Được Để Trống Task"),
    }),
    onSubmit: (values) => {},
  });
  useEffect(() => {}, [formik.values.taskName]);
  return (
    <ThemeProvider theme={themeToDoList}>
      <form onChange={formik.handleSubmit}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              dispatch({
                type: "CHANGE_THEME_KNT",
                value: value,
              });
            }}
            className="mt-2 "
          >
            {RenDerThemesKNT()}
          </Dropdown>
          <Heading3 className="text-center mt-3">ToDoList</Heading3>
          <div>
            <Label>Task Name</Label>
          </div>

          <Input
            value={formik.values.taskName}
            name="taskName"
            onChange={formik.handleChange}
            className="w-50"
          />
          <Button
            type="button"
            onClick={() => {
              dispatch({
                type: "ADD_TASK_KNT",
                values: formik.values,
              });
            }}
            className="ml-2"
          >
            <i className="fa fa-plus"></i> Add Task
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "UPDATE_TASK_KNT", values: formik.values });
            }}
            id="taoLaTrum"
            style={{ display: "none" }}
            type="button"
            className="ml-2"
          >
            <i className="fa fa-upload"></i> Update Task
          </Button>
          <hr />
          <Heading3>Task To Do</Heading3>
          <Table>
            <Thead>{renderTaskToDoKNT()}</Thead>
          </Table>
          <hr />
          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>{renderTaskToDoneKNT()}</Thead>
          </Table>
        </Container>
      </form>
    </ThemeProvider>
  );
}
