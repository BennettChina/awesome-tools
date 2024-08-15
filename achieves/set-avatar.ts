import { defineDirective } from "@/modules/command";
import { AtRecepElem, ImageRecepElem, ReplyRecepElem } from "@/modules/lib";

enum ErrorMsg {
	EMPTY_AT = "请在指令后跟随图片或@用户",
	REPLY_ERROR = "获取引用信息出错：",
	SET_ERROR = "头像设置失败: ",
}

export default defineDirective( "order", async ( { sendMessage, messageData, logger, client } ) => {
	const { message } = messageData;
	const replyMsg = <ReplyRecepElem | undefined>message.find( m => m.type === "reply" );
	const recImage = <ImageRecepElem[]>message.filter( m => m.type === "image" );
	const recAt = <AtRecepElem[]>message.filter( m => m.type === "at" );
	let recMessage: ImageRecepElem | AtRecepElem;
	/* 优先获取图文消息中的图片，其次引用消息，最后用被AT人的头像 */
	if ( recImage ) {
		recMessage = recImage[0];
	} else if ( replyMsg ) {
		const { retcode, data, wording, msg } = await client.getMessage( Number.parseInt( replyMsg.data.id ) );
		if ( retcode !== 0 ) {
			const reason = `${ ErrorMsg.REPLY_ERROR }${ wording || msg }`;
			logger.error( `[设置头像] ${ reason }` );
			await sendMessage( reason );
			return;
		}
		const recepImages = <ImageRecepElem[]>data.message.filter( m => m.type === "image" );
		recMessage = recepImages[0];
	} else if ( recAt ) {
		recMessage = recAt[0];
	} else {
		await sendMessage( ErrorMsg.EMPTY_AT );
		return;
	}
	
	const rec = recMessage;
	let url: string;
	if ( rec.type === "image" ) {
		url = <string>rec.data.url;
	} else {
		url = `https://q1.qlogo.cn/g?b=qq&s=640&nk=${ rec.data.qq }`;
	}
	
	const res = await client.fetchOneBot( "call_api", { name: "setAvatar", args: [ url ] } );
	if ( res.retcode !== 0 ) {
		await sendMessage( ErrorMsg.SET_ERROR + ( res.wording || res.msg ) );
		return;
	}
	await sendMessage( "头像设置成功!" );
} );