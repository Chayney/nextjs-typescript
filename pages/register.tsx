// pages/register.tsx
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            alert('User registered!');
        } else {
            const data = await res.json();
            alert(data.message);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>新規登録</h2>
            <form onSubmit={handleRegister}>
                <label>
                    メールアドレス
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
                    />
                </label>
                <label>
                    パスワード
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
                    />
                </label>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}
