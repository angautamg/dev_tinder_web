import React from "react";

type Connection = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  about: string;
  interests: string[];
  location: { coordinates: [number, number] };
  profilePicture: string;
};

interface ConnectionCardProps {
  connection: Connection;
}

const ConnectionCard = ({ connection }: ConnectionCardProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center bg-base-100 rounded-xl shadow hover:bg-base-200 transition-colors px-4 py-3 mb-2">
        <div className="avatar mr-4">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={connection.profilePicture} alt={`${connection.firstName} ${connection.lastName}`} />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-7 gap-4 items-center">
          <div className="font-bold text-primary">{connection.firstName} {connection.lastName}</div>
          <div>
            <span className="badge badge-outline badge-secondary">{connection.gender}</span>
          </div>
          <div className="text-sm text-gray-500">{connection.email}</div>
          <div className="truncate">{connection.about}</div>
          <div className="flex flex-wrap gap-1">
            {connection.interests.map((interest, idx) => (
              <span key={idx} className="badge badge-accent">{interest}</span>
            ))}
          </div>
          <div className="text-xs text-gray-400">
            Lon: {connection.location.coordinates[0]}, Lat: {connection.location.coordinates[1]}
          </div>
          <div className="flex gap-2 justify-end">
            <button className="btn btn-primary btn-sm">Message</button>
            <button className="btn btn-secondary btn-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;