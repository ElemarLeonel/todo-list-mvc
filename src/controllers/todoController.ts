import { Request, Response } from "express";
import Todo, { ITodo } from "../models/todoModel";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const newTodo: ITodo = new Todo({
      title,
      completed: false,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deletado" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
