import React, { useRef } from "react";
import styles from 'styled-components';
import { XYCoord, useDrag, useDrop } from "react-dnd";

import { ITask, actions } from "../../services/tasksSlice";
import { CheckIcon } from "../icons/CheckIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useAppDispatch } from "../../utils/hooks";
import { UndoIcon } from "../icons/UndoIcon";
import { EditIcon } from "../icons/EditIcon";

const TaskContainer = styles.div`
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #F8DF87;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 5px 5px 10px -5px #888888;
    &:hover {
        cursor: pointer;
    }
`;

const ManageTaskContainer = styles.div`
    display: flex;
    justify-content: space-between;
`;

const Tag = styles.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    font-size: 10px;
    border: none;
    border-radius: 8px;
`;

interface IListItemProps extends ITask {
    moveTask: (prevId: string, currentId: string) => void;
};

/**
 * ListItem component represents an individual task in the task list.
 *
 * @component
 * @param {string} id - The unique identifier of the task.
 * @param {string} state - The state of the task ('pending' or 'done').
 * @param {string} taskText - The text content of the task.
 * @param {(dragIndex: number, hoverIndex: number) => void} moveTask - Function to handle task movement.
 * @returns {JSX.Element} The rendered ListItem component.
 */
const ListItem: React.FC<IListItemProps> = ({ id, state, taskText, moveTask }) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);

    /**
     * A hook handles drop events
     */
    const [, drop] = useDrop({
        accept: 'task',
        hover(item: ITask, monitor) {
            if (!ref.current) {
                return;
            };

            const dragIndex = item.id;
            const hoverIndex = id;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            };
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            };

            moveTask(dragIndex, hoverIndex);
            item.id = hoverIndex;
        },
    })

    /**
     * A hook handles drag events
     */
    const [, drag] = useDrag({
        type: 'task',
        item: () => ({ id }),
    })

    drag(drop(ref));

    const changeState = () => {
        dispatch(actions.changeTaskState({ id, state, taskText }));
    };

    const deleteTask = () => {
        dispatch(actions.deleteTask({ id, state, taskText }));
    };

    const editTask = () => {
        dispatch(actions.setCurrentTask({ id, state, taskText }))
    };

    return (
        <TaskContainer ref={ref}>
            <ManageTaskContainer>
                <Tag style={{ backgroundColor: state === 'done' ? '#CCE6B9' : '#F8DF87'}}>{state}</Tag>
                <div>
                    {
                        state === 'pending' ? <CheckIcon onClick={changeState}/> : <UndoIcon onClick={changeState} />
                    }
                    <EditIcon onClick={editTask}/>
                    <DeleteIcon onClick={deleteTask}/>
                </div>
            </ManageTaskContainer>
            <span>{taskText}</span>
        </TaskContainer>
    )
};

export default ListItem;