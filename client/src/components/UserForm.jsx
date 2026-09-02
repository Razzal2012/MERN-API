import React, { useState, useEffect } from 'react';

export default function UserForm({ onSave, editing, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editing) { setName(editing.name || ''); setEmail(editing.email || ''); }
    else { setName(''); setEmail(''); }
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      const { ok } = await onUpdate(editing._id, { name, email });
      if (ok) onCancel();
    } else {
      const { ok } = await onSave({ name, email });
      if (ok) { setName(''); setEmail(''); }
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ marginRight: 8 }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ marginRight: 8 }} />
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
      {editing && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
    </form>
  );
}
