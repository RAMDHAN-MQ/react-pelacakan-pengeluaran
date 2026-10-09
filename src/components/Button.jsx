export default function Button({ type = "button", jenis, text, onClick }) {
  return (
    <button type={type} className={`btn-${jenis}`} onClick={onClick}>
      {text}
    </button>
  );
}
