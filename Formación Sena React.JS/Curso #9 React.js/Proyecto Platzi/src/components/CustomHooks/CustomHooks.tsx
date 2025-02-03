import { useState } from "react";

type UserProps = {
  name: string;
}

function useLoading(initialLoading: boolean = false) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  return {
    isLoading,
    setIsLoading
  };

}



const UserComponent: React.FC<UserProps> = ({ name }) => {
  const { isLoading, setIsLoading } = useLoading(false);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <p>Hello,{name}</p>
      <button onClick={() => setIsLoading(true)}>Simulate Loading</button>
    </div>
  );
};

export const ParentComponent = () => {
  return <UserComponent name="Hosmmer Pinto" />;
};
