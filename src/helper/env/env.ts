import * as dotenv from 'dotenv'
export const getEnv=()=>{
    if(process.env.Env){
       dotenv.config({
        override:true,
        path:`src/helper/env/.env.${process.env.Env}`
       })
    }
    else{
        console.error("No ENV Passed");
    }
}