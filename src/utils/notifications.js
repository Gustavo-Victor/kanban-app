import toast from "react-hot-toast"; 


export function notify(type = "success", message = "Welcome") {
    toast[type](message); 
}