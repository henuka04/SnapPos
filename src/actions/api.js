/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const baseUrl = "https://localhost:44343/"

export default {
    member(url = baseUrl + 'api/Member/Member_Header_Record') {
        return {
            viewAll:()=>axios.get(url),
        };
    }
}