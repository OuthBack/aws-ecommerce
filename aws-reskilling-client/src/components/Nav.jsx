import { Button } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import { Link } from "react-router-dom";

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = useUser();

  return (
    <nav className="flex items-center justify-between px-2 lg:px-36 py-2 shadow-lg fixed w-full bg-white top-0 z-10">
      <Link to="/" className="text-gray-700 text-2xl font-bold dark:text-gray-400">
        <h1>Store</h1>
      </Link>
      <ul className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/create-product">
                <Button layout="link">
                  <span>create product</span>
                </Button>
              </Link>

              <a
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                }}
              >
                <Button layout="link">
                  <span>logout</span>
                </Button>
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href={import.meta.env.VITE_LOGIN_URL}>
                <Button layout="link">
                  <span>login</span>
                </Button>
              </a>
              <a href={import.meta.env.VITE_REGISTER_URL}>
                <Button layout="link">
                  <span>register</span>
                </Button>
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
