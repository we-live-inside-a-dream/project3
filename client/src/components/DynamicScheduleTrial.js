import React, { useEffect, useState } from "react";

let employeeData = [
  {
    name: "Julie",
    start: 8,
    end: 16,
  },
  {
    name: "Derek",
    start: 9,
    end: 17,
  },
  {
    name: "Reza",
    start: 10,
    end: 18,
  },
  {
    name: "Brian",
    start: 11,
    end: 18,
  },
];

function DynamicScheduleTrial() {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      let fetchResult = await fetch('/api/schedule/'+superheroId)
      let fetchedHero = await fetchResult.json()
      setHero(fetchedHero)
    }
    fetchSuperhero()
  }, [superheroId])
  console.log(hero)

  let startTime = 8;
  let endTime = 18;
  let businessHours = [];
  for (let i = startTime; i < endTime; i += 0.25) businessHours.push(i);
  console.log(businessHours);

  return (
    <div className="container">
      <h1>Employee One Day Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            {businessHours.map((hour) => {
              if (hour === Math.floor(hour)) {
                return <th>{hour}:00</th>;
              } else if (hour - 0.5 === Math.floor(hour)) {
                return <th>{hour - 0.5}:30</th>;
              } else return <th>|</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.name}>
              <td>{employee.name}</td>
              {businessHours.map((hour) => {
                if (hour >= employee.start && hour < employee.end) {
                  return <td style={{ backgroundColor: "blue" }}></td>;
                } else {
                  return <td></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="date"
        id="date"
        name="day-view"
        value={(e) => e.target.value}
      />
    </div>
  );
}
export default DynamicScheduleTrial;
