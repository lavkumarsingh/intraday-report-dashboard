function Dashboard() {
    return ( 
        <>
        {JSON.parse(localStorage.getItem('auth'))?.access_token}
        </>
     );
}

export default Dashboard;