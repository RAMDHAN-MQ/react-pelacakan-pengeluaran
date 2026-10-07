import { useState } from "react";

const transaksi = [
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
  return (
    <main>
      <div className="main-control">
        <Button tipe={"tambah"} text={"+ Tambah Transaksi"} />
        <Select />
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

function Button({ tipe, text }) {
  return <button className={`btn-${tipe}`}>{text}</button>;
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
        <Button tipe={"edit"} text={"Edit"} />
        <Button tipe={"hapus"} text={"Hapus"} />
      </td>
    </tr>
  );
}
