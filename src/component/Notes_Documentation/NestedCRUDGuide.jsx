import React, { useState } from 'react';

const NestedCRUDGuide = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ravi",
      tasks: [
        { id: 101, title: "Design UI", completed: false },
        { id: 102, title: "Write API", completed: true }
      ]
    },
    {
      id: 2,
      name: "mounika",
      tasks: [
        { id: 103, title: "Test App", completed: false }
      ]
    }
  ]);

  // 🟢 Add New Task to a Specific User
  const addTask = (userId, newTask) => {
    const updated = users.map(user =>
      user.id === userId
        ? { ...user, tasks: [...user.tasks, newTask] }
        : user
    );
    setUsers(updated);
  };

  // 🟡 Update Task Title
  const updateTaskTitle = (userId, taskId, newTitle) => {
    const updated = users.map(user =>
      user.id === userId
        ? {
            ...user,
            tasks: user.tasks.map(task =>
              task.id === taskId ? { ...task, title: newTitle } : task
            )
          }
        : user
    );
    setUsers(updated);
  };

  // 🔴 Delete Task from User
  const deleteTask = (userId, taskId) => {
    const updated = users.map(user =>
      user.id === userId
        ? { ...user, tasks: user.tasks.filter(task => task.id !== taskId) }
        : user
    );
    setUsers(updated);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", background: "#fcfcfc" }}>
      <h2 style={{ color: "#444" }}>🔄 Advanced CRUD with Nested Structures</h2>
      <p><strong>Telugu:</strong> Nested Arrays & Objects లో CRUD operations చేయడం React లో చాలా కీలకం.</p>

      <h3>🧠 Structure:</h3>
      <pre>
        <code>{`[
  {
    id: 1,
    name: "User",
    tasks: [
      { id: 101, title: "Work", completed: false }
    ]
  }
]`}</code>
      </pre>

      <h3>🟢 Task Add చేయడం:</h3>
      <code>addTask(1, {"{"}id: 105, title: "New Task", completed: false{"}"})</code>

      <h3>🟡 Task Update చేయడం:</h3>
      <code>updateTaskTitle(1, 101, "Updated Title")</code>

      <h3>🔴 Task Delete చేయడం:</h3>
      <code>deleteTask(2, 103)</code>

      <h3>📌 Real-time Usage:</h3>
      <ul>
        <li>📝 Dynamic Forms (users, addresses, phones)</li>
        <li>📊 Editable Tables with sub-rows</li>
        <li>🌐 API response modify చేసి UI లో reflect చేయడం</li>
      </ul>

      <h3>✅ Best Practices:</h3>
      <ul>
        <li>Always use <code>map</code> for immutability</li>
        <li>Use unique <code>id</code> for tracking items</li>
        <li>React state update చేయడానికి nested updates careful గా handle చేయాలి</li>
      </ul>

      <h4>Next Step: Want full editable UI example for this CRUD?</h4>
    </div>
  );
};

export default NestedCRUDGuide;
