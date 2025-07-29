import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

type Todo = {
  id: string;
  title: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    window.location.href = '/login';
  };


  return (
    <>
      <div className={styles.container}>
        <h1>My ToDos</h1>
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}
