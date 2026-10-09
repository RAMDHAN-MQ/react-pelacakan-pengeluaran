import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  const [transaksi, setTransaksi] = useState(() => {
    const data = localStorage.getItem("transaksi");

    return data ? JSON.parse(data) : [];
  });

  // kode yang pertama kali dijalankan, dan akan dijalankan ketika ada perubahan pada transaksi
  useEffect(() => {
    localStorage.setItem("transaksi", JSON.stringify(transaksi));
  }, [transaksi]);

  // menampilkan pemasukan, pengeluaran, dan saldo yang ada di card header
  const pemasukan = transaksi
    .filter((e) => e.tipe === "pemasukan")
    .reduce((a, b) => a + b.jumlah, 0);

  const pengeluaran = transaksi
    .filter((e) => e.tipe === "pengeluaran")
    .reduce((a, b) => a + b.jumlah, 0);

  const saldo = pemasukan - pengeluaran;

  // fungsi untuk menambahkan data ke localstorage
  function handleTambahData(dataBaru) {
    setTransaksi((data) => [...data, dataBaru]);
  }

  // fungsi untuk menghapus data di localstorage
  function handleHapusData(id) {
    setTransaksi((data) => data.filter((e) => e.id !== id));
  }

  // fungsi untuk edit data di localstorage
  function handleUpdateData(dataEdit) {
    setTransaksi((data) =>
      data.map((e) => (e.id === dataEdit.id ? dataEdit : e)),
    );
  }

  return (
    <div className="container">
      <Header saldo={saldo} pemasukan={pemasukan} pengeluaran={pengeluaran} />
      <Main
        onTambahData={handleTambahData}
        transaksi={transaksi}
        onHapusData={handleHapusData}
        onUpdateData={handleUpdateData}
      />
    </div>
  );
}
