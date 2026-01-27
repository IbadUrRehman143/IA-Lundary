import React, { useState } from 'react';
import BillSummary from "../BillSummary/BillSummary";
import ActionBtn from "../ActionBtn/ActionBtn";

const ItemSection = ({ formData, t }) => {
  const basePrices = {
    "Arabi Tobe": 4,
    "Shemagh": 0,
    "Pakistani Dress": 4,
    "Paint Shirt": 5,
    "Paint": 4,
    "Coat": 10,
    "Shoes": 5,
    "Blanket": 20,
    "Bed Set": 20,
    "Socks": 0
  };

  const [items, setItems] = useState([
    { id: Date.now(), name: "Arabi Tobe", service: "Dry Clean", quantity: 1, price: 4 }
  ]);

  const [discount, setDiscount] = useState(10); // Dynamic discount

  const handleUpdate = (id, field, value) => {
    const updated = items.map(item => {
      if (item.id === id) {
        let tempItem = { ...item, [field]: value };
        const base = basePrices[tempItem.name] || 0;
        tempItem.price = tempItem.service === "Dry Clean" ? base : base / 2;
        return tempItem;
      }
      return item;
    });
    setItems(updated);
  };

  const addNewRow = () => {
    const newItem = {
      id: Date.now(),
      name: "Arabi Tobe",
      service: "Dry Clean",
      quantity: 1,
      price: 4
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subTotal - (subTotal * discount) / 100;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-800 text-white text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4 text-right">Unit Price</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <select
                    value={item.name}
                    onChange={e => handleUpdate(item.id, 'name', e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-700 outline-none cursor-pointer p-1"
                  >
                    {Object.keys(basePrices).map(name => (
                      <option key={name} value={name}>{name} (Rs. {basePrices[name]})</option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-4">
                  <select
                    value={item.service}
                    onChange={e => handleUpdate(item.id, 'service', e.target.value)}
                    className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-black text-blue-800 outline-none uppercase"
                  >
                    <option value="Dry Clean">Dry Clean</option>
                    <option value="Wash">Wash (Half)</option>
                    <option value="Press">Press (Half)</option>
                  </select>
                </td>

                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => handleUpdate(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-12 text-center font-bold bg-slate-100 rounded py-1 outline-none"
                  />
                </td>

                <td className="px-6 py-4 text-right font-semibold text-slate-600">
                  {item.price === 0 ? "Free" : `Rs. ${item.price}`}
                </td>

                <td className="px-6 py-4 text-right font-black text-blue-700">
                  Rs. {item.price * item.quantity}
                </td>

                <td className="px-6 py-4 text-center">
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer with Add Button + Discount Input */}
        <div className="p-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={addNewRow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add More Item
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-slate-500 font-bold">Discount %:</span>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={e => setDiscount(parseInt(e.target.value) || 0)}
              className="w-20 text-center font-bold bg-slate-100 rounded py-1 outline-none"
            />
          </div>

          <div className="text-right px-6">
            <span className="text-slate-500 font-bold mr-4">Subtotal:</span>
            <span className="text-2xl font-black text-slate-900">Rs. {subTotal}</span>
          </div>
        </div>
      </div>

      {/* Bill Summary */}
      <BillSummary subTotal={subTotal} discount={discount} />

      {/* WhatsApp / Reset Button */}
      <ActionBtn formData={formData} totalAmount={grandTotal} t={t} />
    </div>
  );
};

export default ItemSection;
