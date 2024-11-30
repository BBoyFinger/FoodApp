import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { BsBoxSeam, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  saveProduct,
  DeleteProduct,
} from "../../../../actions/product/ProductAction";
import "./style.css";

const AdminInventory = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.allProduct.product);
  const products = productState?.products || [];
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const pages = useSelector((state) => state.allProduct.pages);

  console.log(products);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.amount || formData.amount < 0)
      newErrors.amount = "Valid amount quantity is required";

    return newErrors;
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const productData = {
        name: formData.name,
        price: formData.price,
        amount: formData.amount,
      };

      if (editProduct) {
        productData.id = editProduct.id;
      }

      dispatch(saveProduct(productData));
      setShowModal(false);
      setFormData({ name: "", price: "", amount: "" });
      setEditProduct(null);
    } else {
      setErrors(newErrors);
    }
  };
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(DeleteProduct(id));
  };

  return (
    <div className="inventory-container">
      <div className="inventory-wrapper">
        <div className="inventory-header">
          <div className="inventory-title">
            <BsBoxSeam className="icon" /> Inventory Management
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="add-product-button"
            aria-label="Add new product"
          >
            <FiPlus className="icon" /> Add Product
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
          <BsSearch className="search-icon" />
        </div>

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")} className="sortable">
                  Product Name
                </th>
                <th onClick={() => handleSort("amount")} className="sortable">
                  Amount
                </th>
                <th onClick={() => handleSort("price")} className="sortable">
                  Price
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="product-row">
                  <td>
                    <span className="product-name">{product.name}</span>
                  </td>
                  <td>
                    <div className="stock-bar">
                      <div
                        className={`stock-level ${
                          product.amount > 50
                            ? "stock-high"
                            : product.amount > 20
                            ? "stock-medium"
                            : "stock-low"
                        }`}
                        style={{
                          width: `${Math.min(
                            (product.amout / 150) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <span className="stock-units">{product.amount} units</span>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(product)}
                      className="edit-button"
                      aria-label="Edit product"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-button"
                      aria-label="Delete product"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editProduct ? "Edit Product" : "Add New Product"}</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditProduct(null);
                  setFormData({
                    name: "",
                    price: "",
                    amount: "",
                  });
                  setErrors({});
                }}
                className="close-modal-button"
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`form-input ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className={`form-input ${errors.price ? "input-error" : ""}`}
                />
                {errors.price && <p className="error-text">{errors.price}</p>}
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: parseInt(e.target.value),
                    })
                  }
                  className={`form-input ${errors.amount ? "input-error" : ""}`}
                />
                {errors.amount && <p className="error-text">{errors.amount}</p>}
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditProduct(null);
                    setFormData({
                      name: "",
                      price: "",
                      stock: "",
                    });
                    setErrors({});
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {editProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
