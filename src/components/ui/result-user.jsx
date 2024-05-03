import React from "react";
import { Check } from "lucide-react";

function ResultUser({ user, set, setSelectedUsers, setResultSet, isUserSame }) {
  return (
    <div
      onClick={() => {
        if (isUserSame) {
          return;
        }

        if (!set.has(user.id)) {
          setSelectedUsers((prev) => {
            return [...prev, user];
          });

          setResultSet((prev) => {
            return prev.filter((u) => {
              return user.id != u.id;
            });
          });

          set.add(user.id);
        }
      }}
      className="flex cursor-pointer items-center justify-between rounded-sm p-2"
    >
      <div className="text-xs">{user.userName}</div>
      {set.has(user.id) && <span className="text-xs">selected</span>}
      {isUserSame && <span className="text-xs">You</span>}
    </div>
  );
}

export default ResultUser;
