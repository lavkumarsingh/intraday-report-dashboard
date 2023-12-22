function Dashboard() {
    return ( 
        <>
        {localStorage.get('auth').access_token}
        </>
     );
}

export default Dashboard;