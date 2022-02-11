import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  width: 100%;
  min-width: 200px;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.cardColor};
`;

interface IDraggaableCardProps {
  item: string;
  index: number;
}

const DraggableCard = ({ item, index }: IDraggaableCardProps) => {
  return (
    <Draggable draggableId={item} key={item} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item}
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DraggableCard);
