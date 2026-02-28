import { useSelector, useDispatch } from "react-redux";
import { fetchTodo, addtodo } from "./feature/todolistSlice";
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
      name: name
    };

    dispatch(addtodo(newUser));
    setName("");
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
        <button className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </form>

      {todos.map((todo) => (
        <p key={todo.id}>{todo.name}</p>
      ))}
      
    </div>
  );
}

export default App;