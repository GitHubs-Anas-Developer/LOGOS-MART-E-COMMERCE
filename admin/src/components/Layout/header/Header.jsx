import React from 'react';

function Header() {
  return (
    <header className="navbar bg-slate-100 shadow-md">
      <div className="navbar-start">
        <a className="navbar-item text-xl font-semibold text-gray-800 hover:text-gray-600 transition duration-300">
          Admin Panel
        </a>
      </div>
      <div className="navbar-end flex items-center">
        <div className="relative">
          <div className="dropdown">
            <label className="btn btn-ghost flex cursor-pointer p-0" tabIndex="0">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300"
              />
            </label>
            <ul className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-300 transform scale-0 group-hover:scale-100 group-focus:scale-100">
              <li>
                <a className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200" href="#profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200" href="#settings">
                  Account settings
                </a>
              </li>
              <li>
                <a className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200" href="#subscriptions">
                  Subscriptions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
