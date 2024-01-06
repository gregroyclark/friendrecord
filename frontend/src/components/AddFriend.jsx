import { useState } from 'react';

const AddFriend = () => {
  const [friend, setFriend] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    notes: '',
    userId: '',
  });

  const createFriend = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(friend),
      });

      console.log(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        console.error('Network response was not ok');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log('Response data: ', data);
    } catch (error) {
      console.error('Error creating friend: ', error);
    }
  };

  const readFriends = async (userId) => {
    try {
      const response = await fetch(`/friends/${userId}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error reading all friends: ', error);
    }
  };

  const deleteFriend = async (id) => {
    try {
      const response = await fetch(`/friends/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error deleting friend: ', error);
    }
  };

  return (
    <div className='shadow-md p-2 m-2 rounded-sm'>
      <h1 className='mb-4 flex justify-center text-lg font-semibold text-gray-600'>
        Add a new friend!
      </h1>
      <hr className='mb-4' />
      <form onSubmit={createFriend}>
        <div className='flex flex-col p-2'>
          <label className=''>First Name: </label>
          <input
            type='text'
            value={friend.firstName}
            onChange={(e) =>
              setFriend({ ...friend, firstName: e.target.value })
            }
            className='shadow-md rounded-sm p-2'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Last Name: </label>
          <input
            type='text'
            value={friend.lastName}
            onChange={(e) => setFriend({ ...friend, lastName: e.target.value })}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Email: </label>
          <input
            type='text'
            value={friend.email}
            onChange={(e) => setFriend({ ...friend, email: e.target.value })}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Phone Number: </label>
          <input
            type='text'
            value={friend.phoneNumber}
            onChange={(e) =>
              setFriend({ ...friend, phoneNumber: e.target.value })
            }
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <div className='flex flex-col p-2'>
          <label className=''>Notes: </label>
          <input
            type='text'
            value={friend.notes}
            onChange={(e) => setFriend({ ...friend, notes: e.target.value })}
            className='shadow-md p-2 rounded-sm'
          />
        </div>

        <button
          type='submit'
          className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'
        >
          Add Friend
        </button>
        <hr className='mb-4' />
      </form>

      <button
        onClick={() => readFriends(friend.userId)}
        className='rounded-md m-2 p-2 border shadow-sm bg-blue-200 hover:bg-blue-300'
      >
        Friends List
      </button>
      <button
        onClick={() => deleteFriend(friend.id)}
        className='rounded-md m-2 p-2 border shadow-sm bg-red-200 hover:bg-red-300'
      >
        Delete Friend
      </button>
    </div>
  );
};

export default AddFriend;
