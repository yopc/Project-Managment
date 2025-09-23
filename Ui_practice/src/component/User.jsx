// // src/components/UserList.jsx

// import React, { useEffect, useState } from 'react';

// // Utility function to convert buffer to base64
// function arrayBufferToBase64(buffer) {
//   let binary = '';
//   const bytes = new Uint8Array(buffer);
//   for (let b of bytes) {
//     binary += String.fromCharCode(b);
//   }
//   return window.btoa(binary);
// }



// // Fetch users from backend
// export async function fetchAllUsers() {
//   try {
//     const response = await fetch('http://localhost:5000/user/allUser', {
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch users');
//     }

//     const data = await response.json();

//     // Defensive check
//     if (Array.isArray(data.users)) {
//       return data.users;
//     } else {
//       console.error('Unexpected response format:', data);
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// }


// // Main component
// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function loadUsers() {
//       const allUsers = await fetchAllUsers();
//       setUsers(allUsers);
//     }

//     loadUsers();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {users.map((user) => (
//           <div key={user._id} className="relative border p-4 rounded shadow hover:shadow-lg transition">
//             <h3 className="font-semibold text-lg">{user.fullName || 'No Name'}</h3>
//             <p className="text-gray-700">Email: {user.email}</p>
//             <h5 className='absolute right-1 top-1 cursor-pointer'>edit</h5>
//             {user.profilePicture?.data ? (
//               <img
//                 src={`data:${user.profilePicture.contentType};base64,${arrayBufferToBase64(
//                   user.profilePicture.data.data
//                 )}`}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full mt-4 object-cover"
//               />
//             ) : (
//               <div className="mt-4 text-sm text-gray-500">No profile picture</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;
// // import React, { useEffect, useState } from 'react';

// // // Utility function to convert buffer to base64
// // function arrayBufferToBase64(buffer) {
// //   let binary = '';
// //   const bytes = new Uint8Array(buffer);
// //   for (let b of bytes) {
// //     binary += String.fromCharCode(b);
// //   }
// //   return window.btoa(binary);
// // }

// // // Fetch users from backend
// // async function fetchAllUsers() {
// //   try {
// //     const response = await fetch('http://localhost:5000/user/allUser', {
// //       credentials: 'include',
// //     });
// //     if (!response.ok) throw new Error('Failed to fetch users');
// //     const data = await response.json();
// //     return Array.isArray(data.users) ? data.users : [];
// //   } catch (error) {
// //     console.error('Error fetching users:', error);
// //     return [];
// //   }
// // }

// // // Update user on backend (make sure your backend handles this route)
// // async function updateUser(id, updatedUser) {
// //   try {
// //     const response = await fetch(`http://localhost:5000/user/update/${id}`, {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       credentials: 'include',
// //       body: JSON.stringify(updatedUser),
// //     });
// //     if (!response.ok) throw new Error('Failed to update user');
// //     return await response.json();
// //   } catch (error) {
// //     console.error('Error updating user:', error);
// //     throw error;
// //   }
// // }

// // const UserList = () => {
// //   const [users, setUsers] = useState([]);
// //   const [editUserId, setEditUserId] = useState(null);
// //   const [editFormData, setEditFormData] = useState({ fullName: '', email: '' });

// //   useEffect(() => {
// //     async function loadUsers() {
// //       const allUsers = await fetchAllUsers();
// //       setUsers(allUsers);
// //     }
// //     loadUsers();
// //   }, []);

// //   const handleEditClick = (user) => {
// //     setEditUserId(user._id);
// //     setEditFormData({ fullName: user.fullName || '', email: user.email || '' });
// //   };

// //   const handleCancelClick = () => {
// //     setEditUserId(null);
// //     setEditFormData({ fullName: '', email: '' });
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setEditFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveClick = async (userId) => {
// //     try {
// //       await updateUser(userId, editFormData);
// //       setUsers((prev) =>
// //         prev.map((user) => (user._id === userId ? { ...user, ...editFormData } : user))
// //       );
// //       setEditUserId(null);
// //     } catch {
// //       alert('Failed to save changes');
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //         {users.map((user) => (
// //           <div key={user._id} className="relative border p-4 rounded shadow hover:shadow-lg transition">
// //             {editUserId === user._id ? (
// //               <>
// //                 <input
// //                   type="text"
// //                   name="fullName"
// //                   value={editFormData.fullName}
// //                   onChange={handleInputChange}
// //                   className="border p-1 w-full mb-2 rounded"
// //                 />
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={editFormData.email}
// //                   onChange={handleInputChange}
// //                   className="border p-1 w-full mb-2 rounded"
// //                 />
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => handleSaveClick(user._id)}
// //                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// //                   >Save
// //                   </button>
// //                   <button
// //                     onClick={handleCancelClick}
// //                     className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <h3 className="font-semibold text-lg">{user.fullName || 'No Name'}</h3>
// //                 <p className="text-gray-700">Email: {user.email}</p>
// //                 <h5
// //                   className="absolute right-1 top-1 cursor-pointer text-blue-600"
// //                   onClick={() => handleEditClick(user)}
// //                 >
// //                   edit
// //                 </h5>
// //               </>
// //             )}
// //             {user.profilePicture?.data ? (
// //               <img
// //                 src={`data:${user.profilePicture.contentType};base64,${arrayBufferToBase64(
// //                   user.profilePicture.data.data
// //                 )}`}
// //                 alt="Profile"
// //                 className="w-24 h-24 rounded-full mt-4 object-cover"
// //               />
// //             ) : (
// //               <div className="mt-4 text-sm text-gray-500">No profile picture</div>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserList;
