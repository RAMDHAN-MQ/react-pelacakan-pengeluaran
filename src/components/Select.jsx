export default function Select({ input, onChange }) {
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
