import nodeFetch, {RequestInit} from "node-fetch";

const fetch = async (url: string, options?: RequestInit): Promise<any> => {
    const response = await nodeFetch(url, options);
    const clone = response.clone()
	const contentType = response.headers.get("content-type");
	let responseData;
	if (contentType?.includes("application/json")) {
		responseData = await response.json();
	} else if (contentType?.includes("text/html")) {
		responseData = await response.text();
    }else{
        try{
            responseData = await response.clone().json()
        }catch(err){
            responseData = await response.text()
        }
    }
    
	if (!response.ok || !responseData) {
		responseData = { message: responseData?.message || response.statusText, code: responseData?.code || responseData?.status || response.status };
	}

	return {...responseData, rawResponse: clone};
};

export = fetch;
