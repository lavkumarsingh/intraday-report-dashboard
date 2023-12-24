import React, { Fragment, useEffect, useState } from "react";
import { Card, Descriptions, Typography, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { getPortfolioDetails, getTradeDetails } from "../utils/apiHandler";
import { useNavigate } from "react-router";
const { Text } = Typography;

const BASE_URL = "https://api.upstox.com/v2";

const from_date = "01-12-2023";
const to_date = "20-12-2023";
const segment = "EQ";
const financial_year = "2324";
const page_number = 1;
const page_size = 100;

function Trades() {
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState([]);
    const [totalCapital, setTotalCapital] = useState(0);
    const [pnl, setPnl] = useState(0);
    const [gains, setGains] = useState(0);
    
    useEffect(() => {
        getPortfolioDetails().then(res => {
            if(res.data)
            setPortfolios(res.data)
            if(res.status == 401)
            navigate("/");

            let total = 0;
            let pnl = 0;
            res.data.map(e => {
                total += e.average_price*e.quantity
                pnl += e.pnl
            });
            setTotalCapital(total);
            setPnl(pnl);
            setGains(parseFloat((pnl/total)*100).toFixed(2))
        })
    }, []);


    return ( 
        <div className="" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5", padding: 10}}>
            <div className="" style={{ width: "100%"}}>
                <h3>Holdings</h3>

                <Typography>Total Investment: {totalCapital}</Typography>
                <Typography>P&L: {pnl}</Typography>
                <Text type={gains ? "success" : "danger"}>{gains} {gains > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}</Text>
                {
                    portfolios?.map((portfolio, i) => {
                        return <div key={i}>
                            <Card style={{width: "100%", marginBottom: 10}}>
                                <Descriptions layout="horizontal" bordered>
                                    <Descriptions.Item label="Stock">{portfolio.tradingsymbol}</Descriptions.Item>
                                    <Descriptions.Item label="Quantity">{portfolio.quantity}</Descriptions.Item>
                                    <Descriptions.Item label="Avg. Buy Price">{portfolio.average_price}</Descriptions.Item>
                                    <Descriptions.Item label="P&L"><p style={{color: portfolio.pnl > 0 ? "green" : "red"}}>{parseFloat(portfolio.pnl).toFixed(2)} {portfolio.pnl > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} </p></Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
     );
}

export default Trades;