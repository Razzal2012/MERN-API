import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchUsers = async () => {
    const res = await fetch(`${API}/api/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = async (user) => {
    const res = await fetch(`${API}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    if (res.ok) setUsers(prev => [data, ...prev]);
    return { ok: res.ok, data };
  };

  const updateUser = async (id, updates) => {
    const res = await fetch(`${API}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (res.ok) setUsers(prev => prev.map(u => u._id === id ? data : u));
    return { ok: res.ok, data };
  };

  const deleteUser = async (id) => {
    const res = await fetch(`${API}/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) setUsers(prev => prev.filter(u => u._id !== id));
    return res.ok;
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Users</h1>
      <UserForm onSave={addUser} editing={editing} onUpdate={updateUser} onCancel={() => setEditing(null)} />
      <UserList users={users} onEdit={(u) => setEditing(u)} onDelete={deleteUser} />
    </div>
  );
}
