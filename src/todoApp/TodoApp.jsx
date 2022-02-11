import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms";
import styled from "styled-components";
import DroppableBoard from "../components/DroppableBoard";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const Boards = styled.div`
  width: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.boardsColor};
`;

const TodoApp = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const onDragEndInner = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const newTodoList = [...todoList[source.droppableId]];
      const removed = newTodoList.splice(source.index, 1);
      newTodoList.splice(destination.index, 0, ...removed);
      setTodoList({ ...todoList, [source.droppableId]: newTodoList });

      localStorage.setItem(
        "TODO_LIST",
        JSON.stringify({ ...todoList, [source.droppableId]: newTodoList })
      );
    }
    if (destination.droppableId !== source.droppableId) {
      const sourceList = [...todoList[source.droppableId]];
      const destList = [...todoList[destination.droppableId]];
      const removed = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, ...removed);
      setTodoList({
        ...todoList,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      });

      localStorage.setItem(
        "TODO_LIST",
        JSON.stringify({
          ...todoList,
          [source.droppableId]: sourceList,
          [destination.droppableId]: destList,
        })
      );
    }
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEndInner}>
        <Boards>
          {Object.keys(todoList).map((key) => (
            <DroppableBoard todoArray={todoList[key]} boardId={key} key={key} />
          ))}
        </Boards>
      </DragDropContext>
    </Container>
  );
};
export default TodoApp;
