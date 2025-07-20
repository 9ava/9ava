import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const UserProfile: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Error: UserContext not available</div>;
  }

  const { user, setUser, loadUserData } = userContext;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, age: e.target.value });
  };

  return (
    <div className="p-4 m-4 border border-green-300">
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <div>
        <label>New Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={handleNameChange}
          className="p-1 border border-gray-300"
        />
      </div>
      <div>
        <label>New Age:</label>
        <input
          type="text"
          value={user.age}
          onChange={handleAgeChange}
          className="p-1 border border-gray-300"
        />
      </div>
      <button
        onClick={loadUserData}
        className="p-2 mt-2 text-white bg-blue-500 rounded"
      >
        정보 변경
      </button>
    </div>
  );
};

export default UserProfile;
