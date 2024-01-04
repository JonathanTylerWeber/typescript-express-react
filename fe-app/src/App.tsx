import { useEffect, useState } from 'react';
import './App.css';
import { User } from './models/User';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/v1/users');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main>
      {loading && <div>Loading users...</div>}
      {error && <div>Error: {error}</div>}
      {users.length > 0 && (
        <div>
          <h2>Users:</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>{`${user.firstName} ${user.lastName} (${user.email})`}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default App
