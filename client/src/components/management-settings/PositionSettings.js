import React, { useState, useEffect } from "react";
import StyledEditButton from "../reusable/Inputs/StyledEditButton";
import {
  StyledButton,
  StyledInput,
  StyledForm,
} from "../reusable/Inputs/StyledEmployeeForm";
import StyledTable from "../reusable/tables/StyledTable";

function PositionSettings() {
  const [position, setPosition] = useState();
  const [positionValue, setPositionValue] = useState();
  const [positionList, setPositionList] = useState([]);

  useEffect(() => {
    async function getPositionList() {
      let fetchedResult = await fetch("/api/positions/get-all");
      let fetchedPositions = await fetchedResult.json();
      setPositionList(fetchedPositions);
    }
    getPositionList();
  }, []);

  async function createNewPosition(positionData) {
    let response = await fetch("/api/positions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(positionData),
    });
    let newPosition = await response.json();
    console.log("the new position is,", newPosition);
    setPositionList((curr) => [...curr, newPosition]);
  }

  function formatPositionValue(string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  async function postData() {
    let camelCaseValue = await formatPositionValue(position);

    let positionData = {
      label: position,
      value: camelCaseValue,
    };
    console.log("creating newPosition: ", positionData);
    await createNewPosition(positionData);
    setPosition("");
  }

  return (
    <div>
      <div style={{ justifyContent: "left" }}>
        <StyledTable>
          <thead>
            <tr style={{ height: "40px" }}>
              <th>Position</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {positionList?.map((position) => {
              return (
                <tr key={position._id} style={{ height: "30px" }}>
                  <td>{position.label}</td>
                  <td>
                    <div>
                      <StyledEditButton style={{ margin: "0px 15px" }}>
                        E
                      </StyledEditButton>
                      <StyledEditButton style={{ margin: "0px 15px" }}>
                        X
                      </StyledEditButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </div>
      <div style={{ width: "300px", margin: "auto" }}>
        <label style={{ margin: "0px" }}>
          Position to Add:
          <StyledInput
            type="text"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            style={{ width: "200px", margin: "0px" }}
          />
          <StyledButton
            onClick={() => {
              postData();
            }}
            style={{ height: "40px", margin: "0px 10px" }}
          >
            +
          </StyledButton>
        </label>
      </div>
    </div>
  );
}

export default PositionSettings;
