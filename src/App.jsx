import { useState } from "react";

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Pelacakan Pengeluaran</h1>
        <div className="info-keuangan">
          <div className="card-info">
            <p className="card-keterangan saldo;">Saldo</p>
            <p className="card-uang saldo">Rp 000.000.000,-</p>
          </div>
          <div className="card-info">
            <p className="card-keterangan pemasukan">Saldo</p>
            <p className="card-uang pemasukan">Rp 000.000.000,-</p>
          </div>
          <div className="card-info">
            <p className="card-keterangan pengeluaran">Saldo</p>
            <p className="card-uang pengeluaran">Rp 000.000.000,-</p>
          </div>
        </div>
      </header>

      <main>
        <div className="main-control">
          <button className="btn-tambah">+ Tambah Transaksi</button>
          <button className="btn-filter">Filter</button>
        </div>
        <div className="transaksi-list">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Keterangan</th>
                <th>Kategori</th>
                <th>Jumlah</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  Beli makan
                  <span>12-2-2026</span>
                </td>
                <td>Makanan</td>
                <td>Rp 9.000,-</td>
                <td>
                  <button>Edit</button>
                  <button>Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
