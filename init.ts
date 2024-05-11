import { definePlugin } from "@/modules/plugin";
import cfgList from "./commands";

const initConfig = {
	api_domain: ""
};

export let config: typeof initConfig;

export default definePlugin( {
	name: "Awesome Tools",
	cfgList,
	async mounted( params ) {
		config = params.configRegister( "main", initConfig );
		params.setAlias( [ "工具集" ] );
	}
} )