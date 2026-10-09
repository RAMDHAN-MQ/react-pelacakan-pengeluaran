import Button from './Button'

export default function Item({ nomor, transaksi, onHapusData, onEditData }) {
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
