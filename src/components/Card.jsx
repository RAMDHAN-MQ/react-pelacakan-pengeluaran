export default function Card({ tipe, uang }) {
  return (
    <div className="card-info">
      <p className={`card-keterangan ${tipe}`}>
        {tipe.charAt(0).toUpperCase() + tipe.slice(1)}
      </p>
      <p className={`card-uang ${tipe}`}>Rp {uang},-</p>
    </div>
  );
}
