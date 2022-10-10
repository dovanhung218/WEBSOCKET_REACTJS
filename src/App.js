import logo from "./logo.svg";
import "./App.css";
import { w3cwebsocket } from "websocket";
import { useEffect } from "react";
import { message } from "antd";

const client = new w3cwebsocket("ws:localhost:8000");
function App() {
  const onClicked = (value) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
      })
    );
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("Websocket Client connected");
    };
    client.onmessage =(message) =>{
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ",dataFromServer);
    }
  }, []);
console.log('rerender');
  return (
    <div className="App">
      <button onClick={() => onClicked("Hello!")}>send message</button>
    </div>
  );
}

export default App;
