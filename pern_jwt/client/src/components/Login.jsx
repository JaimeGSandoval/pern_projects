import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      const parseRes = await response.json();
      localStorage.setItem('token', parseRes.data.token);
      setAuth(true);
      // if (parseRes.token) {
      // } else {
      //   setAuth(false);
      // }
    } catch (err) {
      console.log('error happened here');
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          onChange={handleChange}
          value={password}
        />

        <button className="btn btn-success btn-block my-3">Submit</button>
        <Link to="/register" className="btn btn-primary btn-block ms-2">
          Register
        </Link>
      </form>
    </>
  );
};
