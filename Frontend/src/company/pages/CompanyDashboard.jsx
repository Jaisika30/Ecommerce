import React from "react";
import "./comDashboard.css";
import { FaListCheck } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaFirstOrderAlt } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlinePayments } from "react-icons/md";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { FaFileInvoice } from "react-icons/fa";
import { MdAssignmentReturn } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Dropdown from "react-bootstrap/Dropdown";
// import Form from 'react-bootstrap/Form';
import {
  Form,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MdPeopleOutline,
  MdOutlineAnalytics,
  MdAttachMoney,
  MdOutlineInventory
} from 'react-icons/md';

const CompanyDashboard = () => {
  const stats = {
    totalProducts: 12345,
    activeProducts: 9876,
    outOfStock: 234,
    totalOrders: 45678,
    pendingOrders: 1234,
    totalCustomers: 34567,
    newCustomers: 456,
    revenue: '$1,234,567',
    topProduct: "Cargo Fit Pant"
  };
  return (
    <>
      {/*NAVBAR*/}
      <nav class="navbar navbar-expand-lg navbar-light sticky-top ">
        <div class="container-fluid">
          <h3>Company Panel</h3>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <button class="btn navbtn" type="submit">
              Company Name
            </button>

          </div>
        </div>
      </nav>
      {/*SIDEBAR*/}
      <div className="d-flex">
        <div className="sidebar">
          {/* <h4 class="text-center">Sidebar</h4> */}
          <div>
            <h6 className="text-darkyellow mt-4">Main Menu</h6>
          </div>
          <a href="#home" className="bg-dark mx-3 py-3 px-3 rounded">
            Overview <GrOverview />
          </a>
          <a href="#home" className="bg-dark mx-3 py-3 px-3 mt-3 rounded">
            Analytics <IoAnalytics />
          </a>
          <div class="dropdown bg-dark py-1 px-3">
            <button
              class="btn dropdown-toggle py-1"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
            >
              Products
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Flip-Flops
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Sports-Shoes
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Ballet flats
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Sneakers
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Loafers
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  Boots
                </a>
              </li>
            </ul>
          </div>
          <a href="#home" className="bg-dark mx-3 py-3 px-3 mt-3 rounded">
            Sales <FcSalesPerformance />
          </a>
          <div>
            <h6>Transacrtions</h6>
          </div>
          <a
            href="/deleteReason"
            className="bg-dark mx-3 mt-3 py-3 px-3 rounded"
          >
            Payments <MdOutlinePayments />
          </a>
          <a href="#contact" className="bg-dark mx-3 mt-3 py-3 px-3 rounded">
            Refunds <HiOutlineReceiptRefund />
          </a>
          <a href="#contact" className="bg-dark mx-3 mt-3 py-3 px-3 rounded">
            Invoice <FaFileInvoice />
          </a>
          <a href="#contact" className="bg-dark mx-3 mt-3 py-3 px-3 rounded">
            Returns <MdAssignmentReturn />
          </a>
          <div>
            <h6>General</h6>
          </div>
          <a href="#contact" className="bg-dark mx-3 mt-3 py-3 px-3 rounded">
            Notification <IoIosNotifications />
          </a>
          <a href="#contact" className="bg-dark mx-3 mt-3 py-3 px-3 rounded">
            Feedback <MdFeedback />
          </a>
          <a href="#contact" className="bg-dark mx-3 mt-3 py-3 px-3 rounded">
            Setting <CiSettings />
          </a>
        </div>
        <div className="container-fluid py-4 bg-dark">
          {/* Dashboard Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Company Dashboard</h2>
            <div className="text-muted">Last updated: {new Date().toLocaleString()}</div>
          </div>

          {/* Key Metrics Cards */}
          <div className="row mb-4">
            {/* Products Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2 bg-darkyellow">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Products
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {stats.totalProducts}
                      </div>
                    </div>
                    <div className="col-auto">
                      <MdOutlineProductionQuantityLimits className="text-primary" size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2 bg-darkyellow">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Total Orders
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {stats.totalOrders}
                      </div>
                      <div className="mt-2 text-xs text-muted">
                        {stats.pendingOrders} pending
                      </div>
                    </div>
                    <div className="col-auto">
                      <MdOutlineInventory className="text-success" size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customers Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Customers
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {stats.totalCustomers}
                      </div>
                      <div className="mt-2 text-xs text-muted">
                        +{stats.newCustomers} this month
                      </div>
                    </div>
                    <div className="col-auto">
                      <MdPeopleOutline className="text-info" size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Revenue
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {stats.revenue}
                      </div>
                      <div className="mt-2 text-xs text-muted">
                        Top product: {stats.topProduct}
                      </div>
                    </div>
                    <div className="col-auto">
                      <MdAttachMoney className="text-warning" size={40} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Management Section */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
              {/* <h6 className="m-0 font-weight-bold text-primary">
                <MdOutlineProductionQuantityLimits className="me-2" />
                Product Management
              </h6> */}
              <button className="btn btn-sm bg-darkyellow">Add New Product</button>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>Product Statistics</h5>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Active Products
                      <span className="badge bg-primary rounded-pill">{stats.activeProducts}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Out of Stock
                      <span className="badge bg-danger rounded-pill">{stats.outOfStock}</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Recent Activity</h5>
                  <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">New product added</h6>
                        <small>3 days ago</small>
                      </div>
                      <p className="mb-1">Cargo Fit Pant (ID: 12345)</p>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">Product updated</h6>
                        <small>1 week ago</small>
                      </div>
                      <p className="mb-1">Denim Jacket (ID: 9876)</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                <MdOutlineAnalytics className="me-2" />
                Product Analytics
              </h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  {/* Placeholder for chart - replace with your actual chart component */}
                  <div className="bg-light p-4 text-center border rounded">
                    <p className="mb-0">Product Performance Chart</p>
                    <small className="text-muted">(Orders, Views, Conversion Rate)</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <h5>Top Products</h5>
                  <ol className="list-group list-group-numbered">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Cargo Fit Pant</div>
                        1,234 orders
                      </div>
                      <span className="badge bg-primary rounded-pill">14%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Denim Jacket</div>
                        987 orders
                      </div>
                      <span className="badge bg-primary rounded-pill">11%</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Cotton T-Shirt</div>
                        876 orders
                      </div>
                      <span className="badge bg-primary rounded-pill">10%</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
