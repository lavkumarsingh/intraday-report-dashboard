import React, { Fragment, useEffect, useState } from "react";
import { Card, Descriptions, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { getPortfolioDetails, getTradeDetails } from "../utils/apiHandler";
import Typography from "antd/es/typography/Typography";
import { useNavigate } from "react-router";
const { Text } = Typography;

const BASE_URL = "https://api.upstox.com/v2";

const from_date = "01-12-2023";
const to_date = "20-12-2023";
const segment = "EQ";
const financial_year = "2324";
const page_number = 1;
const page_size = 100;

function Intraday() {
    const navigate = useNavigate();
    const [intradayTrades, setIntradayTrades] = useState([]);
    const [deliveryTrades, setDeliveryTrades] = useState([]);
    
    useEffect(() => {
        getTradeDetails(from_date, to_date, segment, financial_year, page_number, page_size).then(res => {
            if(res.data)
            setIntradayTrades(res.data.intraday);
            setDeliveryTrades(res.data.delivery);
            if(res.status == 401)
            navigate("/");
        })
    }, []);

    return ( 
        <div style={{ padding: 10 }}>
            
            <div style={{width: "100%"}}>
                <h3>Intraday trades</h3>
                {
                    intradayTrades?.map((trade, i) => {
                        return <div key={i}>
                            <Card style={{width: "100%", marginBottom: 10}}>
                                <Descriptions layout="horizontal" bordered>
                                    <Descriptions.Item label="Stock">{trade.scrip_name}</Descriptions.Item>
                                    <Descriptions.Item label="Buy Date">{trade.buy_date}</Descriptions.Item>
                                    <Descriptions.Item label="Sell Date">{trade.sell_date}</Descriptions.Item>
                                    <Descriptions.Item label="Quantity">{trade.quantity}</Descriptions.Item>
                                    <Descriptions.Item label="Avg. Buy Price">{trade.buy_average}</Descriptions.Item>
                                    <Descriptions.Item label="Avg. Sell Price">{trade.sell_average}</Descriptions.Item>
                                    <Descriptions.Item label="P&L"><p style={{ color: trade.sell_amount - trade.buy_amount > 0 ? "green" : "red"}}>{parseFloat(trade.sell_amount - trade.buy_amount).toFixed(2)} {trade.sell_amount - trade.buy_amount > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} </p></Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </div>
                    })
                }
                </div>
                
                <div style={{width: "100%"}}>
                <h3>Dilevery trades</h3>
                {
                    deliveryTrades?.map((trade, i) => {
                        return <div key={i}>
                            <Card style={{width: "100%", marginBottom: 10}}>
                                <Descriptions layout="horizontal" bordered>
                                    <Descriptions.Item label="Stock">{trade.scrip_name}</Descriptions.Item>
                                    <Descriptions.Item label="Buy Date">{trade.buy_date}</Descriptions.Item>
                                    <Descriptions.Item label="Sell Date">{trade.sell_date}</Descriptions.Item>
                                    <Descriptions.Item label="Quantity">{trade.quantity}</Descriptions.Item>
                                    <Descriptions.Item label="Avg. Buy Price">{trade.buy_average}</Descriptions.Item>
                                    <Descriptions.Item label="Avg. Sell Price">{trade.sell_average}</Descriptions.Item>
                                    <Descriptions.Item label="P&L"><p style={{ color: trade.sell_amount - trade.buy_amount > 0 ? "green" : "red"}}>{parseFloat(trade.sell_amount - trade.buy_amount).toFixed(2)} {trade.sell_amount - trade.buy_amount > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} </p></Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
     );
}

export default Intraday;