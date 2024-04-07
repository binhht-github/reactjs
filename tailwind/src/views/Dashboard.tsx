import React from "react";

function Dashboard() {
  return (
    <div>
      <h1>Dash Board</h1>
      <button className="w-16 h-6 bg-slate-100" onClick={()=>{
         console.log(localStorage);
         console.log(sessionStorage);
      }}>show log</button>
    </div>
  );
}

export default Dashboard;
<h1>Dash Board</h1>;
