// import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [haydarCount, setHaydarCount] = useState(0);
//   const [ahmetCount, setAhmetCount] = useState(0);

//   useEffect(() => {
//     console.log('Her zaman çalışır.');
//   }); //Bu şekilde yazarsak her zaman çalışır yani component render edildi ve içindeki statelerde değişiklik olduğunda çalışır.
//   useEffect(() => {
//     console.log(
//       'Bu şekilde yazarsak component ilk kez çağrıldığı zaman çalışır'
//     );
//   }, []); //Bu şekilde yazarsak component ilk kez çağrıldığı zaman çalışır
//   useEffect(() => {
//     console.log(
//       'Bu şekilde yazarsak component ilk kez çağrıldığı ve değişken değerleri state değerleri değiştiği zaman çalışır haydar için çalışır'
//     );
//   }, [haydarCount]); //Bu şekilde yazarsak component ilk kez çağrıldığı ve değişken değerleri state değerleri değiştiği zaman çalışır

//   useEffect(() => {
//     console.log(
//       'Bu şekilde yazarsak component ilk kez çağrıldığı ve değişken değerleri state değerleri değiştiği zaman çalışır ahmet için çalışır'
//     );
//   }, [ahmetCount]); //Bu şekilde yazarsak component ilk kez çağrıldığı ve değişken değerleri state değerleri değiştiği zaman çalışır

//   useEffect(() => {
//     console.log(
//       'Bu şekilde yazarsak component ilk kez çağrıldığı ve değişken değerleri state değerleri değiştiği zaman çalışır ahmet veya haydar için çalışır'
//     );
//   }, [haydarCount, ahmetCount]); //Bu şekilde yazarsak component ilk kez çağrıldığı ve değişken değerleri state değerleri değiştiği zaman çalışır

//   return (
//     <>
//       <div className="card">
//         <button
//           onClick={() => setHaydarCount((haydarCount) => haydarCount + 1)}
//         >
//           Haydar is {haydarCount}
//         </button>
//         <button onClick={() => setAhmetCount((ahmetCount) => ahmetCount + 1)}>
//           Ahmet is {ahmetCount}
//         </button>
//       </div>
//     </>
//   );
// }

// export default App;

import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, taskDesc) => {
    const response = await axios.post('http://localhost:3000/task', {
      title,
      taskDesc,
    });
    console.log(response);
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };
  const fetchtasks = async () => {
    const response = await axios.get('http://localhost:3000/task');
    setTasks(response.data);
  };

  useEffect(async () => {
    fetchtasks();
  }, []);

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3000/task/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };
  const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3000/task/${id}`, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
