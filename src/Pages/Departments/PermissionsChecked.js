import { useState, useEffect } from "react";

const PermissionsChecked = ({ module, permsId, setPermsIds }) => {

  const isChecked = permsId.includes(module.id) ? true : false;

  const [checked, setChecked] = useState(
    permsId.includes(module.id) ? true : false
  );

  useEffect(() => {
    if (permsId.length > 0) {
      
      setChecked(permsId.includes(module.id) ? true : false);
    }
  }, [isChecked]);
  const onChangeModules = (e) => {
    setChecked(!checked);
    const selection = parseInt(e.target.value);
    const selectionFlag = permsId.includes(selection);

    if (!selectionFlag) {
      setPermsIds([...permsId, e.target.value]);
    }
    if (selectionFlag) {
      setPermsIds(permsId.filter((ele) => ele !== selection));
    }
  };

  return (
    <div className="controls my-4">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={module.id}
          name={module.name}
          onChange={(e) => onChangeModules(e)}
          checked={checked}
        />
        <label className="form-check-label">{`${module.name}`}</label>
      </div>
    </div>
  );
};

export default PermissionsChecked;
