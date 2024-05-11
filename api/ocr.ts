import axios from "axios";
import { config } from "#/awesome-tools";

const API = {
	qrcode: "https://awesome-api-mu5q.onrender.com/api/qrcode/url",
}

export async function decodeQrCode( url: string ) {
	let api = API.qrcode;
	if ( config.api_domain ) {
		api = api.replace( "https://awesome-api-mu5q.onrender.com", config.api_domain );
	}
	try {
		const response = await axios.post( api, {
			url
		} );
		const data = response.data;
		if ( data.code === 0 ) {
			return data.data;
		}
		return Promise.reject( data.message );
	} catch ( error ) {
		if ( axios.isAxiosError( error ) ) {
			return Promise.reject( error.response?.data || error.message );
		}
		return Promise.reject( error );
	}
}