import React, { useState } from "react";
import { useEffect } from "react";
import {
  Label,
  Input,
} from "reactstrap";

const CheckBoxs = ({onAddDay, editOverriteDateData}) => {

//initial checked
const [janChecked, setJanChecked] = useState(false)
const [febChecked, setfebChecked] = useState(false)
const [marChecked, setmarChecked] = useState(false)
const [aprChecked, setaprChecked] = useState(false)
const [mayChecked, setmayChecked] = useState(false)
const [junChecked, setjunChecked] = useState(false)
const [julChecked, setjulChecked] = useState(false)
const [augChecked, setaugChecked] = useState(false)
const [sepChecked, setsepChecked] = useState(false)
const [octChecked, setoctChecked] = useState(false)
const [novChecked, setnovChecked] = useState(false)
const [dicChecked, setdicChecked] = useState(false)
const onClickDay = (day) =>{
  onAddDay(day)
    
  switch (day) {
    case day === '1':
      setJanChecked(!janChecked)
      break;
    case day === '2':
      setfebChecked(!febChecked)
      break;
    case day === '3':
      setmarChecked(!marChecked)
      break;
    case day === '4':
      setaprChecked(!aprChecked)
      break;
    case day === '5':
      setmayChecked(!mayChecked)
      break;
    case day === '6':
      setjunChecked(!junChecked)
      break;
    case day === '7':
      setjulChecked(!julChecked)
      break;
    case day === '8':
      setaugChecked(!augChecked)
      break;
    case day === '9':
      setsepChecked(!sepChecked)
      break;
    case day === '10':
      setoctChecked(!octChecked)
      break;
    case day === '11':
      setnovChecked(!novChecked)
      break;
    case day === '12':
      setdicChecked(!dicChecked)
      break;
  
    default:
      break;
  }
}
useEffect(() =>{
  if (editOverriteDateData) {
    setJanChecked(editOverriteDateData?.on.includes('1') ? true : false)
    setfebChecked(editOverriteDateData?.on.includes('2') ? true : false)
    setmarChecked(editOverriteDateData?.on.includes('3') ? true : false)
    setaprChecked(editOverriteDateData?.on.includes('4') ? true : false)
    setmayChecked(editOverriteDateData?.on.includes('5') ? true : false)
    setjunChecked(editOverriteDateData?.on.includes('6') ? true : false)
    setjulChecked(editOverriteDateData?.on.includes('7') ? true : false)
    setaugChecked(editOverriteDateData?.on.includes('8') ? true : false)
    setsepChecked(editOverriteDateData?.on.includes('9') ? true : false)
    setoctChecked(editOverriteDateData?.on.includes('10') ? true : false)
    setnovChecked(editOverriteDateData?.on.includes('11') ? true : false)
    setdicChecked(editOverriteDateData?.on.includes('12') ? true : false)
  }
},[editOverriteDateData])
  return (
    <div className="container my-2">
      <Label className="form-label">Runs</Label>
      <div className="row">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'1'} checked={janChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Jan</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'2'} checked={febChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Feb</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'3'} checked={marChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Mar</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'4'} checked={aprChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Apr</Label> 
        </div>
      </div>
      <div className="row mt-3">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'5'} checked={mayChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">May</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'6'} checked={junChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Jun</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'7'} checked={julChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Jul</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'8'} checked={augChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Aug</Label>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'9'} checked={sepChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Sep</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'10'} checked={octChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Oct</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'11'} checked={novChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Nov</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={'12'} checked={dicChecked} onChange={(e) => onClickDay(e.target.value)} />
          <Label className="form-label">Dec</Label>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxs;
