import { message } from "antd";
import axios from "axios";
// .env constants
const BASE_URL = "https://api.upstox.com/v2"
const REDIRECT_URI = "https://upstox-report.vercel.app/"
const CLIENT_ID = "9891272d-18cf-4a88-a7c2-af59a5c15d01"
const CLIENT_SECRET = "x87gssludi"

export const getTradeDetails = async (from_date, to_date, segment, financial_year, page_number, page_size) => {
    try {
        const response = await axios.get(`${BASE_URL}/trade/profit-loss/data?from_date=${from_date}&to_date=${to_date}&segment=${segment}&financial_year=${financial_year}&page_number=${page_number}&page_size=${page_size}`, {
            headers: {
                "Api-Version": "2.0",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth')).access_token}`,
                "Accept": "application/json"
            }
        });
        const data = response.data.data || [];
        data.sort((a, b) => {
            function convertDate(dateString){
                var p = dateString.split(/\D/g)
                return [p[2],p[1],p[0] ].join("-")
              }
            return new Date(convertDate(b.buy_date)) - new Date(convertDate(a.buy_date)); // asending via date
        })

        return {
            data,
            msg: "Successfully fetched intraday data."
        }
    } catch (err) {
        return {
            status: err.response.status,
            msg: "Error occured"
        }
    }   
}
//https://api.upstox.com/v2/portfolio/long-term-holdings

export const getPortfolioDetails = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/portfolio/long-term-holdings`, {
            headers: {
                "Api-Version": "2.0",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('auth')).access_token}`,
                "Accept": "application/json"
            }
        })
        const data = response.data.data;
        return {
            data,
            msg: "Successfully fetched intraday data."
        }
    } catch (err) {
        return {
            status: err.response.status,
            msg: "Error occured"
        }
    }
}