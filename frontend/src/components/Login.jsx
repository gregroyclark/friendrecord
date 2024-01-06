import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { Content_Type: 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('HTTP error: ' + response.status);
      }

      const data = await response.json();
      console.log('Success: ', data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className='border m-2 p-2 rounded-sm shadow-sm '>
      <h1 className='m-4 flex justify-center text-lg font-semibold text-gray-600'>
        Login
      </h1>
      <hr className='mb-4' />

      <form onSubmit={handleSubmit}></form>
      <div className='flex flex-col p-2'>
        <label>
          Email:
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='m-2 shadow-md rounded-sm p-2'
          />
        </label>
      </div>
      <div className='flex flex-col p-2'>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='m-2 shadow-md rounded-sm p-2'
          />
        </label>
      </div>
      <button
        type='submit'
        className='border m-2 p-2 rounded-md shadow-sm bg-blue-200 hover:bg-blue-300'
      >
        Log In
      </button>
      <div>
        Don't have an account?{' '}
        <Link to='/SignUp'>
          <span className='hover:text-blue-400'>Sign up.</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
