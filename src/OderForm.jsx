import React, { useState } from "react";
import "./styles.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    products: [{ product: "product1", quantity: 1 }],
  });
  const [showPopup, setShowPopup] = useState(false);

  const productOptions = [
    { id: "product1", name: "Cocosoap/ Kadalai Maavu soap", price: 60 },
    { id: "product2", name: "Coco Shampoo(250ml)", price: 125 },
    { id: "product3", name: "Coco Handwash(500ml)", price: 75 },
    { id: "product4", name: "Coco Dishwah(500ml)", price: 85 },
    { id: "product5", name: "Coco handwash(1000ml)", price: 250 },
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

    orderDetails += `\nTotal Amount: Rs.${calculateTotal()}`;
    const encodedMessage = encodeURIComponent(orderDetails);
    const recipientNumber = "919865562897"; 
    const whatsappURL = `https://wa.me/${recipientNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    
    <div className="order-form-container">
      <div className="order-form" style={{ maxWidth: "500px", margin: "0", padding: "20px" }}>
        <h2>Order Form</h2>
        {formData.products.map((item, index) => (
          <div className="order-pack" key={index} style={{ marginBottom: "10px" }}>
            <label>Product</label> <br />
            <select value={item.product} onChange={(e) => handleProductChange(index, "product", e.target.value)}>
              {productOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rs.{product.price}/-
                </option>
              ))}
            </select> <br />
            
            <label>Quantity</label> <br />            
            <input  className="quanNum" type="number" value={item.quantity} min="1" onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value))} />
            <button type="button" onClick={() => removeProduct(index)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", width:"100%" }}>Remove</button>
          </div>
        ))}
        
        <center><button type="button" onClick={addProduct} style={{ background: "green", color: "white", border: "none", padding: "10px", marginTop: "10px", cursor: "pointer" }}>Add Product</button></center>
        <button type="button" onClick={() => setShowPopup(true)} style={{ background: "black", color: "white", border: "none", padding: "10px", width: "100%", cursor: "pointer", marginTop: "20px" }}>Place Order</button>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Confirm Your Order</h3>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
            <h3>Order Summary</h3>
            <ul>
              {formData.products.map((item, index) => {
                const product = productOptions.find((p) => p.id === item.product);
                return <li key={index}>{product.name} (x{item.quantity})</li>;
              })}
            </ul>
            <h3>Total: Rs.{calculateTotal()}/-</h3>
            <button onClick={sendWhatsAppMessage}>Confirm Order</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div> 

  );
};

export default OrderForm;
