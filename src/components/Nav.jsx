import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import logomark from "../assets/logomark.svg";
import Test from "../Test";

// dark mode toggle

const Nav = ({ userName }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
      <NavLink to="/" aria-label="Go to home" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img src={logomark} alt="" height={30} />
        <span>Expense Tracker</span>
      </NavLink>

      {userName && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Test /> {/* 🌙 Theme Toggle */}
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm("Delete user and all data?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      )}
    </nav>
  );
};

export default Nav;
