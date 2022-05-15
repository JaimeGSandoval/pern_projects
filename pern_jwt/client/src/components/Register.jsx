import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const handleChange = (e) => {
    setInputs((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      const parseResponse = await response.json();
      localStorage.setItem('token', parseResponse.data.token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={email}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={password}
        />
        <input
          className="form-control my-3"
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          value={name}
        />
        <button className="btn btn-success btn-block">Submit</button>
        <Link to="/login" className="btn btn-primary btn-block ms-2">
          Login
        </Link>
      </form>
    </>
  );
};
