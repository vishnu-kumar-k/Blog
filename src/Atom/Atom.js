import {atom} from "recoil";
export const Auth=atom({
    key:"Auth",
    default:{
        name:null,
        status:false
    }
})

export const post=atom({
    key:"post",
    default:1
})