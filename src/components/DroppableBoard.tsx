import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Board = styled.div`
  width: 30%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.boardColor};
`;

interface IBoardProps {
  todoArray: string[];
  boardId: string;
}

const DroppableBoard = ({ boardId, todoArray }: IBoardProps) => {
  return (
    <Board>
      <div>{boardId === "DOIN" ? "IN PROGRESS" : boardId}</div>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todoArray.map((item, index) => (
              <DraggableCard item={item} key={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Board>
  );
};
export default DroppableBoard;
