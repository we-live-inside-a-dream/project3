import React from "react";

let employeeData = [
  {
    name: "Julie",
    start: "8",
    end: "4",
  },
  {
    name: "Derek",
    start: "8",
    end: "4",
  },
  {
    name: "Reza",
    start: "8",
    end: "4",
  },
  {
    name: "Brian",
    start: "8",
    end: "4",
  },
];
const EmployeeRow = ({ name, start, end, onRowSelected }) => (
  <tr>
    <td onClick={() => onRowSelected()}>{name}</td>

    {/* <MustBeLoggedIn>
import React from 'react'
import React, {useEffect, useState} from 'react';

let employeeData = [
    {
        "name": "Julie",
        "start": "15",
        "end": "4"

    },
    {
        "name": "Derek",
        "start": "8",
        "end": "4"

    },
    {
        "name": "Reza",
        "start": "9",
        "end": "4"

    },
    {
        "name": "Brian",
        "start": "12",
        "end": "4"

    }
]

const EmployeeRow = ({
    name,
    start,
    end,
    onRowSelected
}) => (
    <tr>
        <td onClick={() => onRowSelected()}>{name}</td>
        <td>{start}</td>
        <td>{end}</td>
        
        {/* <MustBeLoggedIn>
            <td>
                <ColoredBackground color="green">
                    <StyledButton
                        color="yellow"
                        onClick={() => deleteSuperhero()}
                    >
                        Delete
                    </StyledButton>
                </ColoredBackground>
            </td>
        </MustBeLoggedIn> */}
  </tr>
);

function WeekSingleEmployee() {
  return (
    <div>
      <div>
        <h2>Shift schedule</h2>
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>11</th>
              <th>12</th>
              <th>13</th>
              <th>14</th>
              <th>15</th>
              <th>16</th>
              <th>17</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((emp, index) => {
              return (
                <EmployeeRow
                  key={index}
                  // onRowSelected={() =>
                  //     selectEmployee(emp._id)
                  // }
                  name={emp.name}
                  // deleteSuperhero={() =>
                  //     deleteSuperhero(hero._id)
                  // }
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeekSingleEmployee;
