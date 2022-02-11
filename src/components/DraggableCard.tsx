import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  min-width: 200px;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) =>
    props.isDragging
      ? props.theme.colors.draggingCardColor
      : props.theme.colors.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 0px 5px 0px rgba(0, 0, 0, 0.75)" : "none"};
  transition: background-color 0.5s ease-in-out;
`;

interface IDraggaableCardProps {
  todoId: number;
  todoText: string;
  index: number;
}

const DraggableCard = ({ todoText, todoId, index }: IDraggaableCardProps) => {
  return (
    <Draggable draggableId={todoId + ""} key={todoText} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DraggableCard);
