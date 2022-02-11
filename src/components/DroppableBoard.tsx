import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { BiBone } from "react-icons/bi";
import { ITodo } from "../atoms";

const Board = styled.div`
  width: 30%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.boardColor};
  :last-child {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 100px;
    right: 100px;
    margin: 4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.cardColor};
    border: 5px solid ${(props) => props.theme.colors.boardsColor};
  }
`;
const Title = styled.div`
  font-size: 1.1rem;
  padding: 0.7rem;
`;
interface ICardCoverProps {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}

const CardCover = styled.div<ICardCoverProps>`
  flexgrow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.colors.cardCoverColor
      : props.isDraggingFrom
      ? props.theme.colors.cardCoverColor_02
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
  :last-child {
  }
`;

interface IBoardProps {
  todoArray: ITodo[];
  boardId: string;
  index: number;
}

const DroppableBoard = ({ boardId, todoArray, index }: IBoardProps) => {
  return (
    <Board>
      <Title>
        {boardId === "DOIN" ? (
          "IN PROGRESS"
        ) : boardId === "DUST" ? (
          <div
            style={{
              fontSize: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BiBone />
          </div>
        ) : (
          boardId
        )}
      </Title>

      <Droppable droppableId={boardId} key={boardId}>
        {(provided, snapshot) => (
          <CardCover
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
          >
            {todoArray.map((item, index) => (
              <DraggableCard
                todoText={item.text}
                todoId={item.id}
                key={item.id}
                index={index}
              />
            ))}
            {provided.placeholder}
          </CardCover>
        )}
      </Droppable>
    </Board>
  );
};
export default DroppableBoard;
