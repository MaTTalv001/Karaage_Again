import React from 'react';
import Header from '../components/Header';

const UserIndex = () => {

  const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    { id: 3, username: 'user3', email: 'user3@example.com', password: 'password3' },
    { id: 4, username: 'user4', email: 'user4@example.com', password: 'password4' },
    { id: 5, username: 'user5', email: 'user5@example.com', password: 'password5' },
    { id: 6, username: 'user6', email: 'user6@example.com', password: 'password6' },
    { id: 7, username: 'user7', email: 'user7@example.com', password: 'password7' },
    { id: 8, username: 'user8', email: 'user8@example.com', password: 'password8' },
    { id: 9, username: 'user9', email: 'user9@example.com', password: 'password9' },
    { id: 10, username: 'user10', email: 'user10@example.com', password: 'password10' }    
    ];

  return (
    <>
      
      <div className="bg-yellow-100 w-screen min-h-screen relative">
        <Header />
        <h1 className="text-center text-4xl  my-5">　ユーザー一覧　</h1>

        <table className="mx-auto my-5 bg-white border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="py-1 px-5 bg-green-300 border border-slate-600">ID</th>
                        <th className="py-1 px-5 bg-green-300 border border-slate-600">Username</th>
                        <th className="py-1 px-5 bg-green-300 border border-slate-600">Email</th>
                        <th className="py-1 px-5 bg-green-300 border border-slate-600">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-1 px-5 text-center border border-slate-700" >{user.id}</td>
                            <td className="py-1 px-5 text-center border border-slate-700" >{user.username}</td>
                            <td className="py-1 px-5 text-center border border-slate-700" >{user.email}</td>
                            <td className="py-1 px-5 text-center border border-slate-700" >{user.password}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
        
      </div>
    </>
  );
}
export default UserIndex;