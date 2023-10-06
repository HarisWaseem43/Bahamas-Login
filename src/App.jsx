import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Login";
import UsersData from "./components/Users";
import NotFound from "./components/NotFoundPage";
import RefreshTokens from "./components/RefreshToken";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/userdata" element={<UsersData />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {/* Call the Refresh Token Function for New Access Token */}
      <RefreshTokens />
    </>
  );
}

export default App;

// import { useRef, useState, useEffect } from "react";

// function App() {
//   const timer1 = useRef(null);
//   const timer2 = useRef(null);
//   const [time1, setTime1] = useState(600); // 10 minutes in seconds
//   const [time2, setTime2] = useState(600); // 10 minutes in seconds

//   const startTimer = (timerRef, otherTimerRef, setTime) => {
//     clearInterval(otherTimerRef.current);
//     otherTimerRef.current = null;

//     if (!timerRef.current) {
//       timerRef.current = setInterval(() => {
//         setTime((prevTime) => {
//           if (prevTime <= 0) {
//             clearInterval(timerRef.current);
//             timerRef.current = null;
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000); // 1 second interval
//     }
//   };

//   useEffect(() => {
//     return () => {
//       clearInterval(timer1.current);
//       clearInterval(timer2.current);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <div>
//         <p>
//           Timer 1: {Math.floor(time1 / 60)}:{time1 % 60}
//         </p>
//         <button onClick={() => startTimer(timer1, timer2, setTime1)}>
//           Start Timer 1
//         </button>
//       </div>
//       <div>
//         <p>
//           Timer 2: {Math.floor(time2 / 60)}:{time2 % 60}
//         </p>
//         <button onClick={() => startTimer(timer2, timer1, setTime2)}>
//           Start Timer 2
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
