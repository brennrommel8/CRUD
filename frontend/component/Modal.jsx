import { useState, useEffect } from 'react';

const Modal = ({ open, onClose, onAdd, editingUser, update }) => {
  const [user, setUser] = useState({ name: '', age: '', email: '' });

  useEffect(() => {
    if (editingUser) {
      setUser({ name: editingUser.name, age: editingUser.age, email: editingUser.email });
    } else {
      setUser({ name: '', age: '', email: '' });
    }
  }, [editingUser]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(user);
    setUser({ name: '', age: '', email: '' });
    onClose();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    update(editingUser._id, user);
    setUser({ name: '', age: '', email: '' });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
 
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{editingUser ? 'Edit User' : 'Add User'}</h2>
        
        <form onSubmit={editingUser ? handleUpdate : handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              value={user.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
             Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;