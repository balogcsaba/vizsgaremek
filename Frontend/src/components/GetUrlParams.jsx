import {useLocation} from "react-router-dom";

function GetUrlParams(key, defaultVal = null) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const value = params.get(key);

    return value !== null ? value : defaultVal;
}

export default GetUrlParams;