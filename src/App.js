import './App.css';
import { useState,useEffect } from 'react';
function App() {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState('');
  const [task, setTask] = useState('Task 1');
  const [time, setTime] = useState(task === 'Task 1' ? 1200 : 2400); // 20 minutes or 40 minutes
  const taskLimits = { 'Task 1': 150, 'Task 2': 250 };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [task]);

  function handleChange(e) {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    setCount(words.length);
    setWord(text);
  }

  function handleTaskChange(selectedTask) {
    setTask(selectedTask);
    setCount(0);
    setWord('');
    setTime(selectedTask === 'Task 1' ? 1200 : 2400); // Reset timer based on the task
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div>
      <h2>Ielts Writing</h2>
      <div>
        <button onClick={() => handleTaskChange('Task 1')}>Task 1</button>
        <button onClick={() => handleTaskChange('Task 2')}>Task 2</button>
      </div>
      <p>{task}: {count}/{taskLimits[task]}</p>
      <p>Time remaining: {formatTime(time)}</p>
      <Form onTextChange={handleChange} />
    </div>
  );
}
function Form({onTextChange}){
  return(
    <body>
       <textarea style={{ width: '100%', height: '100vh' }} onChange={onTextChange}></textarea>
    </body>
  )
}
export default App;