import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import pic from "./assets/i-dont-know.png";


// function App() {

// const name = 'Oliver'
// const x = true
// const y = false

const App = () => {
                                      // umesto ove arrow funkcije mozemo staviti i class-u
                                      // class App extends React.Component {
                                      //   render() {
                                      //     return <header> </header>
                                      //   }
                                      // }

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState(
    [
            // {id: 1,
            // text: 'Odvesti Andreu u Muzicku skolu',
            // day: 'Dec 6th at 9:00am',
            // reminder: true,
            // },
        
            // {id: 2,
            //   text: 'Odneti stvari u boravak',
            //   day: 'Dec 6th at 9:10am',
            //   reminder: true,
            // },
        
            // {id: 3,
            //   text: 'Odneti kljuc Ljilji',
            //   day: 'Dec 6th at 9:20am',
            //   reminder: true,
            // },
        
            // {id: 4,
            //   text: 'Stici na vreme na posao',
            //   day: 'Dec 6th at 9:30am',
            //   reminder: false,
            // },   --------------------------------- sve ovo prebaciti u db.json
        ])


        useEffect(() => {
          const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
          }

          getTasks()
        }, [])


          // Fetch Tasks
          const fetchTasks = async () => {
            const res = await fetch(`http://localhost:5000/tasks`)
            console.log(res)
            const data = await res.json()

            console.log(data)
            return data 
          }


           // Fetch samo jedan Task   ... za upotrebiti u ToggleReminder
           const fetchTask = async (id) => {
            const res = await fetch(`http://localhost:5000/tasks/${id}`)
            console.log(res)
            const data = await res.json()

            console.log(data)
            return data 
          }
        


          // Add Task (kreiraj funkciju za dodavanje)
  const addTask = async (task) => {
    // console.log(task)
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }, 
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    
    
    
    // const id = Math.floor(Math.random() * 1000) + 1              ------> u slucaju da nam je potreban random Id
    // // console.log(id)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

                                
          // Kreirati funkciju za brisanje Task-ova
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    // console.log('delete', id);
    setTasks(tasks.filter((task) => task.id !==id))
  }


          // Kreiraj funkciju za prebacivanje (Toggle) podsetnika
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, 
      reminder: !taskToToggle.reminder }


      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    // console.log(id);
    setTasks(tasks.map((task) => 
      task.id === id ? { 
        ...task, reminder : data.reminder 
      } : task))
  }


  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && 
        <AddTask onAdd={addTask} />
      }
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} 
        onDelete={deleteTask}
        onToggle={toggleReminder} />
      ) : (
        <>
          <img src={pic} alt="no-more-tasks"/>
          <p className="no-more-tasks">Nemaš više nikakvih zaduženja!</p>
        </>

        // 'Nemaš više nikakvih zaduženja!'
      )}

      {/* <h2>Hello {name}</h2> ----> izbacuje Hello Oliver
      <h3>Hello {1 + 1}</h3>   ----> izbacuje Hello 2
      <h2>Hello {x ? 'Yes' : 'No'}</h2>   ----> izbacuje Hello Yes
      <h2>Hello {y ? 'Yes' : 'No'}</h2>  ----> izbacuje Hello No   */}
    </div>
  );
}

export default App;
