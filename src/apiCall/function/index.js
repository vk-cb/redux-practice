import { axios } from "../../shared/axios";
import { getDataFromStore } from "../../store/getStore";

export const getToken = (section)=>{
    let auth;
    if(section){
        auth = getDataFromStore(section);
    }
    else{
        auth = getDataFromStore("Auth")
    }
    console.log(auth)

    return auth?.auth?.token
};

export const apiFunction = async (url, method, postData, token, extraConfig, section) => {
    // console.log("sadsadas")
    let config = {
        method: method,
        url: url,
        data: postData ? postData : {},
        headers: { institutionId: process.env.REACT_APP_INSTITUTION_ID }
    };
    let data;
    if (token) {
        let token = getToken(section);
        config = {
            ...config,
            headers: { token: `${token}` },
        };
    }

    if (extraConfig === "blob") {
        config = {
            ...config,
            responseType: 'blob',
        }
    }

    if (extraConfig === "formData") {
        config = {
            ...config,
            headers: { ...config.headers, "content-type": "multipart/form-data" },
        }
    }

    // console.log(config);

    await axios({ ...config })
        .then((res) => {
            if (extraConfig === "blob") {
                data = res.data
            }
            else {
                data = {
                    data: res.data.data ? res.data.data : {},
                    status: res.data.status === "success" ? true : false,
                    message: res.data.status,
                };
            }
        })
        .catch((err) => {
            // console.log(err);
            data = {
                ...err.response.data,
                status: false,
            };
        });
    // console.log(data);
    return data;
};