import { useSelector, useDispatch } from "react-redux";
import { fetchTodo, addtodo, deleteTodo } from "./feature/todolistSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
    };

    dispatch(addtodo(newUser));
    setName("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="text-center mt-10">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2"
        />
        <button className="bg-green-500 text-white p-2 ml-2">Add</button>
      </form>

      {todos.map((todo) => (
        <div className="flex justify-center items-center p-2 mb-2">
          <p key={todo.id}>
            {todo.id}: {todo.name}
          </p>
          <button
            className="bg-red-500 text-white p-2 ml-2"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
