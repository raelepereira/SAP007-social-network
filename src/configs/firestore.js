import { 
  getFirestore,
  collection, 
  addDoc,
  orderBy,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import { auth } from "./authentication.js";

const db = getFirestore();

/*os dados são armazenados nos Documentos, que são armazenados nas coleções - ao criar os dados,
o Cloud Firestore já cria coleções e documentos de modo implícito na primeira vez.*/

//o async faz a função retornar uma promise
//o await faz a função esperar uma promise
//try define um bloco de código para ser executado (para tentar).
//catch define um bloco de código para lidar com qualquer erro.

//cria uma nova coleção - cada post é um documento
export async function newPost(message){
 const displayName = auth.currentUser.displayName;
  try {
    const post = {
      message: message,
      displayName: displayName,
      likes: new Array(),
      date: new Date()
    }  
    const docRef = await addDoc(collection(db, "posts"),post)
    console.log("Document written with ID: ", docRef.id); 
    return post;
  } 
  catch (e) {
    console.log("Error adding document: ", e);
  } 
}
  
/*export const getLikesPost = async () => {
  const getAllPosts = await getDocs(collection(db, "posts"));
  getAllPosts.forEach((doc) => {
    await updateDoc()
  });
}*/

//cria uma nova coleção - cada user é um documento
export async function collectUsers(email, displayName){
  try {
    const user = {
      userEmail: email,
      displayName: displayName
    };
    const docRef = await addDoc(collection(db, "users"),user)
    console.log("Document written with ID: ", docRef.id);
    return user;
  } 
  catch (e) {
    console.log("Error adding document: ", e);
  } 
}

/*export const sortPosts = async () => {
const sort = query(getDocs(collection(db, "posts")), orderBy("date","desc"));
return sort
}*/

//para ver todos os documentos de "posts"
export const allPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  let arrayOfPosts = [];
  querySnapshot.forEach((doc) => {
    const posts = doc.data();
    //const postId = doc.id;
    //posts['id'] = postId;
    arrayOfPosts.push(posts);
  });
  return arrayOfPosts
}

export const getUserPosts = async (id) => {
  const displayName = auth.currentUser.displayName;
  const clause = where("displayName", "==", displayName)
  const querySnapshot = await query(collection(db, "posts"),clause);
  return querySnapshot
}

//Editar post
/*const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  capital: true
});*/
