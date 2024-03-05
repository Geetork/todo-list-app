import React, { useState } from 'react';
import styles from 'styled-components';

import { ITask, actions } from '../../services/tasksSlice';
import ListItem from '../list-item/ListItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '../../utils/hooks';

const ListContainer = styles.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const FilterContainer = styles.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const FilterButton = styles.div`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

/**
 * List component to display a filtered list of tasks.
 *
 * @component
 * @param {ITask[]} items - The list of tasks to display.
 * @returns {JSX.Element} The rendered List component.
 */
const List: React.FC<{
    items: ITask[]
}> = ({ items }) => {
    const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');
    const dispatch = useAppDispatch();

    const moveTask = (prevId: string, currentId: string) => {
        dispatch(actions.moveTask({ prevId: prevId, currentId: currentId }));
    }; 
     
    const filteredItems = filter === 'all' ? items : items.filter(item => item.state === filter);

    return (
        <>
        <FilterContainer>
            <FilterButton
                style={{ color: filter === 'all' ? '#033164' : '#A8AAAC'}}
                onClick={() => setFilter('all')}>All</FilterButton>
            <FilterButton
                style={{ color: filter === 'pending' ? '#033164' : '#A8AAAC'}} 
                onClick={() => setFilter('pending')}>Pending</FilterButton>
            <FilterButton 
                style={{ color: filter === 'done' ? '#033164' : '#A8AAAC'}} 
                onClick={() => setFilter('done')}>Done</FilterButton>
        </FilterContainer>
        {
            filteredItems.length ? <ListContainer>
                <DndProvider backend={HTML5Backend}>
                    {
                        filteredItems.map((item: ITask) =>
                            <ListItem key={item.id} {...item} moveTask={moveTask}/>
                        )
                    }
                </DndProvider>
            </ListContainer> :
            <p>No items found</p>
        }
        </> 
    )
};

export default List;