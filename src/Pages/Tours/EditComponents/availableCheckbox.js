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
    let idsTemp = []
    
    

    if ( availableFromIDs ) {
      
      availableFromIDs.forEach(id => {
        if (id !== selection) {
          idsTemp.push( ...availableFromIDs, selection)
        }else{
          idsTemp = availableFromIDs.filter((ele) => ele !== selection)
        }

      });

      // console.log('ids a enviar', idsTemp)
      
      // setNewListID(idsTemp);
      setAvailableFromIDs(idsTemp)
    }else{
      // setNewListID([selection])
      setAvailableFromIDs([selection])
    }
    // if (selectionFlag) {
    //   console.log('si esta', availableFromIDs)
    //   setAvailableFromIDs(availableFromIDs.filter((ele) => ele !== selection));
    // }
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
