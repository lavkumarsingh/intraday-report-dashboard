
export const getTradeDetails = async () => {
    await axios.get(`${BASE_URL}/trade/profit-loss/data?from_date=${from_date}&to_date=${to_date}&segment=${segment}&financial_year=${financial_year}&page_number=${page_number}&page_size=${page_size}`, {
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

        return {
            data,
            msg: "Successfully fetched intraday data."
        }
    }).catch(err => {
        return {
            err: err.response.data,
            msg: "Error occured."
        }
    });
}

