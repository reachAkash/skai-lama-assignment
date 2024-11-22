import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter(Boolean); // Remove empty strings

  return (
    <nav>
      <ul className="flex space-x-1 items-center justify-start text-lg font-medium text-[#999999]">
        {pathnames.length > 0 && (
          <li>
            <button onClick={() => navigate("/")} className="flex items-center">
              <MdHome className="text-2xl" />
            </button>
          </li>
        )}
        {pathnames.map((value, index) => {
          // Decode the pathname to handle spaces correctly
          const decodedPathname = decodeURIComponent(value);
          const to = `/${pathnames.slice(0, index + 1).join("/")}`; // Template literal

          return (
            <li key={to}>
              <span> / </span>
              <Link to={to}>
                {decodedPathname.charAt(0).toUpperCase() +
                  decodedPathname.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
