import { useState, useEffect } from 'react';
import { db } from './db';
import { QRCodeSVG } from 'qrcode.react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    db.tasks.toArray().then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    await db.tasks.add({
      title: newTask,
      completed: false,
      createdAt: new Date()
    });
    setNewTask('');
    setTasks(await db.tasks.toArray());
  };

  return (
    <div className="App">
      <h1>待办事项管理</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="输入新任务"
      />
      <button onClick={addTask}>添加</button>
      
      <div className="qr-section">
        <QRCodeSVG value={window.location.href} size={128} />
      </div>
    </div>
  );
}

export default App;