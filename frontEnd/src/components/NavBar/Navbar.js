import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { SignoutUser } from "../../actions/UserAction";
import { searchProduct } from "../../actions/product/ProductAction";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    dispatch(SignoutUser());
  };

  const SearchProduct = async (e) => {
    e.preventDefault();
    navigate("/search");
    dispatch(searchProduct(search));
    setSearch("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      SearchProduct(event);
    }
  };
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/">
              <p className="text-logo">T-MART</p>
            </Link>
          </span>
        </div>
        <div className="search-form">
          <form>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm ..."
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <BsSearch style={{ fontSize: 16 }} className="icon-search" onClick={(e) => SearchProduct(e)} />
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="hover-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "#fff" }}>
              <path d="M19.148 2.971A2.008 2.008 0 0 0 17.434 2H6.566c-.698 0-1.355.372-1.714.971L2.143 7.485A.995.995 0 0 0 2 8a3.97 3.97 0 0 0 1 2.618V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.382A3.97 3.97 0 0 0 22 8a.995.995 0 0 0-.143-.515l-2.709-4.514zm.836 5.28A2.003 2.003 0 0 1 18 10c-1.103 0-2-.897-2-2 0-.068-.025-.128-.039-.192l.02-.004L15.22 4h2.214l2.55 4.251zM10.819 4h2.361l.813 4.065C13.958 9.137 13.08 10 12 10s-1.958-.863-1.993-1.935L10.819 4zM6.566 4H8.78l-.76 3.804.02.004C8.025 7.872 8 7.932 8 8c0 1.103-.897 2-2 2a2.003 2.003 0 0 1-1.984-1.749L6.566 4zM10 19v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.142c.321.083.652.142 1 .142a3.99 3.99 0 0 0 3-1.357c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357A3.99 3.99 0 0 0 18 12c.348 0 .679-.059 1-.142V19h-3z"></path>
            </svg>
            <Link to="/product">Product</Link>
          </li>
          <li className="hover-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "#fff" }}>
              <path d="m14.49 20.937 5.381-1.166S17.93 6.633 17.914 6.546c-.016-.086-.086-.144-.158-.144s-1.439-.101-1.439-.101-.949-.949-1.064-1.05c-.027-.029-.057-.043-.086-.058l-.677 15.744zm.446-15.772c-.016 0-.043.014-.057.014-.016 0-.217.059-.533.158-.318-.919-.879-1.768-1.871-1.768h-.086c-.289-.361-.633-.519-.936-.519-2.316 0-3.426 2.892-3.77 4.359-.892.275-1.538.476-1.613.505-.504.158-.517.172-.574.648-.057.344-1.367 10.489-1.367 10.489l10.117 1.899.69-15.785zm-2.635.704v.102c-.559.173-1.178.36-1.783.547.346-1.323.992-1.972 1.553-2.217.146.375.23.878.23 1.568zm-.92-2.2c.1 0 .201.028.303.102-.732.344-1.539 1.222-1.871 2.978a59.11 59.11 0 0 1-1.411.432c.389-1.339 1.325-3.512 2.979-3.512zm.402 7.812s-.604-.315-1.322-.315c-1.08 0-1.123.676-1.123.849 0 .921 2.418 1.28 2.418 3.453 0 1.712-1.08 2.806-2.547 2.806-1.756 0-2.648-1.094-2.648-1.094l.475-1.554s.922.792 1.697.792a.693.693 0 0 0 .721-.69c0-1.209-1.986-1.268-1.986-3.252 0-1.669 1.195-3.295 3.627-3.295.936 0 1.395.272 1.395.272l-.707 2.028zm.922-7.281c.518.06.85.648 1.064 1.311-.258.087-.547.173-.863.273v-.187c0-.561-.072-1.022-.201-1.397z"></path>
            </svg>
            <Link to="/myOrder">Order</Link>
          </li>
          {userInfo ? (
            <li onClick={() => setShowAccount2(!showAccount2)} className="hover-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "#fff" }}
              >
                <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path>
                <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path>
              </svg>
              <Link>
                {userInfo.name}
                {/* <BiSolidDownArrow style={{ fontSize: "10px" }} /> */}
              </Link>
              {showAccount2 ? (
                <div className="menu-drop">
                  {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                  <Link to="/profile">Profile</Link>
                  <Link onClick={() => handleSignout()}>Log Out</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          ) : (
            <li onClick={() => setShowAccount(!showAccount)} className="hover-item">
              <Link>
                Account
                <BiSolidDownArrow style={{ fontSize: 10, marginLeft: 4 }} />
              </Link>

              {showAccount ? (
                <div className="menu-drop">
                  <Link to="/register">Register</Link>
                  <Link to="/login">Log In</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart-item">
              <AiOutlineShoppingCart style={{ fontSize: 28 }} />
              <span className="count">{amount}</span>
            </Link>
          </li>
        </ul>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
