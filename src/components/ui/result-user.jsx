import React from "react";
import { Check } from "lucide-react";

function ResultUser({ user, set, setSelectedUsers, setResultSet, isUserSame, roomType }) {
  return (
    <div
      onClick={() => {
        if (isUserSame) {
          return;
        }

        if (!set.has(user.id)) {

          if (roomType == 'group') {
            setSelectedUsers((prev) => {
              return [...prev, user];
            });

          } else {
            set.clear();
            setSelectedUsers(() => {
              return [user];
            });

          }
          set.add(user.id);

          setResultSet((prev) => {
            return prev.filter((u) => {
              return user.id != u.id;
            });
          });

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
