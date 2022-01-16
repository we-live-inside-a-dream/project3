import React from "react";
import { useState } from "react";


function EditSchedule({onClose}) {
  const [name, setName] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [date, setDate] = useState();

  async function updateShift(updatedUser) {
    console.log("Posting to user", name, "with data", updatedUser);
    await fetch("/api/schedule/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
  }

  function onInputUpdate(event, setter) {
    let newValue = event.target.value;
    setter(newValue);
  }

  async function postData() {
    let newShift = {
      name,
      start,
      end,
      date
    };
    console.log("Saving volunteer", newShift);
    await updateShift(newShift);
  }
  return (
    <div>
      <div>
        <label>name</label>
        <input
          value={name}
          onChange={(event) => onInputUpdate(event, setName)}
        />
      </div>

      <div>
        <label>start:24h</label>
        <input
          value={start}
          onChange={(event) => onInputUpdate(event, setStart)}
        />
      </div>

      <div>
        <label>end:24h</label>
        <input
          value={end}
          onChange={(event) => onInputUpdate(event, setEnd)}
        />
      </div>

      <div>
        <label>date: yyyy-mm-dd</label>
        <input
          value={date}
          onChange={(event) => onInputUpdate(event, setDate)}
        />
      </div>




      <button onClick={postData&&onClose}>Save Shift</button>
    </div>
  );
}

export default EditSchedule;
