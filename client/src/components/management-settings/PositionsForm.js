import React, { useState, useEffect } from "react";
import StyledButton from "../reusable/Inputs/StyledButton";
import { StyledInput } from "../reusable/Inputs/StyledEmployeeForm";

function PositionsForm({
  value,
  setValue,
  setPositionList,
  positionList,
  existingValues,
  idToEdit,
  setIdToEdit,
  label,
  setLabel,
}) {
  useEffect(() => {
    if (existingValues) {
      setLabel(existingValues.label);
      setValue(existingValues.value);
    }
  }, [existingValues, setValue, setLabel]);

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

  async function updatePosition(positionData) {
    console.log("FROM UPDATE FUNCTION", positionData);
    let newPositionData = await fetch(`/api/positions/update?id=${idToEdit}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(positionData),
    });
    let theUpdatedPosition = await newPositionData.json();
    console.log(
      "FROM AFTER UPDATE FETCH new position data,",
      theUpdatedPosition
    );
    let newPositionArray = positionList.map((position) => {
      if (position._id !== theUpdatedPosition._id) {
        return position;
      } else {
        return theUpdatedPosition;
      }
    });
    setPositionList(newPositionArray);
    setIdToEdit("");
  }

  function formatPositionValue(string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  async function postData() {
    let camelCaseValue = await formatPositionValue(label);
    let positionData = {
      label: label,
      value: camelCaseValue,
    };
    console.log("creating newPosition: ", positionData);
    if (!existingValues) {
      await createNewPosition(positionData);
    } else if (existingValues) {
      await updatePosition(positionData);
    }
    setLabel("");
  }
  return (
    <div>
      {" "}
      <div style={{ width: "300px", margin: "auto" }}>
        <label style={{ margin: "0px" }}>
          Position to Add:
          <StyledInput
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
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

export default PositionsForm;
