import { useState, useEffect } from "react";

const PermissionsChecked = ({ perm, permsIds, setPermsIds }) => {

  const isChecked = permsIds.includes(perm) ? true : false;

  // console.log(permsIds)

  const [checked, setChecked] = useState(
    permsIds.includes(perm) ? true : false
  );

  useEffect(() => {
    if (permsIds.length > 0) {
      
      setChecked(permsIds.includes(perm.id) ? true : false);
    }
  }, [permsIds, perm]);

  const onChangeModules = (e) => {
    setChecked(!checked);
    const selection = parseInt(e.target.value);
    const selectionFlag = permsIds.includes(selection);

    if (!selectionFlag) {
      setPermsIds([...permsIds, e.target.value]);
    }
    if (selectionFlag) {
      setPermsIds(permsIds.filter((ele) => ele !== selection));
    }
  };

  return (
    <div className="controls my-4 px-5">
      <div className="form-check px-5">
        <input
          className="form-check-input"
          type="checkbox"
          value={perm.id}
          name={perm.name}
          onChange={(e) => onChangeModules(e)}
          checked={checked}
        />
        <label className="form-check-label">{`${perm.name}`}</label>
      </div>
    </div>
  );
};

export default PermissionsChecked;
