import { useEffect, useState } from "react";

const AvailableCheckbox = ({ available, availableFromIDs,  setAvailableFromIDs }) => {

 
  const isChecked = availableFromIDs ?  availableFromIDs.includes(available.id) ? true : false : false;

  const [checked, setChecked] = useState(
   availableFromIDs ? availableFromIDs.includes(available.id) ? true : false : false
  );

  useEffect(() => {
    if ( availableFromIDs && availableFromIDs.length > 0) {
      setChecked(availableFromIDs.includes(available.id.toString()) ? true : false);
    }
  }, [isChecked]);

  const onChangeMembers = (e) => {
    setChecked(!checked);
    
    const selection = e.target.value;
    // const selectionFlag = availableFromIDs ? availableFromIDs.includes(selection) : [];
    // console.log('---------------',availableFromIDs)
    let idsTemp = availableFromIDs
    
    let isSelected = !checked

    if(availableFromIDs) {
      if(availableFromIDs.filter((ele) => ele === selection).length > 0) {//check if exists
        //if exists and is not selected anymore I need to remove it
        if(!isSelected) {
          idsTemp = availableFromIDs.filter((ele) => ele !== selection)
        }
      } else {
        //if not exists and is selected anymore I need to remove it
        if(isSelected) {
          idsTemp.push(selection)
        }
      }
    }else{
      if(isSelected)
        idsTemp = [selection]
      else 
        idsTemp = []
    }

    setAvailableFromIDs(idsTemp)
  };
  return (
    <div className="controls my-2">
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
