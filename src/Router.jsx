import TodoApp from "./todoApp/TodoApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
