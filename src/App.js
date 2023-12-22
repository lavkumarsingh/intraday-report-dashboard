import { Button } from "antd";
import axios from "axios";
import "./App.css"

const BASE_URL = "https://api.upstox.com/v2";
const CLIENT_ID = "9891272d-18cf-4a88-a7c2-af59a5c15d01";
const REDIRECT_URI = "https://intraday-report-dashboard.vercel.app/";
function App() {
  const url = `${BASE_URL}/login/authorization/dialog?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <div className="App">
      <Button href={url}>Login</Button>
    </div>
  );
}

export default App;
