function Dashboard() {
    console.log(JSON.parse(localStorage.getItem('auth')));
    return ( 
        <>
        <h4>Logged in</h4>
        <p>Name: {JSON.parse(localStorage.getItem('auth'))?.user_name}</p>
        <p>Email: {JSON.parse(localStorage.getItem('auth'))?.email}</p>
        <p>User ID: {JSON.parse(localStorage.getItem('auth'))?.user_id}</p>
        <p>Access Token: {JSON.parse(localStorage.getItem('auth'))?.access_token}</p>
        <p>Broker: {JSON.parse(localStorage.getItem('auth'))?.UPSTOX}</p>
        </>
     );
}

export default Dashboard;