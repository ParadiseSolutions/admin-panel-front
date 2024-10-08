import { useEffect, useState } from "react";

const MembersChecked = ({ user, membersIds, setMembersIds }) => {
  const isChecked = membersIds.includes(user.id) ? true : false;

  const [checked, setChecked] = useState(
    membersIds.includes(user.id) ? true : false
  );

  useEffect(() => {
    if (membersIds.length > 0) {
      setChecked(membersIds.includes(user.id) ? true : false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const onChangeMembers = (e) => {
    setChecked(!checked);
    // console.log(checked);
    const selection = Number(e.target.value);
    const selectionFlag = membersIds.includes(selection);

    // console.log(typeof selection);
    if (!selectionFlag) {
      setMembersIds([...membersIds, e.target.value]);
    }
    if (selectionFlag) {
      setMembersIds(membersIds.filter((ele) => ele !== selection));
    }
  };
  return (
    <div className="controls my-2 mx-5 px-5">
      <div className="form-check px-5">
        <input
          className="form-check-input"
          type="checkbox"
          value={+user.id}
          name={user.name}
          onChange={(e) => onChangeMembers(e)}
          checked={checked}
        />
        <label className="form-check-label">
          {`${user.first_name} ${user.last_name}`}
        </label>
      </div>
    </div>
  );
};

export default MembersChecked;
