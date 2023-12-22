import { Button, Typography } from "antd";
import Auth from "./Auth";

function Login() {
    return ( 
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <Auth 
            action={<Button style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 0, width: 250, height: 70, borderRadius: 4}}>
            <img src="upstox-logo.jpeg" style={{height: 30, width: 250, height: 70, borderRadius: 4}} />
            </Button>} 
        />
    </div> );
}

export default Login;