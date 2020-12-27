import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Home from './src/pages/Home';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      AsyncStorage.getItem('todo').then((todosStr) => {
        console.log(todosStr);
        setTodos(JSON.parse(todosStr) || []);
        setLoaded(true);
      });
    }
  }, []);

  return loaded ? (
    <Home
      todos={todos}
      persistTodos={(todos) =>
        AsyncStorage.setItem('todo', JSON.stringify(todos))
      }
    />
  ) : (
    <Text>Loading...</Text>
  );
}
