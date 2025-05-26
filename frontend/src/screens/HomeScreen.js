import { StyleSheet, Text, TouchableOpacity, View,ActivityIndicator,FlatList } from 'react-native'
import React,{useContext} from 'react'
import { TaskContext } from '../app/contexts/TaskContext'
import TaskItem from '../components/TaskItem'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation=useNavigation()
  const {tasks,deleteTask,addTask,CompleteTask,undoTask,isLoading,refresh} = useContext(TaskContext)
  if (isLoading && tasks.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="midnightblue" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
     <FlatList
     data={tasks.filter(task=>!task.isCompleted)}
     renderItem={({item}) => (
    <TaskItem
    task={item}
    onRemove={deleteTask}
    onComplete={CompleteTask}
    />
  )}
  keyExtractor={(item) => item.id}
  ListEmptyComponent={
    <Text style={styles.emptyList}>Nothing todo</Text>
  }
  onRefresh={refresh}
  refreshing={isLoading}
     />
    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AddTasksScreen")}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  },
    button:{
      position: 'absolute',
      bottom: 50,
      left: 160, 
      width: 75,
      height: 75,
      borderRadius: 40, 
      backgroundColor: 'midnightblue',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: 'white',

    },
    buttonText:{
      fontSize: 34,
      fontWeight: 'bold',
      color:"#ffffff"
    },
    emptyList:{
      fontSize:20,
      textAlign:'center',
      marginTop:240,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
    
})