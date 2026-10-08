import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [transaksi, setTransaksi] = useState(() => {
    const data = localStorage.getItem("transaksi");

    return data ? JSON.parse(data) : [];
  });

  const [uang, setUang] = useState({
    saldo: 0,
    pemasukan: 0,
    pengeluaran: 0,
  });

  useEffect(() => {
    localStorage.setItem("transaksi", JSON.stringify(transaksi));
  }, [transaksi]);

  // fungsi untuk menambahkan data ke localstorage
  function handleTambahData(dataBaru) {
    console.log(dataBaru);
    setTransaksi([...transaksi, dataBaru]);
  }

  return (
    <div className="container">
      <Header
        saldo={uang.saldo}
        pemasukan={uang.pemasukan}
        pengeluaran={uang.pengeluaran}
      />
      <Main onTambahData={handleTambahData} transaksi={transaksi} />
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

function Main({ onTambahData, transaksi }) {
  const [showForm, setShowForm] = useState(false);
  const [inputData, setInputData] = useState({
    id: 1,
    keterangan: "",
    kategori: "",
    jumlah: 0,
    tipe: "",
    tanggal: "",
  });
  const [dataFilter, setdataFilter] = useState(transaksi);

  // fungsi digunakan untuk menampilkan form dan tidak
  function handleShowForm() {
    setShowForm(!showForm);
  }

  // fungsi untuk membuat data baru dan mengirimkan ke fungsi onTambahData
  function handleDataBaru(data) {
    data.preventDefault();

    const dataBaru = { ...inputData, id: Date.now() };
    onTambahData(dataBaru);
    setInputData({
      id: 1,
      keterangan: "",
      kategori: "",
      jumlah: 0,
      tipe: "",
      tanggal: "",
    });
  }

  // fungsi untuk filter kategori
  function handleFilterKategori(value) {
    const filter = value.target.value;
    if (filter === "") {
      return setdataFilter(transaksi);
    }

    const data = transaksi.filter((e) => e.kategori === filter);
    setdataFilter(data);
  }

  return (
    <main>
      <div className="main-control">
        <Button
          jenis={"tambah"}
          text={showForm ? "Tutup Form" : "+ Tambah Transaksi"}
          onClick={handleShowForm}
        />
        <Select onChange={handleFilterKategori} />
      </div>
      <div className={`form ${showForm ? "" : "hidden"}`}>
        <form onSubmit={(data) => handleDataBaru(data)}>
          <Input inputData={inputData} setInputData={setInputData} />
          <Button jenis={"tambah"} type={"submit"} text={"Simpan"} />
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
            {dataFilter.length === 0 ? (
              <tr>
                <td colSpan={6}>Tidak ada data</td>
              </tr>
            ) : (
              dataFilter.map((e, i) => (
                <Item
                  key={e.id}
                  nomor={i}
                  keterangan={e.keterangan}
                  kategori={e.kategori}
                  jumlah={e.jumlah}
                  tipe={e.tipe}
                  tanggal={e.tanggal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Button({ type = "button", jenis, text, onClick }) {
  return (
    <button type={type} className={`btn-${jenis}`} onClick={onClick}>
      {text}
    </button>
  );
}

function Input({ inputData, setInputData }) {
  // fungsi untuk mengatasi gantinya value, karena kalau satu satu akan cukup banyak yang diganti
  function handleChange(e) {
    const { name, value } = e.target;

    setInputData({
      ...inputData,
      [name]: name === "jumlah" ? Number(value) : value,
    });
  }

  return (
    <>
      <div className="item-input">
        <label htmlFor="">Keterangan :</label>
        <input
          type="text"
          placeholder="Masukkan kategori transaksi"
          name="keterangan"
          value={inputData.keterangan}
          onChange={handleChange}
        />
      </div>
      <div className="item-input">
        <label htmlFor="">Kategori :</label>
        <Select input={inputData.kategori} onChange={handleChange} />
      </div>
      <div className="item-input">
        <label htmlFor="">Jumlah Uang :</label>
        <input
          type="number"
          name="jumlah"
          placeholder="Masukkan Jumlah Uang"
          value={inputData.jumlah !== 0 ? inputData.jumlah : ""}
          onChange={handleChange}
        />
      </div>
      <div className="item-input">
        <label htmlFor="">Tipe Pengeluaran :</label>
        <select name="tipe" value={inputData.tipe} onChange={handleChange}>
          <option value="">-- Pilih Tipe --</option>
          <option value="pengeluaran">Pengeluaran</option>
          <option value="pemasukan">Pemasukan</option>
        </select>
      </div>
      <div className="item-input">
        <label htmlFor="">Tanggal :</label>
        <input
          type="date"
          className="date"
          name="tanggal"
          value={inputData.tanggal}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

function Select({ input, onChange }) {
  return (
    <select name="kategori" value={input} onChange={onChange}>
      <option value="">-- Pilih Kategori --</option>
      <option value="makan">Makan / Minum</option>
      <option value="belanja">Belanja</option>
      <option value="transport">Transport</option>
      <option value="bekal">Bekal</option>
    </select>
  );
}

function Item({ nomor, keterangan, kategori, jumlah, tipe, tanggal }) {
  return (
    <tr>
      <td>{nomor + 1}</td>
      <td>{keterangan}</td>
      <td>{kategori}</td>
      <td className={tipe}>Rp {jumlah},-</td>
      <td>{tanggal}</td>
      <td>
        <Button jenis={"edit"} text={"Edit"} />
        <Button jenis={"hapus"} text={"Hapus"} />
      </td>
    </tr>
  );
}
