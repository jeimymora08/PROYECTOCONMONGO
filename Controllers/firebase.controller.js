import {initializeApp} from 'firebase/app'
import firebaseConfig from '../Config/config.js'
import {getStorage,ref,getDownloadURL,uploadBytesResumable} from 'firebase/storage'

export async function uploadFile(req,res){
    const firebaseCon = initializeApp(firebaseConfig);

    const storage = getStorage(firebaseCon);

    try {

        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage,`files/${req.file.originalname}`);
        const metadata = {
            contenType: req.file.mimetype
        }
        const subirArchivo = await uploadBytesResumable(storageRef,req.file.buffer,metadata)
        const downloadURL = await getDownloadURL(subirArchivo.ref);
        res.status(200).json({
            downloadURL
        })

    } catch (error) {
        res.status().send(error.message)
    }
}

function giveCurrentDateTime() {
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    const dateTime = date + ' ' + time 
    return dateTime
}
