import { Button } from "antd";
import Auth from "./component/Auth";

function App() {
    console.log(JSON.parse(localStorage.getItem("auth")));
    const action = <Button style={{backgroundColor: "black", padding: 0, height: "50px", width: "200px"}}>
        <img src="upstox-logo.jpeg" style={{width: "200px", height: "100%", borderRadius: 4}}/>
    </Button>
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Auth action={action}/>
        </div>
    )
}

export default App;