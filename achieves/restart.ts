import { defineDirective, InputParameter } from "@/modules/command";

export default defineDirective( 'order', async ( { sendMessage, client }: InputParameter ) => {
	const resp = await client.setRestart( 10000 );
	if ( resp.retcode !== 0 ) {
		await sendMessage( resp.wording || resp.msg || "重启失败" );
		return;
	}
	await sendMessage( "OneBot 已重启成功，请稍等片刻等待重连..." );
} )