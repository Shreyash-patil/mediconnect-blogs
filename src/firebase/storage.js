import { getStorage } from 'firebase/storage';
import { app } from './initialize';

export const storage = getStorage(app);