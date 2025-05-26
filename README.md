# Todolist App
This is a fullstack todolist app built with Reactnative on the frontend and Node.js with Firebase on the backend.

# Features
Frontend
- Add tasks with a duedat
- See tasks in a list
- Remove tasks
- Mark tasks as complete
- View completed tasks

Backend
- Tasks are stored in Firebase
- It provides ApI routes

# Instructions for setting up
1. Clone repo:
    git clone https://github.com/your-username/todolist-app.git
    cd todolist-app
2. Setup Enviroment:
    Step 1: In the backend folder, add your Firebase serviece account key file 
    Step 2: Create a .env file in the backend folder and paste: FIREBASE_KEY_PATH= # .\ replace with the name of serviece account key file
    Step 3: Create a .env folder in your frontend and add: EXPO_PUBLIC_API_URL=http://<replace with your local ip>:3002

3. Install Backend dependencies and start backend server:
    cd backend
    npm install
    then: node index.js
4. Install frontend dependencies and start:
        cd frontend
        npm install
        then npm start