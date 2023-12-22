import { Button } from "antd";
import axios from "axios";
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

// .env constants
const BASE_URL = "https://api.upstox.com/v2"
const REDIRECT_URI = "https://upstox-report.vercel.app/"
const CLIENT_ID = "9891272d-18cf-4a88-a7c2-af59a5c15d01"
const CLIENT_SECRET = "x87gssludi"

function Auth(props) {
  const url = `${BASE_URL}/login/authorization/dialog?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${"code"}`;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState();

  useEffect(() => {
    const code = searchParams.get("code");
    if(code)
    axios.post(`${BASE_URL}/login/authorization/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=${"authorization_code"}`, {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Api-Version": "2.0"
      }
    }).then(res => {
      console.log(res.data);
      setToken(res.data.access_token)
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/dashboard");
    })
  }, []);

  return <a href={url}>{props.action}</a>
}

export default Auth;