import { useEffect, useState } from "react";

const AvailableCheckbox = ({ available, availableFromIDs,  setAvailableFromIDs }) => {
 
  const isChecked = availableFromIDs.includes(available.id) ? true : false;

  const [checked, setChecked] = useState(
    availableFromIDs.includes(available.id) ? true : false
  );

  useEffect(() => {
    if (availableFromIDs.length > 0) {
      setChecked(availableFromIDs.includes(available.id.toString()) ? true : false);
    }
  }, [isChecked]);

  const onChangeMembers = (e) => {
    setChecked(!checked);
    console.log(checked);
    const selection = e.target.value;
    const selectionFlag = availableFromIDs.includes(selection);

    
    if (!selectionFlag) {
      setAvailableFromIDs([...availableFromIDs, e.target.value]);
    }
    if (selectionFlag) {
      setAvailableFromIDs(availableFromIDs.filter((ele) => ele !== selection));
    }
  };
  return (
    <div className="controls my-4">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={+available.id}
          name={available.name}
          onChange={(e) => onChangeMembers(e)}
          checked={checked}
        />
        <label className="form-check-label">
          {`${available.name}` }
        </label>
      </div>
    </div>
  );
};

export default AvailableCheckbox;
