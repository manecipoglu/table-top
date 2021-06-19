import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "#faa541",
};

export default function Navigation() {
  return (
    <nav style={{ position: "absolute", top: "200px" }}>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/home">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/about">
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/products">
            PRODUCTS
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/flavors">
            FLAVORS
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/buy">
            BUY
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
