import "./App.css";

function Toast({ message, type }) {

  if (!message) return null;

  return (
    <div className={`toast ${type}`}>

      {type === "success" && "✅ "}
      {type === "error" && "⚠️ "}

      {message}

    </div>
  );
}

export default Toast;