import { ConfigType, OrderConfig } from "@/modules/command";


const ocr_qrcode: OrderConfig = {
	type: "order",
	cmdKey: "awesome-tools.ocr-qrcode",
	desc: [ "识别二维码", "(图片)" ],
	headers: [ "识别" ],
	regexps: [ "[\\w\\W]*" ],
	main: "achieves/ocr",
	detail: "识别图片中的二维码并返回识别结果。"
};

export default <ConfigType[]>[ ocr_qrcode ];