import React, { useState } from "react";
import "./styles.css";
import ele from './assets/v_logo.png';

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
    <div className="container d-flex justify-content-center align-items-center bg-light">
      <img src={ele} className="img" alt="" />
    </div>
      <div className="container mt-4 ">
  <div className="row">
    {/* Order Form Column */}
    <div className="col-md-6 mb-4 ">
      <div className="card p-4 h-100 border-2 border-primary">
        <h3 className="text-center">Select Products</h3>
        {/* Product Select */}
        <div className="mt-3">
          <label>Product</label>
          <select className="form-control" value={formData.selectedProduct} onChange={(e) => setFormData((prev) => ({ ...prev, selectedProduct: e.target.value }))}>
            <option value=""></option>
            {productOptions.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - Rs.{product.price}/-
              </option>
            ))}
          </select>
        </div>
        {/* Quantity */}
        <div className="mt-3">
          <label>Quantity</label>
          <input className="form-control" type="number" value={formData.selectedQuantity} min="1" onChange={(e) => setFormData((prev) => ({ ...prev, selectedQuantity: parseInt(e.target.value) }))} />
        </div>
        {/* Add Button */}
        <div className="mt-3 text-center">
          <button type="button" className="btn btn-primary w-75" onClick={addProduct}>Add to cart</button>
        </div>
      </div>
    </div>

    {/* Selected Products Column */}
    <div className="col-md-6 mb-4 ">
      <div className="card p-4 h-100 border-2 border-success">
        <h2 className="text-center"><i className="fa fa-shopping-cart"></i>  Your cart</h2>
        <table className="table table-striped table-bordered mt-3">
          <tbody>
            {formData.products.map((item, index) => {
              const product = productOptions.find((p) => p.id === item.product);
              return product ? (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>(x{item.quantity})</td>
                  <td>
                    <button className="btn btn-danger btn-sm" type="button" onClick={() => removeProduct(index)}>Remove</button>
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
        {formData.products.length > 0 && (
          <div className="text-center">
            <button className="btn btn-success w-75 mt-3" type="button" onClick={() => setShowPopup(true)}>Place Order</button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


       {showPopup && (
            <div className="popup-overlay">
                <div className="popup card p-5">

     
               <h3 className="text-danger text-center">Confirm Your Order</h3>
               <div className="col-10 ms-5 mt-3">
                <label>Name</label>
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
               </div>
               <div className="col-10 ms-5 mt-3">
                <label>Phone</label>
                <input className="form-control" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
               </div>
                <div className="col-10 ms-5 mt-3">
                <label>Address</label>
                <input className="form-control" type="text" name="address" value={formData.address} onChange={handleInputChange} required />
               </div>
               <h3 className="text-primary text-center">Ordered Products</h3>
               <ol class="list-group list-group-numbered col-10 ms-5 mt-3">
                  {formData.products.map((item, index) => {
                    const product = productOptions.find((p) => p.id === item.product);
                    return product ? (
                      <li class="list-group-item" key={index}>{product.name} (x{item.quantity})</li>
                    ) : null;
                  })}
                </ol>
                <h3 className="text-primary text-center">Total: Rs.{calculateTotal()}/-</h3>
                <div>                  
                  <button className="btn btn-danger col-5 ms-5 mt-3 d-inline" onClick={() => setShowPopup(false)}>Cancel</button>
                  <button className="btn btn-primary col-5 ms-5 mt-3 d-inline" onClick={sendWhatsAppMessage}>Confirm Order</button>
                </div>          
            </div>
          </div>
       )}
    </>
  );
};

export default OrderForm;
