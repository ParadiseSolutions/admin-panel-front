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
    <div className="container my-2">
      <Label className="form-label">Runs</Label>
      <div className="row">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'1'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Jan</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'2'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Feb</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'3'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Mar</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'4'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Apr</Label>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'5'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">May</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'6'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Jun</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'7'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Jul</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'8'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Aug</Label>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'9'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Sep</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'10'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Oct</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'11'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Nov</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'12'} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Dec</Label>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxs;
