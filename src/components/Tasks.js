import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle }) => {

    
    return (
        <>
            {tasks.map((task, index) => (
                      // <h3 key={task.id}>{task.text}</h3>   ---- umesto ovoga ide komponenta 'Task', a umesto key={task.id} ide {index}
                <Task key={index} 
                task={task}
                onDelete={onDelete}
                onToggle={onToggle} />
                )
            )}
        </>
    )
}

export default Tasks
