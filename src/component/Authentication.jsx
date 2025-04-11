import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation (if needed)

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // For registration
    const [rememberMe, setRememberMe] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);  // For registration
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement authentication logic here (e.g., API calls)
        if (isLogin) {
            console.log('Login:', { email, password, rememberMe });
            // Call login logic function
        } else {
            console.log('Register:', { username, email, password, agreeTerms });
            // Call register logic function
        }
    };

    const handleSubmitLogin = (e) =>{
      e.preventDefault();
      if (isLogin) {
        navigate('/')
    }
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body m-4">
                            <h2 className="card-title text-center mb-4 pt-4">{isLogin ? 'Welcome to Visualizer! 👋' : 'Adventure starts here 🚀'}</h2>
                            <p className="card-text text-center mb-4">{isLogin ? 'Email: piyush@gmail.com and Password:12345' : 'Make your app management easy and fun!'}</p>

                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="johndoe"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="admin@demo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Remember Me (Login) or Agree to Terms (Register) */}
                                {isLogin ? (
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                                    </div>
                                ) : (
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="agreeTerms"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="agreeTerms">
                                            I agree to
                                        </label>
                                    </div>
                                )}

                                <button type="submit" onClick={handleSubmitLogin} className="btn btn-primary w-100">{isLogin ? 'Login' : 'Sign Up'}</button>
                            </form>

                            <div className="mt-3 text-center pb-4">
                                New on our platform? <Link to="#" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Create an account' : 'Sign in instead'}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authentication;