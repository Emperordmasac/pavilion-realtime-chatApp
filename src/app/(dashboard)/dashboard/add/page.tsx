import AddFriendButton from "@/components/add-friend-button";
import * as React from "react";

const AddFriendPage: React.FC = () => {
  return (
    <main className=" container pt-8">
      <h1 className="text-5xl font-bold mb-8">Add a Friend</h1>

      <AddFriendButton />
    </main>
  );
};

export default AddFriendPage;
