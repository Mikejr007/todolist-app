import {createContext, useState,useEffect} from 'react';
export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {
    
    const [tasks, setTasks] = useState([]);
    const [isLoading,setIsLoading]=useState(false)
    const baseUrl= process.env.EXPO_PUBLIC_API_URL
    const refresh= async() => {
        try{
          setIsLoading(true)
          const response = await fetch(`${baseUrl}/tasks`);
          const data = await response.json();
          setTasks(data);
        }
        catch(error){
            console.error("Error Loading")
        }
        finally{
            setIsLoading(false)
        }
        
      }
    useEffect(()=>{refresh()}, []);
      
    
    
    const addTask=async({name,dueDate})=>{
        try{
            const response= await fetch(`${baseUrl}/tasks`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,dueDate}),
            });
            const savedTask= await response.json()
            setTasks((prevTasks)=>[...prevTasks,savedTask]);
        } catch(error){
            console.error('Failed to add task:', error);
        } 

    }
    
    const deleteTask=async(id)=>{
        try{
            await fetch(`${baseUrl}/tasks/${id}`,{method:'DELETE'})
        
        setTasks((prevTasks)=>prevTasks.filter((item)=>item.id !== id));
        } catch (error){
            console.error('Faild to delete task',error)
        }
    }
    const CompleteTask= async(id)=>{
        try{
            await fetch(`${baseUrl}/tasks/${id}`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({isCompleted:true})
            })
            setTasks((prevTasks)=>prevTasks.map((task) => task.id === id ? { ...task, isCompleted: true } : task ) )
        }catch(error){
            console.error("Failed to complete task",error)
        }
    }
    const undoTask= async(id)=>{
        try{
            await fetch(`${baseUrl}/tasks/${id}`,{
                method: 'PATCH',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({isCompleted:false})
            })
            setTasks((prevTasks) =>
            prevTasks.map((task) =>
            task.id === id ? { ...task, isCompleted: false } : task
            )
        );
        } catch(error){
            console.error('Failed to undo task',error)
        }
      
    }

    const completedTasks =tasks.filter((task)=>task.isCompleted)
    return(
        
        <TaskContext.Provider value={{tasks,addTask,deleteTask,CompleteTask,completedTasks,undoTask,isLoading,refresh}}>
            {children}
        </TaskContext.Provider>
    )
}
