import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import CompletedScreen from '../screens/CompletedScreen'
import AddTasksScreen from '../screens/AddTasksScreen'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const HomeStack=()=>{
    const Stack=createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen
           name='HomeScreen' 
           component={HomeScreen} 
           options={{
            title:"Todos",
            headerStyle:{
                
            }

        }} />
            <Stack.Screen
            name='AddTasksScreen'
            component={AddTasksScreen}
            options={({ navigation }) => ({
                title: 'Add task',
                presentation: 'card',
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}>
                    <Ionicons name="arrow-back" size={24} color="midnightblue" />
                  </TouchableOpacity>
                ),
              })}              
            />

        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    const Tab = createBottomTabNavigator()
  return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'midnightblue',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name='Home' component={HomeStack} 
                options={{
                    headerShown:false,
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='home' color={color} size={size} />  )
                }}
            
            />
            <Tab.Screen name='CompletedScreen' component={CompletedScreen}
            options={{
                title: 'Completed',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='checkmark' color={color} size={size} />  )
            }} />
            </Tab.Navigator>
   
  )
}

export default AppNavigation

