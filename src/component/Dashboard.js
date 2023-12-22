function Dashboard() {
    console.log(JSON.parse(localStorage.getItem('auth')));
    return ( 
        <>
        Dashboard
        {JSON.parse(localStorage.getItem('auth'))?.user_name}
        </>
     );
}

export default Dashboard;