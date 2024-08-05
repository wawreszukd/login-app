import './App.css'
import {useEffect, useState} from "react";

import Sidebar from "./Sidebar.tsx";
import Login from "./Login.tsx";


const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);


useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    async function validate(token: string) {
        try {
            const response = await fetch('http://localhost:3000/auth/validate', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({token})
            });
            console.log(response.ok)
            if (response.ok) {
                setLoggedIn(true);
            }

        } catch (error) {
            console.error(error);

        }
    }


    validate(token);

}, [])
return (<div className="App">
    {loggedIn ? <h1>Welcome to the app!</h1> : <>
        <Login setLogged={setLoggedIn}/>
        <Sidebar/>
    </>}
</div>);
}
export default App;