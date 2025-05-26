import {TouchableOpacity, Text, View,StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({task,onRemove,onComplete,onundoTask}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{ task.isCompleted ? onundoTask(task.id) : onComplete(task.id)}}>
        <Ionicons 
        name={task.isCompleted ? 'checkbox' : "square-outline"} 
        size={28} 
        color={task.isCompleted ? 'green' : 'gray'}/>
      </TouchableOpacity>
     <View style={{ flex: 1, marginLeft: 10 }}>
     <Text style={styles.text}>{task.name}</Text>
     <Text style={styles.dueDateText}>
      Due: {new Date(task.dueDate).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true, 
  })}
    </Text>
    </View> 
      <TouchableOpacity onPress={()=>onRemove(task.id)}style={styles.button}>
        <Text style={styles.buttonText} >Remove</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    paddingVertical:12,
    paddingHorizontal:12,
    marginHorizontal:10,
    marginTop:10,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#e0e0e0',
    borderRadius:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0,
    shadowColor:'#000',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.05,
    shadowRadius:2,
    elevation:1
    
  },
  text:{
    fontSize:18
  },
  button:{
    padding:6,
    paddingHorizontal:12,
    backgroundColor:'#FF4C4C',
    borderRadius:12,
    alignContent:'center',
    justifyContent:'center',
    elevation:2,
    shadowColor:'#000',
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.2,
    shadowRadius:2,
    width:80
  },
  buttonText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:14
  },

  dueDateText: {
    fontSize: 14,
    color: '#555',
  }
  
  
})