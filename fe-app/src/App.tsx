import { useEffect, useState, useMemo } from 'react';
import './App.css';
import { User } from './models/User';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    console.log("hello filter")
    return users.filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className='page-container'>
      <div className="header">
          <header className="header__inner">
              <h1 className="header__title">List of Users</h1>
              <p className="header__description">This is a list of current users</p>
          </header>
      </div>
      <div className="main">
        <main className="main__inner">
          <input
            type="text"
            placeholder="Filter Users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {loading && <div>Loading users...</div>}
          {error && <div>Error: {error}</div>}
          {filteredUsers.length > 0 ? (
            <table className="table-grid">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredUsers.map((user) => (
                      <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
          ) : (
            <div>No users found</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App
