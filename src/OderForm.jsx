import React, { useState } from "react";
import './styles.css';


const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    products: [{ product: "product1", quantity: 1 }],
  });

  const productOptions = [
    { id: "product1", name: "Cocosoap/ Kadalai Maavu soap", price: 60 },
    { id: "product2", name: "Coco Shampoo(250ml)", price: 125 },
    { id: "product3", name: "Coco Handwash(500ml)", price: 75 },
    { id: "product3", name: "Coco Dishwah(500ml)", price: 85 },
    { id: "product3", name: "Coco handwash(1000ml)", price: 250 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][key] = value;
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { product: "product1", quantity: 1 }],
    }));
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const calculateTotal = () => {
    return formData.products.reduce((total, item) => {
      const product = productOptions.find((p) => p.id === item.product);
      return total + (product.price * item.quantity || 0);
    }, 0);
  };

  const sendWhatsAppMessage = () => {
    const { name, phone, address, products } = formData;
    let orderDetails = `Order Details:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nProducts:\n`;

    products.forEach((item) => {
      const product = productOptions.find((p) => p.id === item.product);
      orderDetails += `${product.name} (x${item.quantity})\n`;
    });

    orderDetails += `\nTotal Amount: $${calculateTotal()}`;

    const encodedMessage = encodeURIComponent(orderDetails);
    const recipientNumber = "919865562897"; // Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${recipientNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="order-form" style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Order Form</h2>
      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <h3>Products</h3>
      <div className="input-group">
        
        {formData.products.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>Product</label> <br />
            <select
              value={item.product}
              onChange={(e) =>
                handleProductChange(index, "product", e.target.value)
              }
            >
              {productOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rs.{product.price}/-
                </option>
              ))}
            </select> <br />
            <label>Quantity</label> <br />
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                handleProductChange(index, "quantity", parseInt(e.target.value))
              }
            />
            <button
              type="button"
              onClick={() => removeProduct(index)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </div >
      <div style={{ marginTop: "20px" }}>
        <h3>Total: Rs.{calculateTotal()}/-</h3>
      </div>
      <button 
        type="button"
        onClick={sendWhatsAppMessage}
        style={{
          background: "#25D366",
          color: "white",
          border: "none",
          padding: "10px",
          width: "100%",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
