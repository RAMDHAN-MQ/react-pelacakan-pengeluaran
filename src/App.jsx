import { useEffect } from "react";
import { useState } from "react";

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

function Main({ onTambahData, transaksi, onHapusData, onUpdateData }) {
  const [showForm, setShowForm] = useState(false);
  const [inputData, setInputData] = useState({
    id: 1,
    keterangan: "",
    kategori: "",
    jumlah: 0,
    tipe: "",
    tanggal: "",
  });
  const [filterKategori, setFilterKategori] = useState("");
  const [editData, setEditData] = useState(false);

  // fungsi digunakan untuk menampilkan form dan tidak
  function handleShowForm() {
    setShowForm(!showForm);
  }

  // fungsi untuk membuat data baru dan mengirimkan ke fungsi onTambahData
  function handleDataBaru(data) {
    data.preventDefault();

    if (editData) {
      onUpdateData(inputData);
    } else {
      const dataBaru = { ...inputData, id: Date.now() };
      onTambahData(dataBaru);
    }
    setInputData({
      id: 1,
      keterangan: "",
      kategori: "",
      jumlah: 0,
      tipe: "",
      tanggal: "",
    });
    setShowForm(false);
    setEditData(false);
  }

  // fungsi untuk memfilter data dari inputan select user, lalu disesuaikan dengan kategori
  const dataFilter = transaksi.filter((e) => {
    if (filterKategori === "") return true;

    return e.kategori === filterKategori;
  });

  // fungsi untuk mengirim data yang diedit ke form input
  function handleDataEdit(id) {
    const dataEdit = transaksi.find((e) => e.id === id);
    setShowForm(true);
    setInputData(dataEdit);
    setEditData(true);
  }

  return (
    <main>
      <div className="main-control">
        <Button
          jenis={"tambah"}
          text={showForm ? "Tutup Form" : "+ Tambah Transaksi"}
          onClick={handleShowForm}
        />
        <Select
          value={filterKategori}
          onChange={(e) => setFilterKategori(e.target.value)}
        />
      </div>
      <div className={`form ${showForm ? "" : "hidden"}`}>
        <form onSubmit={(data) => handleDataBaru(data)}>
          <Input inputData={inputData} setInputData={setInputData} />
          <Button
            jenis={"tambah"}
            type={"submit"}
            text={editData ? "Update" : "Simpan"}
          />
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
                  transaksi={e}
                  onHapusData={onHapusData}
                  onEditData={handleDataEdit}
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
          required
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
          required
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
          required
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

function Item({ nomor, transaksi, onHapusData, onEditData }) {
  return (
    <tr>
      <td>{nomor + 1}</td>
      <td>{transaksi.keterangan}</td>
      <td>
        {transaksi.kategori.charAt(0).toUpperCase() +
          transaksi.kategori.slice(1)}
      </td>
      <td className={transaksi.tipe}>Rp {transaksi.jumlah},-</td>
      <td>{transaksi.tanggal}</td>
      <td>
        <Button
          jenis={"edit"}
          text={"Edit"}
          onClick={() => onEditData(transaksi.id)}
        />
        <Button
          jenis={"hapus"}
          text={"Hapus"}
          onClick={() => onHapusData(transaksi.id)}
        />
      </td>
    </tr>
  );
}
