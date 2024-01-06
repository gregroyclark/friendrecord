import { useEffect, useState } from 'react';

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`/friends/${userId}`);
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('Error reading all friends: ', error);
      }
    };

    fetchFriends();
  });
  return (
    <div>
      {friends.map((friend) => (
        <div key={friend.id}>
          <h2>
            {friend.firstName} {friend.lastName}
          </h2>
          <p>{friend.email}</p>
          <p>{friend.phoneNumber}</p>
          <p>{friend.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
