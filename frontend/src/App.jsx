import axios from 'axios';
import { useState, useEffect } from 'react'
import Modal from '../component/Modal';


const App = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  }

  const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users');
      const data = response.data;
      setUsers(data.users);
      }
     
    useEffect(() => {
      fetchUsers();
    }, [])


 const handleAdd = async (user) => {
   try {
    await axios.post('http://localhost:5000/api/users', user);
    fetchUsers();
  } catch (error) {
    console.error('Error adding user:', error);
  }
 }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const update = async (id, user) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, user);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
  
  return (
   <div className="p-5">
    <button onClick={handleOpen} className="flex justify-center mb-4 bg-blue-500 text-white px-4 py-2 rounded">Add</button>
  <table className="w-full bg-white shadow rounded-lg overflow-hidden">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700">Age</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id} className="border-t border-gray-200">
          <td className="px-4 py-3">{user.name}</td>
          <td className="px-4 py-3 text-gray-600">{user.email}</td>
          <td className="px-4 py-3">{user.age}</td>
           <td className="px py-3">
            <button onClick ={() => handleDelete(user._id)} className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 mr-2">
              Delete
            </button>
            <button onClick={() => { setEditingUser(user); handleOpen(); }} className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
              Edit
            </button>
           </td>
         
        </tr>
      ))}
    </tbody>
  </table>

  <Modal
    open={open}
    onClose={handleClose}
    onAdd={handleAdd}
    editingUser={editingUser}
    update={update}
  />

</div>
  )
}


export default App