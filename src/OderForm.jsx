import React, { useState } from "react";
import "./styles.css";
import ele from './assets/varanam_logo.png';

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
    { id: "product1", name: "Cocosoap", price: 50 },
    { id: "product2", name: "Cocosoap(Kadalai Maavu soap)", price: 60 },
    { id: "product3", name: "Coco Shampoo(250ml)", price: 125 },
    { id: "product4", name: "Coco Handwash(500ml)", price: 75 },
    { id: "product5", name: "Coco Dishwah(500ml)", price: 85 },
    { id: "product6", name: "Coco Superwash(1000ml)", price: 250 },
    { id: "product7", name: "High quality liquid detergent(5L with can)", price: 500 }
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
    <> 

      
      <div className="order-form-container">
      <img src={ele} className="logo" />
      <marquee className="marQ" style={{color:"red"}}>Products madeup of 100% Coconut Oil</marquee>
      <h2>Order Form</h2>
          <div className="order-form" >
           
            <div className="d-pack">
            <table className="stable"> 
              <tbody>
              <tr> 
                  <td> <label>Product</label> </td>
                  <td> 
                    <select className="inputs" value={formData.selectedProduct} onChange={(e) => setFormData((prev) => ({ ...prev, selectedProduct: e.target.value }))}>
                  <option value=""></option>
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
              </tbody>
            </table>
            <button type="button" className="addButton" onClick={addProduct}>Add items</button>
            </div>           
            <br />
            <h2 style={{background:"white", color:"black", borderRadius: "5px 5px 0px 0px"}}>{formData.products.length === 0 ? "*No products selected" : "Selected Products"}</h2>
            <table className="order-table" border="1" width="100%">
              
              <tbody>
                {formData.products.map((item, index) => {
                  const product = productOptions.find((p) => p.id === item.product);
                  return product ? (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>(x{item.quantity})</td>
                      <td>
                        <button className="rButton" type="button" onClick={() => removeProduct(index)}>Remove</button>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
            <button className="placeButton" type="button" onClick={() => setShowPopup(true)}>Place Order</button>
            
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

    </>
  );
};

export default OrderForm;
