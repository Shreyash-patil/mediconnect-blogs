import { getAuth } from 'firebase/auth';
import { app } from './initialize';

export const auth = getAuth(app);