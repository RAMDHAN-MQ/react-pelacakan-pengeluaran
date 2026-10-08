import { useEffect } from "react";
import { useState } from "react";

const transaksi1 = [
  {
    id: 1,
    keterangan: "beli makan",
    kategori: "makanan",
    jumlah: "9000",
    tipe: "pengeluaran",
    tanggal: "1212026",
  },
];

export default function App() {
  const [transaksi, setTransaksi] = useState(() => {
    const data = localStorage.getItem("transaksi");

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("transaksi", JSON.stringify(transaksi));
  }, [transaksi]);

  const [uang, setUang] = useState({
    saldo: 0,
    pemasukan: 0,
    pengeluaran: 0,
  });

  return (
    <div className="container">
      <Header
        saldo={uang.saldo}
        pemasukan={uang.pemasukan}
        pengeluaran={uang.pengeluaran}
      />
      <Main />
    </div>
  );
}

function Header({ saldo, pemasukan, pengeluaran }) {
  return (
    <header>
      <h1>Pelacakan Pengeluaran</h1>
      <div className="info-keuangan">
        <Card tipe={"saldo"} uang={saldo} />
        <Card tipe={"pemasukan"} uang={pemasukan} />
        <Card tipe={"pengeluaran"} uang={pengeluaran} />
      </div>
    </header>
  );
}

function Card({ tipe, uang }) {
  return (
    <div className="card-info">
      <p className={`card-keterangan ${tipe}`}>
        {tipe.charAt(0).toUpperCase() + tipe.slice(1)}
      </p>
      <p className={`card-uang ${tipe}`}>Rp {uang},-</p>
    </div>
  );
}

function Main() {
  const [showForm, setShowForm] = useState(false);

  function handleShowForm() {
    setShowForm(!showForm);
  }

  return (
    <main>
      <div className="main-control">
        <Button
          jenis={"tambah"}
          text={showForm ? "Tutup Form" : "+ Tambah Transaksi"}
          onClick={handleShowForm}
        />
        <Select />
      </div>
      <div className={`form ${showForm ? "" : "hidden"}`}>
        <form>
          <Input />
          <Button type={"submit"} text={"Simpan"} />
        </form>
      </div>
      <div className="transaksi-list">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Keterangan</th>
              <th>Kategori</th>
              <th>Jumlah</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <Item />
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Button({ type, jenis, text, onClick }) {
  return (
    <button
      type={type ? "button" : "submit"}
      className={`btn-${jenis}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Input() {
  return (
    <>
      <div className="item-input">
        <label htmlFor="">Keterangan :</label>
        <input type="text" placeholder="Masukkan kategori transaksi" />
      </div>
      <div className="item-input">
        <label htmlFor="">Kategori :</label>
        <Select />
      </div>
      <div className="item-input">
        <label htmlFor="">Jumlah Uang :</label>
        <input type="number" placeholder="Masukkan Jumlah Uang" />
      </div>
      <div className="item-input">
        <label htmlFor="">Tipe Pengeluaran :</label>
        <select name="" id="">
          <option value="">Pengeluaran</option>
          <option value="">Pemasukan</option>
        </select>
      </div>
      <div className="item-input">
        <label htmlFor="">Tanggal :</label>
        <input type="date" className="date" />
      </div>
    </>
  );
}

function Select() {
  return (
    <select>
      <option value="default">Filter Kategori</option>
      <option value="makan">Makan / Minum</option>
      <option value="belanja">Belanja</option>
      <option value="transport">Transport</option>
    </select>
  );
}

function Item() {
  return (
    <tr>
      <td>1</td>
      <td>Beli makan</td>
      <td>Makanan</td>
      <td className="pengeluaran">Rp 9.000,-</td>
      <td>12-1-2020</td>
      <td>
        <Button jenis={"edit"} text={"Edit"} />
        <Button jenis={"hapus"} text={"Hapus"} />
      </td>
    </tr>
  );
}
