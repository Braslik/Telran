import React, {useState} from "react";
export default function Login(props) {
    const authService = props.authService;
    const usernameUpdateFn = props.usernameUpdateFn;
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const inputHandler = (event) => {
        event.preventDefault();
        credentials[event.target.name] = event.target.value;
        setCredentials({...credentials});
    }
    const onSubmit = (event) => {
        event.preventDefault();
        authService.login(credentials)
            .subscribe(jwt => {
                localStorage.setItem("accessToken", jwt);
                usernameUpdateFn(authService.getUsername());
            }, () => {
                alert('Wrong credentials');
            })
    }
    return <div className="card">
        <div className="card-header">
            <h4>Login Form</h4>
        </div>
        <div className="card-body">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username/email</label>
                    <input name="email" required
                           onChange={inputHandler}
                    className="form-control"/>

                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" required
                           onChange={inputHandler}
                           className="form-control"/>

                </div>
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>

        </div>

    </div>
}
