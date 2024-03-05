import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from 'styled-components';

import { ITask } from "../../services/tasksSlice";
import { Input, Button } from "../app/App";
import { useAppDispatch } from "../../utils/hooks";
import { actions } from "../../services/tasksSlice";
import { CloseIcon } from "../icons/CloseIcon";

const BackgroundContainer = styles.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    height: fit-content;
    width: 90%;
    background-color: white;
    border-radius: 10px;
    border: none;
    padding: 10px;
`;

const RowContainer = styles.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const modalRoot = document.getElementById('modal') as Element;

/**
 * Modal component for updating a task.
 *
 * @component
 * @param {Function} onClose - Function to handle modal close event.
 * @param {ITask} item - The task item to be updated.
 * @returns {JSX.Element} The rendered Modal component.
 */
export const Modal: React.FC<{
    onClose: () => void,
    item: ITask }> = ({ onClose, item }) => {
    const [updatedTask, setUpdatedTask] = useState(item ? item.taskText : '');

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setUpdatedTask((e.target as HTMLInputElement).value);
    };

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            e.key === 'Escape' &&
            onClose();
        };
       
        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    const onClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        if (item) {
            dispatch(actions.updateTask({
                id: item.id,
                state: item.state,
                taskText: updatedTask
            }));
        };
        dispatch(actions.setCurrentTask(null));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && updatedTask.trim()) {
          onClick(e);
        };
      };

    return ReactDOM.createPortal((
            <BackgroundContainer onClick={onClose}>
                <ModalContainer onClick={e => e.stopPropagation()}>
                    <RowContainer>
                        <p>Update the Text of the Task</p>
                        <CloseIcon onClick={onClose}/>
                    </RowContainer>
                    <RowContainer>
                        <Input
                            ref={element => element?.focus()}
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                            value={updatedTask}/>
                        <Button
                            onClick={onClick}
                            disabled={!updatedTask.trim()}>
                            Update
                        </Button>
                    </RowContainer>
                </ModalContainer>
            </BackgroundContainer>
    ), modalRoot);
};