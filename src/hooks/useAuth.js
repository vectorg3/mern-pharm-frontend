import { useSelector } from 'react-redux';
import fire from '../fire';

export function useAuth() {
    if (fire.auth().onAuthStateChanged((user) => {})) {
        return true;
    }
}
