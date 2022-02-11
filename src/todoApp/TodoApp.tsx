import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms";
import styled from "styled-components";
import DroppableBoard from "../components/DroppableBoard";
import { useForm } from "react-hook-form";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const Boards = styled.div`
  width: 80%;
  padding: 1rem;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.boardsColor};
`;

const FormInput = styled.form`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 50%;
    padding: 0.7rem;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
  }
`;

const TodoApp = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onDragEndInner = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === "DUST") {
      const sourceList = [...todoList[source.droppableId]];
      sourceList.splice(source.index, 1);
      setTodoList({
        ...todoList,
        [source.droppableId]: sourceList,
      });

      localStorage.setItem(
        "TODO_LIST",
        JSON.stringify({
          ...todoList,
          [source.droppableId]: sourceList,
        })
      );
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
    if (
      destination.droppableId !== source.droppableId &&
      destination.droppableId !== "DUST"
    ) {
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

  interface IFormInput {
    todo: string;
  }

  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const onValid = (data: IFormInput) => {
    console.log(data);
    const newTodo = { id: Date.now(), text: data.todo };
    const newTodoList = { ...todoList, TODO: [newTodo, ...todoList.TODO] };
    setTodoList(newTodoList);

    localStorage.setItem(
      "TODO_LIST",
      JSON.stringify({ ...todoList, TODO: [newTodo, ...todoList.TODO] })
    );
    setValue("todo", "");
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEndInner}>
        <FormInput onSubmit={handleSubmit(onValid)}>
          <input
            {...register("todo", { required: true })}
            type="text"
            placeholder="add todo task ...."
          />
        </FormInput>

        <Boards>
          {Object.keys(todoList).map((key, index) => (
            <DroppableBoard
              todoArray={todoList[key]}
              boardId={key}
              key={key}
              index={index}
            />
          ))}
        </Boards>
      </DragDropContext>
    </Container>
  );
};

export default TodoApp;
