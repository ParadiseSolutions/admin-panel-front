import React, { useEffect, useState } from "react";
import {
  Label,
  Input,
} from "reactstrap";

const CheckBoxs = ({onAddDay, scheduleEditID}) => {

//initial checked
const [initialRun, setInitialRun] = useState(null)
const [monChecked, setMonChecked] = useState(false)
const [tueChecked, setTueChecked] = useState(false)
const [wenChecked, setWenChecked] = useState(false)
const [thuChecked, setThuChecked] = useState(false)
const [friChecked, setFriChecked] = useState(false)
const [satChecked, setSatChecked] = useState(false)
const [sunChecked, setSunChecked] = useState(false)
const [dailyChecked, setDailyChecked] = useState(false)

useEffect(() => {
  if (scheduleEditID) {
    setInitialRun(scheduleEditID.runs)
  }
}, [scheduleEditID]);

useEffect(() => {
  if (initialRun) {
    
    setMonChecked(initialRun.includes(1) ? true : false)
    setTueChecked(initialRun.includes(2) ? true : false)
    setWenChecked(initialRun.includes(3) ? true : false)
    setThuChecked(initialRun.includes(4) ? true : false)
    setFriChecked(initialRun.includes(5) ? true : false)
    setSatChecked(initialRun.includes(6) ? true : false)
    setSunChecked(initialRun.includes(0) ? true : false)
    setDailyChecked(initialRun.includes(8) ? true : false)
  }
}, [initialRun]);

const onClickDay = (day) =>{
  onAddDay(day)
  //   console.log(day)
  //  if (day === 1) {
  //   setMondayChecked(!mondayChecked)
  //   onAddDay('monday')
  //  }
}
  return (
    <div className="border-bottom border-dark pb-4 my-3">
      <Label className="form-label mb-3">Runs</Label>
      <div className="row">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={1} checked={monChecked} onChange={(e) => {
            onClickDay(e.target.value)
            setMonChecked(!monChecked)
            }} />
          <Label className="form-label">Monday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={2} checked={tueChecked} onChange={(e) => {
            onClickDay(e.target.value)
            setTueChecked(!tueChecked)
            }} />
          <Label className="form-label">Tuesday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={3} checked={wenChecked} onChange={(e) => {
            onClickDay(e.target.value)
            setWenChecked(!wenChecked)
            }} />
          <Label className="form-label">Wednesday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={4} checked={thuChecked} onChange={(e) => {
            onClickDay(e.target.value)
            setThuChecked(!thuChecked)
            }} />
          <Label className="form-label">Thursday</Label>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={5} checked={friChecked} onChange={(e) => {
            setFriChecked(!friChecked)
            onClickDay(e.target.value)}} />
          <Label className="form-label">Friday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={6} checked={satChecked} onChange={(e) => {
            setSatChecked(!satChecked)
            onClickDay(e.target.value)}} />
          <Label className="form-label">Saturday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={0} checked={sunChecked} onChange={(e) => {
            setSunChecked(!sunChecked)
            onClickDay(e.target.value)}} />
          <Label className="form-label">Sunday</Label>
        </div>
        <div className="col d-flex">
          <Input type="checkbox" className="mx-2" value={7} checked={dailyChecked} onChange={(e) => {
            setDailyChecked(!dailyChecked)
            onClickDay(e.target.value)}} />
          <Label className="form-label">Daily</Label>
        </div>
      </div>
    </div>
  );
};

export default CheckBoxs;
