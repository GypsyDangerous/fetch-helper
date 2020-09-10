import nodeFetch from "node-fetch"
// import {RequestInfo, RequestInit} from "@types/node-fetch"
const fetch = async (url: string, options?: object) => {
    const response = await nodeFetch(url, options)
    const contentType : string | undefined = response.headers.get("content-type")?.split(" ")[0]?.slice(0, -1)
    let responseData
    let isJson = false
    if(contentType === "application/json"){
        responseData = await response.json()
        isJson = true
    }else if(contentType === "text/html"){
        responseData = await response.text()
    }
    if(!response.ok){
        let errorMessage : string
        if(isJson){
            if(responseData.message){
                errorMessage = responseData.message
            }else{
                errorMessage = response.statusText
            }
        }else{
            errorMessage = response.statusText
            throw new Error(errorMessage)
        }
    }

    return responseData
}

export = fetch