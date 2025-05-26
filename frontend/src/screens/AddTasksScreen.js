import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { TaskContext } from '../app/contexts/TaskContext'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native';



const AddTasksScreen = () => {
  const navigation = useNavigation();
    const {addTask} =useContext(TaskContext)
    const [taskName,setTaskName]=useState('')
    const [dueDate,setDueDate]= useState(new Date())
    const [showPicker,setShowPicker]=useState(false)
    const handleAddTask = () => {
      if (taskName.trim().length > 0) {  
        addTask({ name: taskName, dueDate: dueDate });
        setTaskName('');
        setDueDate(new Date());
        navigation.goBack()
      } else {
        alert("Task name cannot be empty!"); 
      }
    };
    
    const handleDateChange=(event,selectedDate)=>{
      setShowPicker(false)
      if(selectedDate){
        setDueDate(selectedDate)
      }
    }
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? "padding" : 'position'} >
      <Text style={styles.text}>Please enter task below</Text>
      <TextInput
      onChangeText={setTaskName}
      value={taskName}
      style={styles.input} />
      <TouchableOpacity style={styles.dateButton} onPress={()=>setShowPicker(true)}>
        <Text style={styles.dateButtonText}>Select Due Date</Text>
      </TouchableOpacity>
      {showPicker&&(
        <DateTimePicker
        value={dueDate}
        mode='datetime'
        display='default'
        onChange={handleDateChange}/>
      )}
      <Text style={styles.dueDateText}>Due Date: {dueDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, 
  })}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddTask} >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    
    </KeyboardAvoidingView>
  )
}

export default AddTasksScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:'center'
  },
  input:{
    borderWidth:3,
    borderColor:'black',
    borderRadius:16,
    width:280,
    height:40,
    marginTop:30,
    marginBottom:40,
    paddingLeft:10
    
  },
 text:{
  fontSize:25,
  fontWeight:'bold',
  },
  button: {
    width:250,
    backgroundColor: '#191970',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 3,
  },
  buttonText:{
    color:"#ffffff",
    fontSize:15,
  fontWeight:'bold',
  },
  dateButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 8,
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 15,
  },
  dueDateText: {
    fontSize: 16,
    marginBottom: 20,
  },
})