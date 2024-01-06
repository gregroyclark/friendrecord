import logo from '../assets/friendrecord.png';

const Navbar = () => {
  return (
    <div className='flex border-b items-center mb-4 p-2 shadow-sm'>
      <a>
        <img
          src={logo}
          alt='friendrecord logo'
          height={125}
          width={125}
          className='m-2 flex justify-start'
        />
      </a>
      <div className='m-2'>
        <ul className='flex flex-row'>
          <li className='p-2 m-2 border shadow-md rounded-md text-sm'>
            Add Friend
          </li>
          <li className='p-2 m-2 border shadow-md rounded-md text-sm'>
            Friends List
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
