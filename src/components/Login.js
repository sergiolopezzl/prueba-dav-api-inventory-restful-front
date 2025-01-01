import React, { useState } from "react";
import { useRouter } from "next/router";
import useAuth from '@hooks/useAuth';
import Link from 'next/link';
import styles from '@styles/Login.module.css'; // Importamos el archivo de estilos

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos vacíos
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }
    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }

    try {
      await login(username, password);
      router.push("/Menu");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.registerText}>
          Don't have an account? <Link href="/RegisterPage" className={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
