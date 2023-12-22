function Dashboard() {
    console.log(JSON.parse(localStorage.getItem('auth')))
    return ( 
        <>
        {JSON.parse(localStorage.getItem('auth'))?.access_token}
        </>
     );
}

export default Dashboard;