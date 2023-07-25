import { useState } from "react";

function App() {
  const [data, setData] = useState(1);
  const handleClickButton = () => {
    fetch(
      `${window.location.protocol}//${process.env.REACT_APP_IP}/api/getnumber`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.number);
      });
  };
  return (
    <div className="App">
      <div>받은 번호 : {data}</div>
      <button onClick={handleClickButton}>getData</button>
    </div>
  );
}

export default App;
