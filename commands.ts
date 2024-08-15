import { ConfigType, OrderConfig } from "@/modules/command";
import { AuthLevel } from "@/modules/management/auth";


const ocr_qrcode: OrderConfig = {
	type: "order",
	cmdKey: "awesome-tools.ocr-qrcode",
	desc: [ "识别二维码", "(图片)" ],
	headers: [ "识别", "ocr" ],
	regexps: [ "[\\w\\W]*" ],
	main: "achieves/ocr",
	detail: "识别图片中的二维码并返回识别结果。"
};

const set_avatar: OrderConfig = {
	type: "order",
	cmdKey: "awesome-tools.set-avatar",
	desc: [ "设置头像", "[头像图]" ],
	headers: [ "设置头像" ],
	regexps: [ "[\\w\\W]*" ],
	main: "achieves/set-avatar",
	auth: AuthLevel.Master,
	detail: "设置 BOT 的头像，可以是被AT人的头像或者引用消息里的图片或者直接图文消息。"
};


export default <ConfigType[]>[ ocr_qrcode, set_avatar ];