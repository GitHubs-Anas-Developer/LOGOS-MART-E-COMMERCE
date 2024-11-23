import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCategory, MdViewCarousel } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar h-full  dark:bg-neutral-900 container mx-auto  max-h-[700px] overflow-y-auto  bg-slate-100  pb-4 px-6 dark:bg-neutral-800">
      {/* Sidebar content */}
      <section className="sidebar-content">
        <nav className="menu">
          <ul className="menu-items space-y-4">
            <li>
              <Link
                to="/"
                className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition"
              >
                <LuLayoutDashboard className="h-6 w-6" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/category"
                className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition"
              >
                <BiSolidCategory className="h-6 w-6" />
                <span>Category</span>
              </Link>
            </li>

            <li>
              <Link
                to="/subcategory"
                className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition"
              >
                <MdCategory className="h-6 w-6" />
                <span>Subcategory</span>
              </Link>
            </li>

            <li>
              <Link to={"/Sub-subcategory"}>
                <div className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition">
                  <BiCategoryAlt className="h-6 w-6" />
                  <span>Sub-subcategory</span>
                </div>
              </Link>
            </li>

            <li>
              <div className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition">
                <FaProductHunt className="h-6 w-6" />
                <span>Products</span>
              </div>
            </li>

            <li>
              <div className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition">
                <FiShoppingBag className="h-6 w-6" />
                <span>Orders</span>
              </div>
            </li>

            <li>
              <div className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition">
                <FaUsers className="h-6 w-6" />
                <span>Users</span>
              </div>
            </li>

            <li>
              <Link
                to="/newCarousel "
                className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition"
              >
                <MdViewCarousel className="h-6 w-6" />
                <span>Carousel </span>
              </Link>
            </li>

            <li>
              <div className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition">
                <CiSettings className="h-6 w-6" />
                <span>Settings</span>
              </div>
            </li>

            <li>
              <div className="menu-item flex items-center gap-4 text-black hover:bg-gray-200 dark:hover:bg-neutral-700 p-3 rounded-lg transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Billing</span>
              </div>
            </li>
          </ul>
        </nav>
      </section>

      {/* Sidebar footer */}
      <section className="sidebar-footer mt-auto bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="avatar avatar-md">
            <img
              src="https://i.pravatar.cc/150?img=30"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-black font-semibold">Sandra Marx</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              sandra@example.com
            </span>
          </div>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
