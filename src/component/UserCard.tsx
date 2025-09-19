type User = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  about: string;
  interests: string[];
};

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={user.profilePicture}
          alt={`${user.firstName} ${user.lastName}`}
        />
      </figure>
      <div className="card-body">
        {user &&(<h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>)}
         {user &&(<p>{user.about}</p>
            )}
        <div className="mb-2">
          <span className="font-semibold">Interests:</span>
          <ul className="list-disc ml-5">
            {user &&(user.interests.map((interest, idx) => (
              <li key={idx}>{interest}</li>
            )))}
          </ul>
        </div>
        <div className="card-actions justify-end">
             <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;