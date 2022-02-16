import React, { useState, useEffect } from "react";

function ApprovalSymbol({ time }) {
  const [theSymbol, setTheSymbol] = useState(null);

  useEffect(() => {
    let findTheSymbol = function () {
      if (time.status === "pending") {
        setTheSymbol("⏳");
      } else if (time.status === "approved") {
        setTheSymbol("✅");
      } else {
        setTheSymbol("❌");
      }
    };
    findTheSymbol();
  }, [time]);

  return <div>{theSymbol}</div>;
}

export default ApprovalSymbol;
