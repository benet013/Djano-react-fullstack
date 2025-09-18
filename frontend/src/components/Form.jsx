import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"


function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const isLogin = method === "login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        }
        catch (error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="auth-page">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
                            <p>Enter your credentials to access your account</p>
                        </div>

                        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        required
                                        autoComplete="username"
                                    />
                                    <label for="username">Username</label>
                                </div>
                                <span className="error-message" id="usernameError"></span>
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper password-wrapper">
                                    <input
                                        type="text"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <label for="password">Password</label>
                                    <button type="button" className="password-toggle" id="passwordToggle" aria-label="Toggle password visibility">
                                    </button>
                                </div>
                                <span className="error-message" id="passwordError"></span>
                            </div>

                            {/* <div className="form-options">
                                <label className="remember-wrapper">
                                    <input type="checkbox" id="remember" name="remember" />
                                    <span className="checkbox-label">
                                        <span className="checkmark"></span>
                                        Remember me
                                    </span>
                                </label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div> */}

                            <button type="submit" className="login-btn">
                                <span className="btn-text">{isLogin ? "Sign In" : "Sign Up"}</span>
                                <span className="btn-loader"></span>
                            </button>
                        </form>
                        
                        {isLogin ? 
                        <div className="signup-link">
                            <p>Don't have an account? <a href="/register">Create one</a></p>
                        </div> :
                        <div className="signup-link">
                            <p>Already have an account? <a href="/login ">Login</a></p>
                        </div>}
                        
                        <div className="success-message" id="successMessage">
                            <div className="success-icon">✓</div>
                            <h3>Login Successful!</h3>
                            <p>Redirecting to your dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Form