import React, { useState } from "react";
// const OrderId = (cell) => {
//     return (
//         <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
//     );
// };
const URLType = (cell) => {
  return cell.value ? cell.value : "";
};
const URLLink = (cell) => {
  return cell.value ? <a href={`${cell.value}`} target='_blank' rel="noreferrer"> {`${cell.value}`} </a> : "";
};

const Location = (cell) => {
  return cell.value ? cell.value : "";
};

export { URLType, URLLink, Location };
