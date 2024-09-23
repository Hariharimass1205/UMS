import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../firebase/config";
import { getFirestore } from '@firebase/firestore'
import { apiClient } from "../lib/api-client";
import { UPLOAD_URL } from "./Constants";
const db = getFirestore(app);

export async function uploadImagesToFireStore(image, userid) {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`)
    await uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    let url = await getDownloadURL(storageRef);
    const response = await apiClient.post(UPLOAD_URL, { url, userid }, { withCredentials: true })
    return response.data.url
  } catch (error) {
    throw new Error(error.message)
  }
}


