import React from 'react';

const ActionBtn = ({ formData, totalAmount, t }) => {
  const sendWhatsApp = () => {
    const { phoneNumber, customerName, date, returnDate } = formData;

    if (!phoneNumber) return alert("Phone number is required!");

    // Phone number formatting
    let phone = phoneNumber.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '92' + phone.slice(1);

    // Message For Customer
    const message = `*ThankYou So Much For Choosing IA Home Care Laundry Service*
---------------------------
*Customer:* ${customerName || 'N/A'}
*Order Date:* ${date || 'N/A'}
*Return Date:* ${returnDate || 'N/A'}
*Total Bill:* Rs. ${totalAmount || 0}
---------------------------
Please present this receipt when collecting your clothes. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 my-5 px-4">
      {/* Save & Send Button */}
      <button 
        onClick={sendWhatsApp} 
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="text-xl">💬</span>
        {t.save || "Save & Send WhatsApp"}
      </button>

      {/* Reset Button */}
      <button 
        onClick={() => window.location.reload()} 
        className="bg-slate-200 hover:bg-slate-800 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all duration-200"
      >
        {t.reset || "Reset Form"}
      </button>
    </div>
  );
};

export default ActionBtn;
