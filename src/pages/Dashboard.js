import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Card, Descriptions } from "antd";
import Typography from "antd/es/typography/Typography";
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

    const profitLossHistory = () => {
        axios.get(`${BASE_URL}/trade/profit-loss/data?from_date=${from_date}&to_date=${to_date}&segment=${segment}&financial_year=${financial_year}&page_number=${page_number}&page_size=${page_size}`, {
            headers: {
                "Api-Version": "2.0",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth')).access_token}`,
                "Accept": "application/json"
            }
        }).then(res => {
            const data = res.data.data;
            data.sort((a, b) => {
                function convertDate(dateString){
                    var p = dateString.split(/\D/g)
                    return [p[2],p[1],p[0] ].join("-")
                  }
                return new Date(convertDate(b.buy_date)) - new Date(convertDate(a.buy_date)); // asending via date
            })
            setTrades(data);
        });
    }

    useEffect(() => {
        profitLossHistory();
    }, []);

    return ( 
        <Fragment>
            {
                trades.map((trade, i) => {
                    return <div key={i}>
                        <Card>
                            <Descriptions>
                                <Descriptions.Item label="Stock">{trade.scrip_name}</Descriptions.Item>
                                <Descriptions.Item label="Buy Date">{trade.buy_date}</Descriptions.Item>
                                <Descriptions.Item label="Sell Date">{trade.sell_date}</Descriptions.Item>
                                <Descriptions.Item label="Quantity">{trade.quantity}</Descriptions.Item>
                                <Descriptions.Item label="Avg. Buy Price">{trade.buy_average}</Descriptions.Item>
                                <Descriptions.Item label="Avg. Sell Price">{trade.sell_average}</Descriptions.Item>
                                <Descriptions.Item label="P&L" style={{ color: "red"}}>{trade.sell_amount - trade.buy_amount}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </div>
                })
            }
        </Fragment>
     );
}

export default Dashboard;