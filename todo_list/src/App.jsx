import { useSelector, useDispatch } from "react-redux";
import { fetchTodo, addtodo, deleteTodo, updateTodo } from "./feature/todolistSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  // ADD
  const [name, setName] = useState("");

  // EDIT
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
console.log(editValue)
console.log(editingId);

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  // Add new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(addtodo({ name }));
    setName("");
  };

  // Delete todo
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  // Start editing
  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.name);
  };

  // Save updated todo
  const handleUpdate = () => {
    if (!editValue.trim()) return;

    dispatch(updateTodo({ id: editingId, newdata: { name: editValue } }));

    // Reset edit state
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Todo App
        </h1>

        {/* ADD FORM */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="flex-1 border rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            Add
          </button>
        </form>

        {/* LIST */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
            >
              {editingId === todo.id ? (
                <div className="flex gap-2 w-full">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 border rounded-md p-1 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800 dark:text-gray-100 font-medium">
                    {todo.name}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;