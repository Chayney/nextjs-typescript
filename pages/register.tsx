import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log('レスポンス内容:', data);

            if (res.ok) {
                router.push('/login');
            } else {
                setMessage(data.message || '登録に失敗しました');
            }
        } catch (error) {
            console.error('登録エラー:', error);
            setMessage('サーバーエラーが発生しました');
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>新規登録</h2>
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
                <button type="submit">登録</button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
    );
}
