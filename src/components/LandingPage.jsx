import React from 'react';

const LandingPage = () => {
  const items = [
    { title: "Ulangan Bahasa Inggris Kelas 6 SD", addedBy: "Mang HR", rating: "89%" },
    { title: "Tabel Perkalian 1-10", addedBy: "Muhammad...", rating: "100%" },
    { title: "Soal Pilihan Ganda Let Me Introduce M...", addedBy: "Added by...", rating: "80%" },
    { title: "Tugas 3 Bahasa Inggris", addedBy: "yd p", rating: "86%" },
    { title: "TUGAS 1 Bahasa Inggris PDF", addedBy: "Mul Ya", rating: "91%" },
    { title: "Contoh Soal SAP 010...", addedBy: "Anonymous", rating: "95%" },
    { title: "Company Profile", addedBy: "Anonymous", rating: "99%" },
    { title: "Soal Bahasa Inggris", addedBy: "Anonymous", rating: "92%" },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">For You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="h-32 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-sm text-gray-500">PDF</span>
              </div>
              <p className="text-sm font-medium mb-1">{item.title}</p>
              <p className="text-xs text-gray-500">Added by {item.addedBy}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">{item.rating}</p>
                <button>
                  <i className="far fa-bookmark text-gray-500"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
