import React from 'react';

const ShiftComponent = ({props}) => {
    let event=props.event
    let index = props.index

  return (
<>
  <option key={index} value={event.name}>
  {event.firstName +" "+ event.lastName}
</option>
  </>
)};

export default ShiftComponent;
