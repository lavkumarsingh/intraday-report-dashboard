import React, { Fragment, useEffect, useState } from "react";
import { Card, Descriptions, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { getChargesDetails, getPortfolioDetails, getTradeDetails } from "../utils/apiHandler";
import Typography from "antd/es/typography/Typography";
import { useNavigate } from "react-router";
const { Text } = Typography;

function Dashboard() {
    const navigate = useNavigate();
    const [charges, setCharges] = useState({});
    
    useEffect(() => {
        getChargesDetails().then(res => {
            if(res.status)
                navigate("/");
            if(res.data)
                setCharges(res.data.charges_breakdown)
            console.log(res.data.charges_breakdown)
        })
    }, []);

    return ( 
        <div className="" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 10}}>
            <p>Total charges: {charges.total}</p>
        </div>
     );
}

export default Dashboard;