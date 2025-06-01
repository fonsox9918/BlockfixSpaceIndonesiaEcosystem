import React from "react";

const ContactTechnicianCard = ({ technician }) => {
  return (
    <div className="mt-6 p-4 bg-slate-800 rounded-xl text-white shadow flex items-center justify-between">
      <div>
        <p className="font-semibold">{technician.name}</p>
        <p className="text-sm text-slate-300">{technician.role}</p>
      </div>
      <div className="flex gap-2">
        <a
          href={`https://wa.me/${technician.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-white bg-green-500 px-3 py-1 rounded text-sm"
        >
          WhatsApp
        </a>
        <a
          href={`tel:${technician.phone}`}
          className="bg-blue-500 px-3 py-1 rounded text-sm text-white no-underline"
        >
          Call
        </a>
      </div>
    </div>
  );
};

export default ContactTechnicianCard;