import './Login.css'
const Login = ({setLogged}: { setLogged: (logged: boolean)=>void }) => {
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: (document.getElementById('username') as HTMLInputElement).value,
                password: (document.getElementById('password') as HTMLInputElement).value
            })
        }).then(response => {
            if (response.ok) {
                setLogged(true);
                return response.json()
            } else {
                alert('Login failed');
                throw new Error('Login failed');
            }
        })
            .then(data => {
                localStorage.setItem('token', data.token);
            })


    }
    return (
    <div  className={"Login"}>
        <form id={"loginForm"}>
            <div className={"form-group"}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username"/>
            </div>
            <div className={"form-group"}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            </div>
            <button onClick={handleLogin}>Log in</button>
        </form>
    </div>)
}

export default Login;