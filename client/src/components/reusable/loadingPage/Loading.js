import { useState, useEffect } from "react";
import ClockLoader from "react-spinners/ClockLoader";

function LoadingPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 8000)
  },[])

  
  return 
  <>
      <LoadingPage />
  </>
}

export default LoadingPage;


{/* { loading ? (
<ClockLoader 
color={#F37A24} 
loading={loading}
size={30}
/> ) : null
} */}

