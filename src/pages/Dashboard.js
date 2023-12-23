import React, { Fragment, useEffect, useState } from "react";
import { Card, Descriptions } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Typography from "antd/es/typography/Typography";
import { getPortfolioDetails, getTradeDetails } from "../handler/apiHandler";
const { Text } = Typography;

const BASE_URL = "https://api.upstox.com/v2";

const from_date = "01-12-2023";
const to_date = "20-12-2023";
const segment = "EQ";
const financial_year = "2324";
const page_number = 1;
const page_size = 100;

function Dashboard() {
    const [trades, setTrades] = useState([]);
    const [portfolios, setPortfolios] = useState([]);

    // const profitLossHistory = () => {
    //     axios.get(`${BASE_URL}/trade/profit-loss/data?from_date=${from_date}&to_date=${to_date}&segment=${segment}&financial_year=${financial_year}&page_number=${page_number}&page_size=${page_size}`, {
    //         headers: {
    //             "Api-Version": "2.0",
    //             "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth')).access_token}`,
    //             "Accept": "application/json"
    //         }
    //     }).then(res => {
    //         const data = res.data.data;
    //         data.sort((a, b) => {
    //             function convertDate(dateString){
    //                 var p = dateString.split(/\D/g)
    //                 return [p[2],p[1],p[0] ].join("-")
    //               }
    //             return new Date(convertDate(b.buy_date)) - new Date(convertDate(a.buy_date)); // asending via date
    //         })
    //         setTrades(data);
    //     });
    // }
    useEffect(() => {
        // profitLossHistory();
        // getTradeDetails(from_date, to_date, segment, financial_year, page_number, page_size).then(trades => {
        //     console.log(trades)
        //     setTrades(trades?.data);
        // })
        // getPortfolioDetails().then(portfolio => {
        //     setPortfolios(portfolio?.data);
        // })
    }, []);
    
    useEffect(() => {
        const trade = getTradeDetails(from_date, to_date, segment, financial_year, page_number, page_size).then(res => setTrades(res.data))
        const portfolio = getPortfolioDetails().then(res => setPortfolios(res.data))
    }, []);

    return ( 
        <div className="" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5"}}>
            <div className="" style={{width: "80%"}}>
                <h3>Trades</h3>
                {
                    trades?.map((trade, i) => {
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
            <div className="" style={{ width: "80%"}}>
                <h3>Portfolio</h3>
                {
                    portfolios?.map((portfolio, i) => {
                        return <div key={i}>
                            <Card style={{width: "100%", marginBottom: 10}}>
                                <Descriptions layout="horizontal" bordered>
                                    <Descriptions.Item label="Stock">{portfolio.tradingsymbol}</Descriptions.Item>
                                    <Descriptions.Item label="Buy Date">{portfolio.buy_date}</Descriptions.Item>
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

export default Dashboard;