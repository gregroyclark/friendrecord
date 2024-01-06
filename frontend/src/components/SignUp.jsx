import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className='border m-2 p-2 rounded-sm shadow-sm'>
      <h1 className='flex font-semibold justify-center m-4 text-lg text-gray-600'>
        Sign Up
      </h1>
      <hr className='mb-4' />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col sm:flex-row m-2'>
          <label className='m-2'>Email:</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='m-2 p-2 rounded-sm shadow-md'
          />

          <label className='m-2'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='m-2 p-2 rounded-sm shadow-md'
          />
        </div>

        <button
          type='submit'
          className='border m-4 p-2 rounded-md shadow-sm bg-blue-200 hover:bg-blue-300'
        >
          Sign Up
        </button>
        <div className='m-4'>
          Already have an account?{' '}
          <Link to='/Login'>
            <span className='hover:text-blue-400'>Log in.</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
