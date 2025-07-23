import React from 'react';
import Counter from '../components/Counter';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Counter />
      <TodoList />
    </div>
  );
};

export default Home;
