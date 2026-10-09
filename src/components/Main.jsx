import { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import Input from "./Input";
import Item from "./Item";

export default function Main({
  onTambahData,
  transaksi,
  onHapusData,
  onUpdateData,
}) {
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
