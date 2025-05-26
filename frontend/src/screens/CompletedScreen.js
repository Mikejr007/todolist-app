import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { TaskContext } from '../app/contexts/TaskContext'
import { FlatList } from 'react-native-gesture-handler'
import TaskItem from '../components/TaskItem'

const CompletedScreen = () => {
  const {deleteTask,completedTasks,CompleteTask,undoTask} = useContext(TaskContext)
  return (
    <View style={styles.container}>
      <FlatList
      data={completedTasks}
      renderItem={({item}) => (
        <TaskItem
        task={item}
        onRemove={deleteTask}
        onComplete={CompleteTask}
        onundoTask={undoTask}
        />
  )}
      keyExtractor={(item)=>item.id}
      ListEmptyComponent={
        <Text style={styles.emptyList}>No completed tasks</Text>
      }
      />
    </View>
  )
}

export default CompletedScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    emptyList:{
      fontSize:20,
      textAlign:'center',
      marginTop:240,
    },
})