import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

export async function uploadImage(file, path) {
  const imageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function deleteImage(imageUrl) {
  if (!imageUrl) return;
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef).catch(console.error);
}