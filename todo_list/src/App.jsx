import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);

  return <div className="text-xl font-bold text-center mt-10">{todo}</div>;
}

export default App;
