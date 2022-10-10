import React, { useState } from "react";
import {
  Label,
  Input,
} from "reactstrap";

const CheckBoxs = ({onAddDay}) => {

//initial checked
const [mondayChecked, setMondayChecked] = useState(false)
const onClickDay = (day) =>{
  onAddDay(day)
  //   console.log(day)
  //  if (day === 1) {
  //   setMondayChecked(!mondayChecked)
  //   onAddDay('monday')
  //  }
}
  return (
    <div className="container">
      <Label className="form-label">Runs</Label>
      <div className="row">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={1} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Monday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={2} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Tuesday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={3} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Wednesday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={4} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Thursday</Label>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={5} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Friday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={6} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Saturday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={0} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Sunday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={7} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Daily</Label>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxs;
