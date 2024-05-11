import { defineDirective } from "@/modules/command";
import { ImageRecepElem, ReplyRecepElem } from "@/modules/lib";
import { decodeQrCode } from "#/awesome-tools/api/ocr";

export default defineDirective( "order", async ( { sendMessage, messageData, logger, client } ) => {
	const { message } = messageData;
	const replyMsg = <ReplyRecepElem | undefined>message.find( m => m.type === "reply" );
	const recReplyImage: ImageRecepElem[] = [];
	
	/* 尝试获取回复信息中的图片 */
	if ( replyMsg ) {
		const { retcode, data, wording } = await client.getMessage( Number.parseInt( replyMsg.data.id ) );
		if ( retcode !== 0 ) {
			logger.error( `获取引用消息失败：${ wording }` );
			await sendMessage( "获取引用消息失败，请尝试附加图片的方式。" );
			return;
		}
		const recepImages = <ImageRecepElem[]>data.message.filter( m => m.type === "image" );
		recReplyImage.push( ...recepImages );
	}
	
	const recImage = <ImageRecepElem[]>message.filter( m => m.type === "image" );
	
	const recMessage: ImageRecepElem[] = [ ...recReplyImage, ...recImage ];
	
	if ( !recMessage.length ) {
		await sendMessage( "未找到图片，请尝试附加图片的方式。" );
		return;
	}
	
	if ( recMessage.length > 1 ) {
		await sendMessage( "每次仅识别一个图片，请重新发送。" );
		return;
	}
	
	const url = recMessage[0].data.url;
	try {
		const data = await decodeQrCode( url );
		await sendMessage( `识别结果：\n${ data.join( "\n\n" ) }` );
	} catch ( error ) {
		logger.error( error );
		await sendMessage( "识别失败，请尝试重新发送图片。" );
	}
} );