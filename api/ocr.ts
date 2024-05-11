import axios from "axios";

const API = {
	qrcode: "https://awesome-api-mu5q.onrender.com/api/qrcode",
}

export async function decodeQrCode( url: string ) {
	const response = await axios.get(API.qrcode, {
		params: {
			url
		},
	});
	return response.data;
}