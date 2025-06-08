import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conf, setConf] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (pass !== conf) return setError("Паролі не співпадають");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: name });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-box">
      <form onSubmit={handleRegister}>
        <h2>Реєстрація</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="пароль" value={pass} onChange={(e) => setPass(e.target.value)} required />
        <input type="password" placeholder="підтвердіть пароль" value={conf} onChange={(e) => setConf(e.target.value)} required />
        <button type="submit">Зареєструватися</button>
        <p>
          <strong onClick={() => navigate("/login")}>Увійдіть</strong>, якщо вже маєте акаунт
        </p>
      </form>
    </div>
  );
};

export default Register;
