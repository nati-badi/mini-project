import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTodo } from "./feature/todolistSlice";

function App() {
  const dispatch = useDispatch();

  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div className="text-xl font-bold text-center mt-10">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {todos.map((todo) => (
        <p key={todo.id}>{todo.name}</p>
      ))}
    </div>
  );
}

export default App;