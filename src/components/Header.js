
import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { getAProduct } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { logout } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state?.auth?.cartProducts)
  const authState = useSelector(state => state?.auth)
  const productState = useSelector(state => state?.product?.product)
  const [productOpt, setProductOpt] = useState([])
  const [paginate, setPaginate] = useState(true);
  const userData = JSON.parse(localStorage.getItem("customer"));
  const navigate = useNavigate()
  const [total, setTotal] = useState(null)
  
  const handleClickSignOut = () => {
    dispatch(logout());
  }
  useEffect(() => {
    let sum = 0
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
      setTotal(sum)
    }
  }, [cartState])

  useEffect(() => {
    let data = []
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title })

    }
    setProductOpt(data)

  }, [productState])

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  
  console.log("pro:",productState);
  

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Miễn phí vận chuyển cho đơn hàng trên 10tr và trả hàng miễn phí
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">DT SHOP</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  onChange={(selected) => {
                    if (selected.length > 0) {
                    navigate(`/product/${selected[0]?.prod}`)
                    dispatch(getAProduct(selected[0]?.prod))
                    }
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Tìm sản phẩm tại đây..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch type="submit" className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Danh sách <br /> Yêu thích
                    </p>
                  </Link>
                </div>
                {!userData && (

                  <div>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={user} alt="user" />
                      <p className="mb-0">
                        Đăng nhập <br /> Tài khoản
                      </p>
                    </Link>
                  </div>)
                }
                {userData !== null && (
                  <div className="d-flex gap-4 align-items-center">
                    <div className="d-flex gap-3 align-items-center dropdown">
                      <div>
                        <img
                          width={32}
                          height={32}
                          src={userData && userData.image}
                          alt="avatar"
                        />
                      </div>
                      <div
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="text-white"
                      >
                        <h5 className="mb-0">{userData && userData.firstname} {userData && userData.lastname}</h5>
                       
                      </div>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                          <Link
                            className="dropdown-item py-1 mb-1"
                            style={{ height: "auto", lineHeight: "20px" }}
                            to="/profile"
                          >
                            View Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item py-1 mb-1"
                            style={{ height: "auto", lineHeight: "20px" }}

                            onClick={handleClickSignOut}

                          >

                            Signout


                          </Link>
                        </li>
                      </div>
                    </div>
                  </div>
                )}
               

                {/* <div>
                  <Link
                    to={ authState?.user===null ? "/login":"/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    <p className="mb-0">
                      Đăng nhập <br /> Tài khoản
                    </p>
                  </Link>
                </div> */}

                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    {<div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">$</p>
                    </div>}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Danh mục
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {/* <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/product">Sản phẩm</NavLink>
                    <NavLink to="/my-orders">Đơn hàng</NavLink>
                    <NavLink to="/blogs">Tin tức</NavLink>
                    <NavLink to="/contact">Liên hệ</NavLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
