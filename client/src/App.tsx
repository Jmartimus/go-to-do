import React from 'react';
import './App.css';
// import the Container Component from the semantic-ui-react
import { Container } from 'semantic-ui-react';
import ToDoList from './To-Do-list';
// import the ToDoList component
function App() {
  return (
    <div>
      <Container>
        <ToDoList />
      </Container>
    </div>
  );
}
export default App;
