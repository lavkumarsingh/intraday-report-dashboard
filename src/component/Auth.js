import { Button } from "antd";
import axios from "axios";
import { useSearchParams } from 'react-router-dom'
import "./App.css"
import { useEffect, useState } from "react";

function Auth() {
  const url = `${process.env.BASE_URL}/login/authorization/dialog?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${"code"}`;
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState();

  useEffect(() => {
    const code = searchParams.get("code");
    if(code)
    axios.post(`${process.env.BASE_URL}/login/authorization/token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=${"authorization_code"}`, {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Api-Version": "2.0"
      }
    }).then(res => {
      console.log(res.data);
      setToken(res.data.access_token)
    })
  }, []);

  return <Button href={url}>Login</Button>
}

export default Auth;