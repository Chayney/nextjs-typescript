import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push('/');
        } else {
            setMessage(data.message || 'ログインに失敗しました');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">ログイン</button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
    );
}
