import React from 'react';
import ConnectionCard from './ConnectionCard';
import { useSelector } from 'react-redux';

const Connection: React.FC = () => {
    const connections:any = useSelector((state: any) => state.feed);//useSelector((state: any) => state.user);

 
	return (
        <div className="min-h-screen bg-base-200 p-8">
    <h3 className="text-2xl font-bold mb-6">Connection Page</h3>
    <div className="flex flex-block flex-wrap gap-8 justify-center">
        {/* {user && (<ConnectionCard connection={user} />)} */}
      {connections && connections.length > 0 ? (
        connections.map((conn:any, idx:number) => (
          <ConnectionCard key={idx} connection={conn} />
        ))
      ) : (
        <span className="text-lg text-gray-500">No connections found.</span>
      )}
    </div>
  </div>
	);
};

export default Connection;