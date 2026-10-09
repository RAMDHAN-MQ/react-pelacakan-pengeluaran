import Card from "./Card";

export default function Header({ saldo, pemasukan, pengeluaran }) {
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
