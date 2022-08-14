import axios, { AxiosInstance } from "axios"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCU-JryAzS5L-BlGOPsmHwukW1C81J9U6E",
  authDomain: "gestaodoconhecimento-9e1c5.firebaseapp.com",
  databaseURL: "https://gestaodoconhecimento-9e1c5-default-rtdb.firebaseio.com",
  projectId: "gestaodoconhecimento-9e1c5",
  storageBucket: "gestaodoconhecimento-9e1c5.appspot.com",
  messagingSenderId: "481348694322",
  appId: "1:481348694322:web:5b08da792c54dc14e2272b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const clienteHttp: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000'


})




export default clienteHttp