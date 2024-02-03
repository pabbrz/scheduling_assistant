import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully');
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
};