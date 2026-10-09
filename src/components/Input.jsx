import Select from "./Select";

export default function Input({ inputData, setInputData }) {
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
