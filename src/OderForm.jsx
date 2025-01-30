import React, { useState } from "react";
import "./styles.css";
import ele from './ele.jpg';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    products: [],
    selectedProduct: "",
    selectedQuantity: 1,
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

  const addProduct = () => {
    if (formData.selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        products: [...prev.products, { product: formData.selectedProduct, quantity: formData.selectedQuantity }],
        selectedProduct: "",
        selectedQuantity: 1,
      }));
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, products: updatedProducts }));
  };

  const calculateTotal = () => {
    return formData.products.reduce((total, item) => {
      const product = productOptions.find((p) => p.id === item.product);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const sendWhatsAppMessage = () => {
    const { name, phone, address, products } = formData;
    let orderDetails = `Customer Details:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nProducts ordered:\n`;

    products.forEach((item) => {
      const product = productOptions.find((p) => p.id === item.product);
      if (product) {
        orderDetails += `${product.name} (x${item.quantity})\n`;
      }
    });

    orderDetails += `\nTotal Amount: Rs.${calculateTotal()}`;
    const encodedMessage = encodeURIComponent(orderDetails);
    const recipientNumber = "919865562897"; 
    const whatsappURL = `https://wa.me/${recipientNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div> 
      <center>
      <img src={ele} className="logo" />
      <h3 style={{ color: "red", margin:"0"}}>Products madeup of 100% Coconut Oil</h3>
      <div className="order-form-container">
          <div className="order-form" >
            <h2>Order Form</h2> <br />
            <div className="table-pack">
            <table>
              <tr> 
              <td> <label>Product</label> </td>
              <td> 
                <select className="inputs" value={formData.selectedProduct} onChange={(e) => setFormData((prev) => ({ ...prev, selectedProduct: e.target.value }))}>
              <option value="">Select product</option>
              {productOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rs.{product.price}/-
                </option>
              ))}
              </select>
              </td>
              </tr>
            
              <tr> 
              <td><label>Quantity</label> </td>
              <td><input className="inputs" type="number" value={formData.selectedQuantity} min="1" onChange={(e) => setFormData((prev) => ({ ...prev, selectedQuantity: parseInt(e.target.value) }))} /> </td>
            </tr>
            </table>
            <button type="button" onClick={addProduct} style={{ background: "#009432", color: "white", border: "none", padding: "10px", marginTop: "10px", cursor: "pointer", borderRadius:"0px" }}>Add items</button>
            </div>           
            <br />
            <h2 style={{background:"black", color:"white"}}>{formData.products.length === 0 ? "No products selected" : "Selected Products"}</h2>
            <table className="order-table" border="1" width="100%">
              
              <tbody>
                {formData.products.map((item, index) => {
                  const product = productOptions.find((p) => p.id === item.product);
                  return product ? (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>(x{item.quantity})</td>
                      <td>
                        <button type="button" onClick={() => removeProduct(index)} style={{marginTop:"0px", background: "#EA2027", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius:"0" }}>Remove</button>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
            
            <button type="button" onClick={() => setShowPopup(true)} style={{ background: "#EA2027", color: "white", border: "none", padding: "10px", width: "100%", cursor: "pointer", marginTop: "20px", borderRadius:"0px" }}>Place Order</button>
          </div>
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup">
                <h3 style={{color:"red"}}>Confirm Your Order</h3>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                <label>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                <h3>Ordered Products</h3>
                <ol>
                  {formData.products.map((item, index) => {
                    const product = productOptions.find((p) => p.id === item.product);
                    return product ? (
                      <li className="popuplist" key={index}>{product.name} (x{item.quantity})</li>
                    ) : null;
                  })}
                </ol>
                <h3>Total: Rs.{calculateTotal()}/-</h3>
                <button className="confirm" onClick={sendWhatsAppMessage}>Confirm Order</button>
                <button className="cancel" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div> 
      </center> 
    </div>
  );
};

export default OrderForm;
