import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from 'styled-components';

import List from '../list/List';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { actions } from '../../services/tasksSlice';
import { Modal } from '../modal/Modal';
import Loader from '../loader/Loader';

const Container = styles.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
`;

const AddTaskContainer = styles.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Input = styles.input`
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #CCE6B9;
  height: 40px;
  &:focus {
    outline: none;
    border: 2px solid #B4D59C;
  }
`;

export const Button = styles.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: 0.5px solid grey;
  background-color: #B4D59C;
  cursor: pointer;
`;

/**
 * An App component renders a todo list and input field for task creation
 * 
 * @component
 * @returns {ReactNode} A React element that renders a todo list
 */
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState('');

  const tasks = useAppSelector(state => state.todos.items);
  const currentTask = useAppSelector(state => state.todos.currentTask);

  const dispatch = useAppDispatch();

  // Sets up tasks with values from localStorage/state manager when component is mounted
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      dispatch(actions.updateTaskListFromStorage(JSON.parse(storedTasks)));
    };

    setIsLoading(false);
  }, []);


  // Handles localStorage update when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handles the input change
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTask((e.target as HTMLInputElement).value);
  };

  // Handles a click event for the button, dispatches the addTask action
  const addTask = (): void => {
    if (newTask.trim() !== '') {
      dispatch(actions.addTask({
        id: uuidv4(),
        state: 'pending',
        taskText: newTask,
      }));
      setNewTask('');
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      addTask();
    };
  }; 

  const onModalClose = (): void => {
    dispatch(actions.setCurrentTask(null));
  };

  return (
    <Container>
      {
        isLoading ? <Loader /> : (
          <>
            <h1>Create Your TODO List and Keep Track of Your Tasks</h1>
            <AddTaskContainer>
              <Input 
                type='text'
                value={newTask}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                ref={element => element?.focus()}/>
              <Button
                onClick={addTask}
                disabled={!newTask.trim()}>
                  Add
              </Button>
            </AddTaskContainer>
            <List items={tasks}/>
            {currentTask && (
                <Modal onClose={onModalClose} item={currentTask}/>
            )}
          </>
        )
      }
    </Container>
  );
}

export default App;
