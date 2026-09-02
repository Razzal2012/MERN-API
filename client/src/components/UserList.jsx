import React from 'react';

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {users.map(u => (
        <li key={u._id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <strong>{u.name}</strong>
            <div style={{ fontSize: 12 }}>{u.email}</div>
          </div>
          <div>
            <button onClick={() => onEdit(u)} style={{ marginRight: 8 }}>Edit</button>
            <button onClick={() => onDelete(u._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
