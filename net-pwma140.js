chardump = null;
charHolder = null;

depthTimeout = null;


offsetX =0;
offsetY =0;
curX = 0;
curY =0;

loggedIn = 0;

RLE_MODE = 1;

canvas = null;
ctx = null;

COL_MAP = 2//13
ROW_MAP = 1


mapx  = 115;
mapy = 66;

imgdata = null;

camX=1500;
camY=-1000;
camXGoto = 1500;
camYGoto = -1000;
camXOff = 0;
camYOff = 0;
camXOffGoto = 0;
camYOffGoto = 0;

zoom = 3;
zoomGoto = 3;
centered = 1;

clicked = false;
loc = null;

infos = [];
screenTiles = [];

for(var x=0;x<=mapx;x++){
	screenTiles[x]=[];
	for(var y=0;y<mapy;y++){
		screenTiles[x][y] = [128,128,128,128];
	}
}


/* Port helpers */
const FALSE = false;
const TRUE = true;

const SUCCESS         =0x00
const E_VERSION_OLD   =0x01
const E_INVAL         =0x02
const E_ACCOUNT       =0x03
const E_GAME_FULL     =0x04
const E_SOCKET        =0x05
const E_VERSION_NEW   =0x06

const KF_SIZE = 3;
const OBJ_MOD_MAX = 17;
const SKILL_MAX = 10;
const PF_SIZE = 4;
const OF_SIZE = 7;
const OF_MAX = 49;
/* Getting those was also hard :( */
const ELEM_MAX = 30;
const SETTING_MAX = 9; 
const OPT_MAX = 50;//list-options.h
const INSCRIPTIONS_MAX = 873
const PROJ_MAX = 74; // list-elements.h + list-projections.h
const BOLT_MAX = 9; // z-spells.h
const LIGHTING_MAX = 4; //z-type.h

const FEAT_MAX = 4942// list-terrain.h
const STAT_MAX = 6;


const LIGHTING_LOS = 0;
const LIGHTING_TORCH = 1;
const LIGHTING_LIT = 2;
const LIGHTING_DARK = 4;


/* Undefined packet */
const PKT_UNDEFINED = 0;


const RLE_NONE    = 0;
const RLE_CLASSIC = 1;
const RLE_LARGE   = 2;


RLE_MODE = RLE_LARGE;

/*
 * PKT_STRUCT_INFO helpers
 */
const  STRUCT_INFO_UNKNOWN =0
const  STRUCT_INFO_LIMITS  =1
const  STRUCT_INFO_RACE    =2
const  STRUCT_INFO_CLASS   =3
const  STRUCT_INFO_BODY    =4
const  STRUCT_INFO_SOCIALS =5
const  STRUCT_INFO_KINDS   =6
const  STRUCT_INFO_EGOS    =7
const  STRUCT_INFO_RINFO   =8
const  STRUCT_INFO_RBINFO  =9
const  STRUCT_INFO_CURSES = 10
const  STRUCT_INFO_REALM  = 11
const  STRUCT_INFO_FEAT   = 12
const  STRUCT_INFO_TRAP   = 13
const  STRUCT_INFO_TIMED  = 14
const  STRUCT_INFO_PROPS   =15


const VERSION_MAJOR = 1
const VERSION_MINOR = 6
const VERSION_PATCH = 0
const VERSION_EXTRA = 0
const MY_VERSION = (VERSION_MAJOR << 12 | VERSION_MINOR << 8 | VERSION_PATCH
	<< 4 | VERSION_EXTRA)

const VERSION_BETA = 0;
const VERSION_TANGARIA = 20;

/* TODO: fill whole table.... */
const TERM_DARK   = 0;
const TERM_WHITE  = 1;
const TERM_SLATE  = 2;
const TERM_BLUE   = 6;
const TERM_YELLOW = 11;
const TERM_L_BLUE = 14;
let ASCII_COLORS = {
    'w': TERM_WHITE,
    'y': TERM_YELLOW,
    'b': TERM_BLUE,
    'B': TERM_L_BLUE,
};

class PWMAngband140ProtocolHandler extends MAngbandProtocolHandler {

	constructor(net, config, on_event) {
		super(net, config, on_event);
		bnd(this, 'recv_char_info');
		this.packets[PKT_FLOOR] = this.recv_floor;
		this.packets[PKT_WEATHER] = this.recv_weather;
		this.packets[PKT_BASIC_INFO] = this.recv_basic_info;
		this.packets[PKT_STRUCT_INFO] = this.recv_struct_info;
		this.packets[PKT_CHAR_INFO] = this.recv_char_info_conn;
		this.packets[PKT_END] = this.recv_end;
		this.packets[PKT_EXTRA] = this.recv_extra;
		this.packets[PKT_QUIT] = this.recv_quit;
		this.packets[PKT_KEEPALIVE] = this.recv_keepalive;
		this.packets[PKT_OPTIONS] = this.recv_options;
		this.packets[PKT_PLAY] = this.recv_play;
		this.packets[PKT_TEXT_SCREEN] = this.recv_text_screen;
		this.packets[PKT_PLAY_SETUP] = this.recv_play_setup;
		this.packets[PKT_PARTY] = this.recv_party;
		this.packets[PKT_CHANNEL] = this.recv_channel;
		this.packets[PKT_HISTORY] = this.recv_history;
		this.packets[PKT_VARIOUS] = this.recv_various;
		this.packets[PKT_TURN] = this.recv_turn;
		this.packets[PKT_IGNORE] = this.recv_ignore;
		this.packets[PKT_AWARE] = this.recv_aware;
		this.packets[PKT_EVERSEEN] = this.recv_everseen;
		this.packets[PKT_EGO_EVERSEEN] = this.recv_ego_everseen;
		this.packets[PKT_MESSAGE] = this.recv_message;
		this.packets[PKT_MESSAGE_FLUSH] = this.recv_message_flush;
		this.packets[PKT_SOUND] = this.recv_sound;
		this.packets[PKT_POLY] = this.recv_poly;
		this.packets[PKT_SKILLS] = this.recv_skills;
		this.packets[PKT_WEIGHT] = this.recv_weight;
		this.packets[PKT_TITLE] = this.recv_title;
		this.packets[PKT_LEV] = this.recv_lvl;
		this.packets[PKT_EXP] = this.recv_exp;
		this.packets[PKT_STAT] = this.recv_stat;
		this.packets[PKT_AC] = this.recv_ac;
		this.packets[PKT_HP] = this.recv_hp;
		this.packets[PKT_SP] = this.recv_sp;
		this.packets[PKT_GOLD] = this.recv_gold;
		this.packets[PKT_MONSTER_HEALTH] = this.recv_monster_health;
		this.packets[PKT_SPEED] = this.recv_speed;
		this.packets[PKT_STUDY] = this.recv_study;
		this.packets[PKT_DEPTH] = this.recv_depth;
		this.packets[PKT_DEATH_CAUSE] = this.recv_death_cause;
		this.packets[PKT_STATUS] = this.recv_status;
		this.packets[PKT_OBJFLAGS] = this.recv_objflags;
		this.packets[PKT_CURSOR] = this.recv_cursor;
		this.packets[PKT_STATE] = this.recv_state;
		this.packets[PKT_RECALL] = this.recv_recall;
		this.packets[PKT_LINE_INFO] = this.recv_line_info;
		this.packets[PKT_CHAR] = this.recv_cave_char;
		this.packets[PKT_ITEM] = this.recv_item;
		this.packets[PKT_INDEX] = this.recv_index;
		this.packets[PKT_COUNT] = this.recv_count;
		this.packets[PKT_PLUSSES] = this.recv_plusses;
		this.packets[PKT_DTRAP] = this.recv_dtrap;
		this.packets[PKT_STORE] = this.recv_store;
		this.packets[PKT_STORE_LEAVE] = this.recv_store_leave;
		this.packets[PKT_STORE_INFO] = this.recv_store_info;
		this.packets[PKT_PLAYER] = this.recv_player_pos;
		this.packets[PKT_SPELL_INFO] = this.recv_spell_info;
		this.packets[PKT_BOOK_INFO] = this.recv_book_info;
		this.packets[PKT_FEATURES] = this.recv_features;
		this.packets[PKT_TERM] = this.recv_term;
		this.packets[PKT_SPECIAL_OTHER] = this.recv_special_other;
		this.packets[PKT_SPECIAL_LINE] = this.recv_special_line;
		massivebind(this, this.packets);
		massivebind(this, this.eventHandlers);
		this.keepaliveamount = 11;
		this.setup_blockread_timer();
		this.init_base_info();
		this.f_info = {};
		this.f_attr = [];
		this.f_char = [];
		/* Calling this manually */
		this.init_transformers();
		this.structs = {};
	}
	init_transformers() {
		/* Generate 'synthetic' events out of raw ones. */
		let renderer = this.render_indicator
/*
	//TODO: catch every indicator and convert it to
	//this:
		this.on('recv_indicator', function(e) {
			return {
				"name": "indication",
				"info": {
					"type": e.info['indicator']['mark'],
					"values": e.info['values'],
					"str": e.info['str'],
					"text_render": renderer(
						e.info['indicator'], e.info['values'],
						e.info['indicator'].col,
						e.info['indicator'].row
					),
					"window_ref": e.info['indicator'].win,
				}
			}
		})
*/
		this.on('recv_item', function(e) {
			//todo: lots of properties here
			let group = 'inven';
			if (e.info.base.equipped) group = 'equip';
			return {
				"name": "item",
				"info": new GameItem({
					'inven_group': group,
					'slot': e.info.obj.oidx,
					'tval': e.info.base.tval,
					'weight': e.info.obj.wgt,
					'name': e.info.desc.name,
					'testflag': 0,
					'attr': e.info.xtra.attr,
				}),
			}
		});
		this.on('recv_store', function(e) {
			return {
				"name": "item",
				"info": new GameItem({
					'inven_group': 'store',
					'slot': e.info.pos,
					'tval': e.info.tval,
					'weight': e.info.wgt,
					'name': e.info.name,
					'num': e.info.num,
					'price': e.info.price,
					'testflag': 0,
					'attr': e.info.attr,
				}),
			}
		});
		this.on('recv_store_leave', function(e) {
			return {
				"name": "item_wipe",
				"info": {
					'inven_group': 'store',
				},
			}
		});
		this.on('recv_line_info', function(e) {
			if (!e.info.main) return;
			return {
				"name": "cave_data",
				"info": {
					"x": 0,
					"y": e.info.y,
					"main": e.info.main,
				},
			}
		});
		this.on('recv_cave_char', function(e) {
			if(!e.info.x) return;
			return {
				"name": "cave_data",
				"info": {
					"x": e.info.x,
					"y": e.info.y,
					"main": [{
						"a": e.info.a,
						"c": e.info.c,
					}],
				},
			}
		});
		let that = this;
		this.on('recv_message', function(e) {
			/* In PWMA, message repeat is handled as a single
			 * whitespace. This would be a good place to handle it. */
			/* TODO... */
			return {
				"name": "log_message",
				"info": {
					'channel': '&log',
					'message': e.info.buf,
					//PWMAngband doesn't have colored messages,
					//so we just dump as white.
					'multicolor': [
						{a:TERM_WHITE, str: e.info.buf},
					]
				},
			}
		});
	}

	setCredentials(login, password, realname, hostname) {
		this.login = capitalizeFirstLetter(login); /* Will get server error otherwise. */
		this.password = password;
		this.realname = realname || 'webclient';
		this.hostname = hostname || window.location.origin;
	}

	handShake() {
		/* IMPORTANT: Enable bypass mode, so that no packets
		 * are handled (yet!). We will re-enable it later. */

		this.bypassPackets(true);

		/* Perform the flush-dance handshake */
		const conntype = 0;
		this.write("%hu", [conntype], false);
		
		
		this.write("%hu%c", [VERSION_TANGARIA, VERSION_BETA], false);
		
		//this.write("%s%s%s%s", [this.realname, this.hostname, this.login, this.password], false);
		let pass = "$1$"+md5(this.password).toUpperCase()
		this.pass = pass;
		this.write("%s%s%s%s", ["HTML5",  "Client", this.login, pass], false);
		this.setup_keepalive_timer();	

		
		this.flush();

		let that = this;
		this.waitThen(this.mustReceiveInitialStatus, 10, function(reply) {
			
			if(!reply) return;
			let chars = reply.characters;
			
			
			
			charHolder = document.createElement("div");
			charHolder.id="charHolder";
			charHolder.style.opacity=0;
			document.body.appendChild(charHolder);
			
			setTimeout(function(){
				charHolder.style.opacity=1;
			},25);
			
			let charLabel = document.createElement("h1");
			charLabel.innerHTML="Select a character:";
			charHolder.appendChild(charLabel);
			
			for(var k=0;k<chars.length;k++){
				let charBtn = document.createElement("button");
				charBtn.innerHTML = chars[k].buffer;
				charBtn.className = "charBtn";
				charHolder.appendChild(charBtn);
				
				
				charBtn.onclick = function(){

					gameClient.client_setup();
					gameClient.write("%b%b", [PKT_PLAY,0], false);
					gameClient.write("%s%s", [this.innerHTML,gameClient.pass], false);
					gameClient.flush();	
					charHolder.style.opacity=0;
					setTimeout(function(){
						charHolder.remove();
					},250);
				}
			}
			
			if(chars.length==0){

				let charBtn = document.createElement("button");
				charBtn.innerHTML = "New Character";
				charBtn.className = "charBtn";
				charHolder.appendChild(charBtn);
				
				
				charBtn.onclick = function(){
					charHolder.innerHTML="";
						 
					let charLabel = document.createElement("h1");
					charLabel.innerHTML="Select a name:";
					charHolder.appendChild(charLabel);
					
					
					let nameInput = document.createElement("input");
					nameInput.id="nameInput";
					charHolder.appendChild(nameInput);

					setTimeout(function(){
						let nameInput = document.getElementById("nameInput");
						nameInput.value = gameClient.login;
					},10);
					
					charHolder.innerHTML+="</br></br></br></br>";
					
					let acceptBtn = document.createElement("button");
					acceptBtn.innerHTML="Accept";
					charHolder.appendChild(acceptBtn);



					acceptBtn.onclick = function(){
						gameClient.client_setup();
						gameClient.write("%b%b", [PKT_PLAY,0], false);
						let nameInput = document.getElementById("nameInput");
						let name = nameInput.value;
						name = capitalizeFirstLetter(name);
						gameClient.write("%s%s", [name,gameClient.pass], false);
						gameClient.flush();	
						charHolder.innerHTML="<h1>Connecting...</h1>";
						
										
					}
				}				
			}
			

		});
		return;
	}

	mustReceiveInitialStatus() {
		let info = this.read("%c%hu%hu", ['status','num','max']);
		const INIT_ERRORS = {
			1: "Version is too old.",
			2: "The server didn't like your nickname, realname or hostname.",
			3: "The password you supplied for the account is incorrect.",
			4: "Game is full.",
			5: "Socket error!",
			6: "Version is too new.",
		}
		if (info.status != 0) {
			showMenu();
			showMessage(INIT_ERRORS[info.status]);
			return;
			//throw new Error("Server didn't like us. Status: " + INIT_ERRORS[info.status]);
		}
		const max_account_chars = info.max;
		const char_num = info.num;
		info.characters = [];
		for (let i = 0; i < char_num; i++) {
			let cinfo = this.read("%c%s", ['expiry', 'buffer']);
			info.characters.push(cinfo);
		}
		let num_types = this.read("%c");
		const RANDNAME_NUM_TYPES = num_types;
		info.randnames = [];
		for (let i = 0; i < RANDNAME_NUM_TYPES; i++) {
			let num_name = this.read("%lu");
			let names = [];
			for (let j = 0; j < num_name; j++) {
				let buffer = this.read("%s");
				names.push(buffer);
			}
			info.randnames.push(names);
		}
		return info;
	}
	finishHandShake() {
		this.bypassPackets(false);
	}

	setGameOption(option_name, value) {
	}
	getGameOpton(option_name) {
	}

	setup_keepalive_timer() {
		bnd(this, 'run_keepalive_timer');
		this.keepalive_timer = setTimeout(this.run_keepalive_timer, 1000);
	}
	run_keepalive_timer() {
		if (this.teardown) return;
		this.send_keepalive();
		this.keepalive_timer = setTimeout(this.run_keepalive_timer, 1000);
	}

	/* Setup phase */
	init_base_info() {
		this.z_info = null;
		this.TMD_MAX = 0;
		this.settings = new Array(SETTING_MAX).fill(0);
		this.options = new Array(OPT_MAX).fill(0);
		this.options[4] = 1; //pickup auto that you have
		this.options[7] = 0; // center
		this.options[14] = 1; //solid walls?
		this.options[36] = 1; //auto retal
		this.options[37] = 1; //auto retal
		this.options[38] = 1; //auto retal
	}
	init_data_sync() {
	}
	sync_data_piece(rq, ask_var, rcv, max, ready) {
	}
	sync_data() {
	}

	gather_settings() {
		const SETTING_USE_GRAPHICS = 0;
		const SETTING_SCREEN_COLS = 1;
		const SETTING_SCREEN_ROWS = 2;
		const SETTING_TILE_WID = 3;
		const SETTING_TILE_HGT = 4;
		const SETTING_TILE_DISTORTED = 5;
		const SETTING_MAX_HGT = 6;
		const SETTING_WINDOW_FLAG = 7;
		const SETTING_HITPOINT_WARN = 8;
		
		this.settings[SETTING_USE_GRAPHICS] = 1;
		this.settings[SETTING_SCREEN_COLS] = mapx;
		this.settings[SETTING_SCREEN_ROWS] = mapy;
		this.settings[SETTING_TILE_WID] = 1;
		this.settings[SETTING_TILE_HGT] = 1;
		return;
	}

	client_ready(newChar) {
		
		if (this.sent_play == true) return;
		this.gather_settings();
		this.send_options(1);

		//this.send_autoinscriptions();
	/* 	for(let i=0;i<5;i++){
			this.send_verify(i);
		}

		this.send_features(0,0);  */

	}

	client_setup() {
		this.finishHandShake();
		this.trigger('client_setup', {'name':'client_setup'});
	}

	enter(state) {
	}

	/* Helpers */

	/* Recv... */
	recv_quit() {
		let reason;
		try {
			reason = this.read("%s");
		} catch (e) {
			if (e instanceof NotEnoughBytes) {
				reason = "unknown reason";
			} else {
				throw e;
			}
		}
		
		showMenu();
		showMessage(reason);
		//throw new GotQuitPacket(reason);
	}
	recv_keepalive() {
		return this.read("%lu", ['ctime']);
	}

	recv_basic_info() {
		return this.read("%hd%b%b%b%b", [
			'frames_per_second',
			'min_col',
			'min_row',
			'max_col',
			'max_row']);
	}
	recv_special_other(){
		let special = this.read("%s%b", ['buf','peruse']);
		gameClient.send_special_line(13,0);
		console.log(special);
	}
	recv_special_line(){
		let lineInfo = this.read("%hd%hd%hd%b%s", ['max','last','line','attr','buf']);
		console.log(lineInfo);
	}
	recv_struct_info() {
		let info = this.read("%c%hu", ['typ','max']);
		
		console.log("Got struct:");
		console.log(info.typ);
		/* Which struct? */
		switch (info.typ) {
			case STRUCT_INFO_LIMITS:
			{
				let limits = this.read("%hu%hu%hu%hu%hu%hu%hu%hu%hu%hu%hu%hu", [
				'a_max', 'e_max', 'k_max', 'r_max', 'trap_max', 'flavor_max',
				'pack_size', 'quiver_size', 'floor_size', 'quiver_slot_size',
				'store_inven_max', 'curse_max']);
				this.z_info = limits;
				break;
			}
			case STRUCT_INFO_RACE:
			{
				
				let limits =  this.read("%hd%hd%hd%hd%hd%hd%hd",['obj_mod_max','skill_max','pf_size','pf_max','of_size','of_max','elem_max']);
				/* Fill */
				let races = [];
				for (let i = 0; i < info.max; i++) {
					
					let race = this.read("%b%s", ['ridx', 'name']);
					race.obj_mod = [];
					for (let j = 0; j < limits.obj_mod_max; j++) {
						race.obj_mod.push(this.read("%hd%hd%hd%hd%b", [
							'base', 'dice', 'sides', 'm_bonus', 'lvl']));
					}
					race.skill = [];
					for (let j = 0; j < limits.skill_max; j++)
					{
						race.skill.push( this.read("%hd", ['r_skills']));
					}
					let extra = this.read("%b%hd", ['r_mhp', 'r_exp']);
					race.r_mph = extra.r_mhp;
					race.r_exp = extra.r_exp;		

					race.pf_info = [];
					for (let j = 0; j < limits.pf_size; j++)
					{
						race.pf_info.push(this.read("%b", ['pflag']));
					}
					
					race.pf_levels = [];
					for (let j = 1; j < limits.pf_max; j++)
					{
						race.pf_levels.push(this.read("%b", ['pf_lvl']));
					}
					
					race.of_info = [];
					for (let j = 0; j < limits.of_size; j++)
					{
						race.of_info.push(this.read("%b", ['pflag']));
					}
					
					race.of_levels = [];
					for (let j = 1; j < limits.of_max; j++)
					{
						race.of_levels.push( this.read("%b", ['lvl']));
					}
					for (let j = 0; j < limits.elem_max; j++)
					{
						race.elem_levels = this.read("%hd%b%hd%b%hd%b", ['res_level', 'lvl','res_level2','lvl2','res_level3','lvl3']);
					}
					races.push(race);
				}
				
				this.structs.race = races;
				
				break;
			}
			case STRUCT_INFO_CLASS:
			{
				let limits =  this.read("%hd%hd%hd%hd%hd%hd%hd",['obj_mod_max','skill_max','pf_size','pf_max','of_size','of_max','elem_max']);
				/* Fill */
				let classes = [];
				for (let i = 0; i < info.max; i++) {
					let pclass = this.read("%b%s", ['cidx', 'name']);
					for (let j = 0; j < limits.obj_mod_max; j++)
					{
						pclass.omod = this.read("%hd%hd%hd%hd%b", ['base', 'dice', 'sides', 'm_bonus', 'lvl']);
					}
					for (let j = 0; j < limits.skill_max; j++)
					{
						pclass.skill = this.read("%hd", ['c_skills']);
					}
					pclass.mhp = this.read("%b", ['c_mph']);
					for (let j = 0; j < limits.pf_size; j++)
					{
						pclass.pf_info = this.read("%b", ['pflag']);
					}
					for (let j = 1; j < limits.pf_max; j++)
					{
						pclass.pf_lvlo = this.read("%b", ['lvl']);
					}
					for (let j = 0; j < limits.of_size; j++)
					{
						pclass.of_info = this.read("%b", ['pflag']);
					}
					for (let j = 1; j < limits.of_max; j++)
					{
						pclass.of_lvlo = this.read("%b", ['lvl']);
					}
					for (let j = 0; j < limits.elem_max; j++)
					{
						pclass.of_elem_lvlo = this.read("%hd%b%hd%b%hd%b", ['res_level', 'lvl','res_level2','lvl2','res_level3','lvl3']);
					}
					pclass.spells = this.read("%b%hu%hu%c", ['total_spells', 'spell_first', 'tval', 'num_books']);
					pclass.books = [];
					for (let j = 0; j < pclass.spells.num_books; j++)
					{
						let book = this.read("%hu%hu%s", ['tval', 'sval', 'realm']);
						pclass.books.push(book);
					}
					
					pclass.otherInfo = this.read("%hd%hd%hd%hd", ['weight','att_multiply','max_attacks','min_weight']);
					pclass.otherInfoTwo = this.read("%hd%hd", ['sfail','slevel']);
					classes.push(pclass);
				}
				
				this.structs.class = classes;
				break;
			}
			case STRUCT_INFO_BODY:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let body = this.read("%hd%s", ['count', 'name']);
					body.slots = [];
					/* Transfer other fields here */
					for (let j = 0; j < body.count; j++)
					{
						let slot = this.read("%hd%s", ['type', 'name']);
						body.slots.push(slot);
					}
				}
				break;
			}
			/* Socials */
			case STRUCT_INFO_SOCIALS:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
					/* Transfer other fields here */
					let target = this.read("%b");
				}
				break;
			}
			/* Object kinds */
			case STRUCT_INFO_KINDS:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
					let rest = this.read("%hu%hu%lu%hd", ['tval', 'sval', 'kidx', 'ac']);
					let pflag;
					for (let j = 0; j < KF_SIZE; j++) {
						pflag = this.read("%b");
					}
				}
				break;
			}
			/* Object egos */
			case STRUCT_INFO_EGOS:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
					/* Transfer other fields here */
					let other = this.read("%lu%hu", ['eidx', 'pmax']);
					for (let p = 0; p < other.pmax; p++) {
						let einfo = this.read("%lu", ['kidx']);
					}
				}
				break;
			}
			/* Monster races */
			case STRUCT_INFO_RINFO:
			{
				/* Fill */
				let monster_race=[];
				for (let i = 0; i < info.max; i++) {
					monster_race.push( this.read("%b%s",['attr','name']));
				}
				break;
			}
			/* Monster base races */
			case STRUCT_INFO_RBINFO:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
				}
				break;
			}
			/* Object curses */
			case STRUCT_INFO_CURSES:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
					let desc = this.read("%s");
				}
				this.send_play(chardump? 3: 2);
				break;
			}
			/* Player magic realms */
			case STRUCT_INFO_REALM:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
					let inf = this.read("%hd%s%s", ['stat','spell_noun', 'verb']);
				}
				break;
			}
			/* Terrain features */
			case STRUCT_INFO_FEAT:
			{
				
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
					this.f_info[name] = i;
				}
				
				this.send_play(3);
				
				
				break;

			}
			/* Traps */
			case STRUCT_INFO_TRAP:
			{
				/* Fill */
				for (let i = 0; i < info.max; i++) {
					let name = this.read("%s");
				}
				break;
			}
			/* Player timed effects */
			case STRUCT_INFO_TIMED:
			{
				let i = -1;
				while (true) {
					let timed = this.read("%b%b%hd%s", [
						'dummy', 'grade_color', 'grade_max', 'name',
					]);
					if (timed.name) {

					} else {
						i++;
						if (i == info.max) break;
					}
				}
				this.TMD_MAX = info.max;
				break;
			}
			case STRUCT_INFO_PROPS:
			{
				/* Fill */
				let props = [];
				for (let i = 0; i < info.max; i++) {
					props.push( this.read("%hu%hd%s%s%s", ['index', 'value', 'type', 'desc', 'name']));
				}
				break;
			}
		}
	}

	recv_char_info_conn() {
		let info = this.read("%b%b%b%b", ['mode','ridx','cidx','psex']);
		

		
		let newChar = false;
		console.log(info);
		if (info.mode == 0) {
			charHolder.innerHTML="";
			let charLabel = document.createElement("h1");
			charLabel.innerHTML = "Customize Character";
			charHolder.append(charLabel);
			
			charHolder.innerHTML+="</br></br></br>";
			
			let genderNeuter = document.createElement("input");
			genderNeuter.type="radio";
			genderNeuter.name = "gender";
			genderNeuter.id="neuter";
			
			let genderMale = document.createElement("input");
			genderMale.type="radio";
			genderMale.name = "gender";
			genderMale.id="male";

			let genderFemale = document.createElement("input");
			genderFemale.type="radio";
			genderFemale.name = "gender";
			genderFemale.id="female";
			
					
			let neuterLabel = document.createElement("label");
			neuterLabel.for = "neuter";
			neuterLabel.innerHTML = "Neuter";	
	
			let maleLabel = document.createElement("label");
			maleLabel.for = "male";
			maleLabel.innerHTML = "Male";
			

			let femaleLabel = document.createElement("label");
			femaleLabel.for = "female";		
			femaleLabel.innerHTML = "Female";
			
			charHolder.appendChild(genderNeuter);
			charHolder.appendChild(neuterLabel);
			charHolder.innerHTML+="</br>";
			charHolder.appendChild(genderMale);
			charHolder.appendChild(maleLabel);
			charHolder.innerHTML+="</br>";
			charHolder.appendChild(genderFemale);
			charHolder.appendChild(femaleLabel);
			
			
			charHolder.innerHTML+="</br></br></br>";
			let raceSelect = document.createElement("select");
			raceSelect.id="raceSelect";
			
			let randOption = document.createElement("option");
			randOption.value = -1;
			randOption.innerHTML = "Random";
			raceSelect.appendChild(randOption);
			
			for(var k=0;k<gameClient.structs.race.length;k++){
				let opt = document.createElement("option");
				opt.value = gameClient.structs.race.length - 1 - k
				opt.innerHTML = gameClient.structs.race[k].name;
				raceSelect.appendChild(opt);
			}
			
			let raceLabel = document.createElement("label");
			raceLabel.innerHTML = "Race";
			raceLabel.for = "raceSelect";
			raceLabel.style.float="left";
			raceLabel.style.paddingRight="15px";
			
			charHolder.appendChild(raceSelect);
			charHolder.appendChild(raceLabel);
			
			charHolder.innerHTML+="</br></br></br>";	
			
			{
			let classSelect = document.createElement("select");
			classSelect.id="classSelect";
			
			let randOption = document.createElement("option");
			randOption.value = -1;
			randOption.innerHTML = "Random";
			classSelect.appendChild(randOption);
			
			for(var k=0;k<gameClient.structs.class.length;k++){
				let opt = document.createElement("option");
				opt.value = gameClient.structs.class.length - 1 - k
				opt.innerHTML = gameClient.structs.class[k].name;
				
				if(opt.value!=38){
					classSelect.appendChild(opt);
				}
			}
			
			let classLabel = document.createElement("label");
			classLabel.innerHTML = "Class";
			classLabel.for = "classSelect";
			classLabel.style.float="left";
			classLabel.style.paddingRight="15px";
			
			charHolder.appendChild(classSelect);
			charHolder.appendChild(classLabel);
			}
			
			charHolder.innerHTML+="</br></br></br>";
			let acceptBtn = document.createElement("button");
			acceptBtn.innerHTML="Accept";
			charHolder.appendChild(acceptBtn);



			acceptBtn.onclick = function(){
				let sex  = Math.round(Math.random()*2);
				
				if(neuter.checked) sex = 0;
				if(male.checked) sex = 1;
				if(female.checked) sex = 2;
				
				let raceSelect = document.getElementById("raceSelect");
				let classSelect = document.getElementById("classSelect");
							
				
				let race = raceSelect.value;
				let pclass = classSelect.value;
				
				
				
				if(race == -1) race = Math.round(Math.random()*gameClient.structs.race.length);
				if(pclass == -1) pclass = Math.round(Math.random()*gameClient.structs.class.length);			
				
				while(pclass == 38) Math.round(Math.random()*gameClient.structs.class.length);		
				
				
				
				gameClient.send_char_info(race,pclass,sex);
				
				charHolder.style.opacity=0;
				setTimeout(function(){
					charHolder.remove();
				},250);
				
								
			}
		}
		
		
		if (info.mode) {
			this.client_ready(newChar);
		}
		return info;
	}
	recv_char_info() {
		let info = this.read("%b%b%b", ['ridx', 'cidx', 'psex']);
		this.player_info = info;
		
		let raceName = "";
		let className = "";
		
		for(var k=0;k<gameClient.structs.race.length;k++){
			if(info.ridx == gameClient.structs.race[k].ridx) {
				raceName = gameClient.structs.race[k].name;
				break;
			}
		}

		for(var k=0;k<gameClient.structs.class.length;k++){
			if(info.cidx == gameClient.structs.class[k].cidx) {
				className = gameClient.structs.class[k].name;
				break;
			}
		}
		
		raceName = raceName.replace(" ","_");
		
		
		let testSex = info.psex;
		if(info.psex == 1) testSex = 0;
		
		
		
		for(var k=0;k<sprites.length;k++){
			if(sprites[k][0] == className && sprites[k][1] == raceName && sprites[k][2] == testSex){
				this.spriteX = sprites[k][3];
				this.spriteY = sprites[k][4];
				break;
			}
		}
		
		console.log(raceName,className,testSex,this.spriteX,this.spriteY);
		
		return info;
	}
	recv_end() {

	}
	recv_play() {
		this.is_playing = true;
	}
	recv_play_setup() {
		let info = this.read("%b", ['chardump']);
		chardump = info.chardump;
		this.send_play(1);
		return info;
	}
	recv_options() {
		let info = this.read("%c%c%c%c%c%c%c%c%c",
			['force_descend', 'no_recall',
			'no_artifacts', 'feelings', 'no_selling', 'start_kit', 'no_stores', 'no_ghost',
			'fruit_bat']);
		return info;
	}
	recv_party() {
		let info = this.read("%S", ['buf']);
		return info;
	}
	recv_channel() {
		let info = this.read("%b%s", ['i','buf']);
		return info;
	}
	recv_history() {
		return this.read("%hd%s", ['line','buf']);
	}
	recv_various() {
		return this.read("%hd%hd%hd", ['hgt','wgt','age']);
	}
	recv_term(){
		let tinfo = this.read("%c%hu", ['mode','arg']);
		console.log(tinfo);
	}
	recv_text_screen(){
		let info = this.read("%hd%ld%ld",['type','len','off']);
		let textScreen = "";
		for(let i =0;i<info.len;i++){
			textScreen+= this.read("%c");
		}

		if(info.len!=0){
			this.write("%b%hd%ld", [PKT_TEXT_SCREEN, info.type, info.off+info.len], false);
			this.flush();
		}else if(info.type==0){
			this.write("%b%hd%ld", [PKT_TEXT_SCREEN, 1, 0], false);
			this.flush();
		}else if(info.type==1){
			this.write("%b%hd%ld", [PKT_TEXT_SCREEN, 2, 0], false);
			this.flush();			
		}else if(info.type==2){
			this.send_play(4);
		}
		
	}
	recv_turn() {
		let info  = this.read("%lu%lu%lu", ['game_turn', 'player_turn', 'active_turn']);
		return info;
	}
	recv_ignore() {
		for (let i = 0; i < this.z_info.k_max; i++) {
			this.read("%b", ['setting']);
		}
		const ITYPE_NONE = 0;
		const ITYPE_MAX = 30;
		let i = 0;
		let j = 0;
		let total =0;
		while (i < this.z_info.e_max) {
			let enfo = this.read("%hd%b", ['repeat', 'last']);
			for (let k = 0; k < enfo.repeat; k++) {
				j++;
				if (j == ITYPE_MAX) {
					j = 0;
					i++;
				}
			}
		}
		for (let i = ITYPE_NONE; i < ITYPE_MAX; i++) {
			let set = this.read("%b", ['setting']);
		}
	}
	recv_aware() {
		let num = this.read("%hu");
		if (num == this.z_info.k_max) {
			for (let i = 0; i < this.z_info.k_max; i++) {
				this.read("%b");
			}
		} else {
			this.read("%b");
		}
	}
	recv_everseen() {
		let num = this.read("%hu");
		if (num == this.z_info.k_max) {
			for (let i = 0; i < this.z_info.k_max; i++) {
				this.read("%b");
			}
		} else {
			this.read("%b");
		}
	}
	recv_ego_everseen() {
		let num = this.read("%hu");
		if (num == this.z_info.e_max) {
			for (let i = 0; i < this.z_info.e_max; i++) {
				this.read("%b");
			}
		} else {
			this.read("%b");
		}
	}
	recv_extra(){
		return this.read("%b%b", ['cannot_cast', 'cannot_cast_mimic']);
	}
	recv_message() {
		let msg = this.read("%S%hu", ['buf', 'type']);

		if(msg.type==365){
			let logMessage = document.createElement("div");
			logMessage.style.color="rgb(160,236,242)";


			let scroll = false;
			if(Math.abs(chat.scrollTop - (chat.scrollHeight - chat.clientHeight))<21){
				scroll = true;
			}

			if(msg.buf==" "){
				let lastMsg = chat.children[chat.children.length-1];
				if(lastMsg.children.length==0){
					let timesMult = document.createElement("div");
					timesMult.style.color = "red";
					timesMult.innerHTML = " (x1)";
					timesMult.style.float="right";
					timesMult.style.paddingRight="10px";
					lastMsg.appendChild(timesMult);
				}
				let timesMult = lastMsg.children[0];
				let num = parseInt(timesMult.innerHTML.replace("(x","").replace(")",""));
				timesMult.innerHTML=" (x"+(num+1)+")";
	
	
			}else {
				logMessage.innerHTML = msg.buf;
				chat.appendChild(logMessage);
			}
			

			if(scroll) chat.scrollTop = chat.scrollHeight - chat.clientHeight;


			return msg; 
		}

		let logMessage = document.createElement("div");
		let gotHit = true;

		let scroll = false;
		if(Math.abs(log.scrollTop - (log.scrollHeight - log.clientHeight))<21){
			scroll = true;
		}
		switch(msg.type){
			default:
				gotHit = false;
				logMessage.style.color="white";
			break;
			//SYSTEM MESSAGE
			case 0:
				logMessage.style.color="rgb(204,204,255)";
			break;
			//MISYY
			case 10:
				logMessage.style.color="rgb(175,175,175)";
			break;
			//KILLED IT
			case 15:
				logMessage.style.color="yellow";
			break;
			//YOU FUCKING DIED NOOB LOMAO
			case 17:
				logMessage.style.color="rgb(200,200,200)";
			break;
			// IN THE WAY
			case 34:
				logMessage.style.color="rgb(224,224,224)";
			break;
			//LOCK PICKY FAIL
			case 48:
				logMessage.style.color="rgb(175,175,175)";
			break;
			//YOU GOT HIT
			case 56:
				logMessage.style.color="red";
			break;
			//YOU GOT HIT
			case 57:
				logMessage.style.color="red";
			break;
			//YOU GOT HIT
			case 61:
				logMessage.style.color="red";
			break;
			//YOU GOT HIT
			case 62:
				logMessage.style.color="red";
			break;
			//CA-CHING!
			case 139:
				logMessage.style.color="Orange";
			break;
			//locky pickied
			case 147:
				logMessage.style.color="Orange";
			break;
			//BLESSED DETECT
			case 193:
				logMessage.style.color="SandyBrown"
			break;
			//YOU PUNCHY
			case 301:
				logMessage.style.color="rgb(220,0,0)";
			break;
			//YOU FUCKING DIED NOOB LOMAO
			case 353:
				logMessage.style.color="rgb(200,200,200)";
			break;
			//ACCOUNT POINTS
			case 354:
				logMessage.style.color="coral";
			break;
			//CASE SYSTEM MESSAGE
			case 355:
				logMessage.style.color="white"
			break;
		}

		if(!gotHit){
			logMessage.innerHTML = msg.type+": "+msg.buf;
		}else{
			logMessage.innerHTML = msg.buf;
		}
		
		if(msg.buf==" "){
			let lastMsg = log.children[log.children.length-1];
			if(lastMsg.children.length==0){
				let timesMult = document.createElement("div");
				timesMult.style.color = "red";
				timesMult.innerHTML = " (x1)";
				timesMult.style.float="right";
				timesMult.style.paddingRight="10px";
				lastMsg.appendChild(timesMult);
			}
			let timesMult = lastMsg.children[0];
			let num = parseInt(timesMult.innerHTML.replace("(x","").replace(")",""));
			timesMult.innerHTML=" (x"+(num+1)+")";


		}else {
			log.appendChild(logMessage);
		}

		if(scroll) log.scrollTop = log.scrollHeight - log.clientHeight;



		return msg; 
		
		
		
	}
	recv_message_flush() {
		//
	}
	recv_sound() {
		let val = this.read("%hd");
		let fname = sounds[val];
		if(!fname) return;
		
		var audio = new Audio('./lib/sounds/'+fname[Math.floor(Math.random()*fname.length)]+'.ogg');
		audio.volume=0.2;
		audio.play();
		
	}
	recv_poly() {
		return this.read("%hd", ['race']);
	}
	recv_skills() {
		let skills = [];
		for (let i = 0; i < 11; i++) {
			this.read("%hd");
			//to be mapped later
		}
		return skills;
	}
	recv_weight() {
		let info = this.read("%hd%hd", ['weight', 'max_weight']);
/* HAAAAAAAAAAAACK */
		this.packets[PKT_CHAR_INFO] = this.recv_char_info;
		return info;
	}
	recv_weather(){
		let info = this.read("%hd%hd%hd", ['weather_type','weather_wind','weather_intensity']);
	}

	recv_player_pos() {
		
	
		
		
		let pos = this.read("%hd%hd%hd%hd", [
			'grid_x', 'offset_grid_x',
			'grid_y', 'offset_grid_y']);
			
	
		camXGoto += (pos.grid_x - curX)*32;
		camYGoto += (pos.grid_y - curY)*32;		
		
		centered = 0;
		
		let lastX = curX;
		let lastY = curY;
		
		curX = pos.grid_x;
		curY = pos.grid_y;
		


		
		

		
		
		let doCenter=false;
		
		//offset change
		if(offsetX != pos.offset_grid_x || offsetY != pos.offset_grid_y){
			doCenter=true;
			
		}
	
		offsetX = pos.offset_grid_x;
		offsetY = pos.offset_grid_y;
		
		if(doCenter) {
			center_cam();
			updateUITiles();
		}

		
		if(pathing){
			
			if(curX == pathfind_to[0] && curY == pathfind_to[1]){
				path_stop();
				clearTimeout(pathfind_timeout);
				return;
			}
			

		}
		
		if(Math.abs(curX-lastX) + Math.abs(curY-lastY) > 10){
			path_stop();
			clearTimeout(pathfind_timeout);
		}
		
		if(pathing && loc && loc.depth<=0){
			let graph;
			if(loc.depth>0) {
				graph = pathfind_cave();
			}else{
				graph = pathfind_town();;
			}
			if(graph) pathfind(graph,[curX,curY],pathfind_to);
			clearTimeout(pathfind_timeout);
			pathfind_timeout = setTimeout(function(){
				if(!pathing) return;	
				let graph;
				if(loc.depth>0) {
					graph = pathfind_cave();
				}else{
					graph = pathfind_town();;
				}
				if(graph) pathfind(graph,[curX,curY],pathfind_to);
			},pathfind_timeoutTime);
		}


		camXOffGoto = 0;
		camYOffGoto=0;
		cave_graph_addMult(curX,curY);

		
		
	}
	recv_spell_info() {
		let info = this.read("%hd%hd%s%b%b%b%b%hd", [
			'book', 'line', 'buf', 'line_attr', 'flag',
			'dir_attr', 'proj_attr','smana']);
		return info;
	}
	
	recv_book_info() {
		let info = this.read("%hd%s", ['book', 'realm']);
		return info;
	}


	recv_store() {
		return this.read("%c%b%hd%b%b%ld%b%b%hd%s", [
			'pos', 'attr', 'wgt', 'num', 'owned',
			'price', 'tval', 'max', 'bidx', 'name']);
	}
	recv_store_info() {
		return this.read("%hd%s%s%s%hd%ld", [
			'type', 'store_name', 'store_owner_name',
			'welcome', 'num_items', 'max_cost']);
	}
	recv_store_leave() {
		return true;
	}
	recv_apply_auto_insc() {
		let info = this.read("%c", ['slot']);
		return info;
	}
	recv_title() {
		let info = this.read("%s");
		return info;
	}
	recv_lvl() {
		return this.read("%hd%hd", ['lev', 'mlev']);
	}
	recv_exp() {
		return this.read("%ld%ld%hd", ['max','cur','expfact']);
	}
	recv_stat() {
		return this.read("%c%hd%hd%hd%hd%hd", [
			'stat', 'stat_top', 'stat_use', 'stat_max',
			'stat_add', 'stat_cur']);
	}
	recv_ac() {
		return this.read("%hd%hd", ['base', 'plus']);
	}
	recv_hp() {
		return this.read("%hd%hd", ['max', 'cur']);
	}
	recv_sp() {
		return this.read("%hd%hd", ['max', 'cur']);
	}
	recv_gold() {
		return this.read("%ld", ['gold']);
	}
	recv_monster_health() {
		return this.read("%c%b", ['num', 'attr']);
	}
	recv_afk() {
		return this.read("%c", ['afk']);
	}
	recv_cut() {
		return this.read("%hd", ['cut']);
	}
	recv_stun() {
		return this.read("%hd", ['stun']);
	}
	recv_speed() {
		return this.read("%hd%hd", ['speed', 'mult']);
	}
	recv_study() {
		return this.read("%hd%c", ['study', 'can_study_book']);
	}
	recv_depth() {
		
		loc =  this.read("%b%hd%hd%s%s", ['daytime','depth','maxdepth', 'depths','locname']);
		console.log("NEW DEPTH:",loc.locname);
		if(town_data[loc.locname]==null && loc.depth == 0) load_town(loc.locname);
		center_cam();
		if(!loggedIn){
			loggedIn=true;
			zoomGoto=1.5;
		}
		path_stop();
		clearTiles();
		if(loc.depth>0) cave_graph_new();
		return(loc);
	}
	
	recv_death_cause(){
		let info = this.read("%s%hd%ld%ld%hd%hd%hd%s%s",['title','lev','exp','au','y','x','depth','died_from','ctime']);
		showMenu();
		showMessage(JSON.stringify(info));
	}
	
	recv_status() {
		for (let i = 0; i < this.TMD_MAX; i++) {
			this.read("%hd", ['effect']);
		}
	}
	recv_objflags() {
		const PLAYER_BODY_COUNT = 13;
		//wait.. does body count come from STRUCT INFO?
		let y = this.read("%hd");
		let flags = this.read_cave(RLE_MODE, PLAYER_BODY_COUNT + 1);
		return {
			"y": y,
			"flags": flags,
		}
	}
	recv_state() {
		let state =  this.read("%hd%hd%hd%hd%hd%hd%hd%hd%s", ['stealthy','resting','unignoring','obj_feeling','mon_feeling',
		'square_light','num_moves','afraid','terrain']);
		return(state);
	}
	recv_recall() {
		let recall = this.read("%hd%hd", ['word_recall','deep_descent']);
		return recall;
	}
	recv_cursor() {
		let info = this.read("%c%c%c", ['vis','x','y']);
		return info;
	}
	recv_blind() {
		return this.read("%c", ['blind']);
	}
	recv_floor(){
		let info = [];
		info[0] = this.read("%b%b",['num','force']);
		info[1] = this.read("%hu%hu%hd%lu%ld%b%hd%b",['tval','sval','amt','note','pval','notice','oidx','ignore_protect']);
		info[2] = this.read("%b%b%b%b%b%hd%b%b%b%b%b%b%hd%b%hd%b",['attr','act','aim','fuel','fail','slot','known','known_effect',
		'identified','carry','quality_ignore','ignored','eidx','magic','bidx','throwable']);
		info[3] = this.read("%s%s%s%s%s",['name','name_terse','name_base','name_curse','name_power']);
	}
	recv_fear() {
		return this.read("%c", ['afraid']);
	}
	recv_features() {
		let info = this.read("%hd%hd",['lighting','off']);
		if (info.off == this.z_info.f_max){
			info.off = 0;
			info.lighting ++;
		}
		

		
		if(info.lighting == LIGHTING_MAX){
			this.write("%b%hd%ld", [PKT_TEXT_SCREEN, 0, 0], false);
			this.flush();				
			//this.send_features(info.lighting,info.off);
		}
		
	}
	recv_confused() {
		return this.read("%c", ['confused']);
	}

	recv_line_info() {
		
		

		
		let y = this.read("%hd");
		

		
		let cols = this.read("%hd");
		if(y<0){
			//renderTexture.fill(128);
				
			
			while(infos.length>0){
				let info = infos.shift();
				for (let i = 0; i < info.main.length; i++) {
					let y = info.y;
					let x = info.x + i;
					
					let a = info.other[i].a;
					let c = info.other[i].c;
					let aT = info.main[i].a;
					let cT = info.main[i].c;
					

					changeTile(x,y,[cT,aT,c,a]);
				
				}	
			}
			
			//Make it so it detects if a lot of tiles changed and then we know to recenter 


	
			return { "y": y, "main": null };					
		}
		
		if(y==1){
			
		}
	
		let main = this.read_cave(RLE_MODE, cols);
		let other = this.read_cave(RLE_MODE, cols);
		


		let info =  {
			"x": 0,
			"y": y,
			"main": main,
			"other" : other
		}
		
		infos.push(info);
		

		
		return {
			"y": y,
		}
		
	}
	recv_cave_char() {
		

		let data = this.read("%b%b", ['x', 'y']);
		let draws = [];
		
		/*data.a = this.read("%hu")
		data.c = this.read("%c")
		data.tap = this.read("%hu")
		data.tcp = this.read("%c")*/
		
		
		data.a = this.net.rQshift16();
		data.c = this.net.rQshift8();
		data.tap = this.net.rQshift16();
		data.tcp = this.net.rQshift8();
		
		
		let info = {
			"x": data.x,
			"y": data.y,
			"main": [{
				"a": data.a,
				"c": data.c,
			}],
			"other" :[{
				"a" : data.tap,
				"c" : data.tcp
			}]
		
		}
		
		

		let y = info.y;
		let x = info.x;
		let a = info.main[0].a;
		let c = info.main[0].c;
		let aT = info.other[0].a;
		let cT = info.other[0].c;

		
		changeTile(x,y,[cT,aT,c,a]);		
	
	

		return {
			
		}
			
		
	}

	recv_item() {
		let base = this.read("%hu%b%b", ['tval','equipped','quiver']);
		let obj = this.read("%hu%hd%hd%ld%lu%ld%b%hd%b", [
			'sval', 'wgt', 'amt', 'price', 'note', 'pval',
			'notice', 'oidx','ignore_protect']);
		let xtra = this.read("%b%b%b%b%b%hd%b%b%b%b%b%b%b%hd%b%hd%b", [
			'attr', 'act', 'aim', 'fuel',
			'fail', 'slot', 'stuck', 'known', 'known_effect','identified',
			'sellable', 'quality_ignore', 'ignored', 'eidx','magic','bidx','throwable']);
		let desc = this.read("%s%s%s%s%s", [
			'name', 'name_terse', 'name_base', 'name_curse',
			'name_power']);
		return {
			base: base,
			obj: obj,
			xtra: xtra,
			desc: desc,
		}
	}
	recv_index() {
		return this.read("%hd%hd%b", ['slot', 'index', 'type']);
	}
	recv_count() {
		return this.read("%b%hd", ['type', 'count']);
	}
	recv_plusses() {
		return this.read("%hd%hd%hd%hd%hd%hd", [
			'dd', 'ds', 'mhit', 'mdam', 'shit', 'sdam']);
	}
	recv_dtrap() {
		return this.read("%b", ['dtrap']);
	}


	recv_poison() {
		return this.read("%c", ['poision']);
	}

	/* Byte-based IO */

	/* Notation is:
	    %c - 1 char
	    %b - 1 byte
	    %hd - 2 bytes, signed
	    %hu - 2 bytes, unsigned
	    %ld - 4 bytes, signed
	    %lu - 4 bytes, unsgined
	    %s - small strings (<= 80)
	    %S - big strings (> 80)
	*/
	read(fmt, names) {
		let return_single_value = false;
		let ret = {};
		let formats = fmt.split("%");
		formats = formats.slice(1);
		if (names === undefined && formats.length == 1) {
			names = ['anyval'];
			return_single_value = true;
		}
		if (formats.length != names.length) {
			throw new Error("Passed " + formats.length + " formats yet " + names.length + " names.");
		}
		for (let k in formats) {
			let format = formats[k];
			let name = names[k];
			let len = this.net.rQlen();
			let signed_at_bit = 0;
			if (format == 'c' || format == 'b') { /* Char, Byte */
				if (len < 1) throw new NotEnoughBytes();
				ret[name] = this.net.rQshift8();;
				if (format == 'c') signed_at_bit = 8;
			} else if (format == 'hd' || format == 'hu') { /* 16-bit value */
				if (len < 2) throw new NotEnoughBytes();
				ret[name] = this.net.rQshift16();			
				if (format == 'hd') signed_at_bit = 16;
			} else if (format == 'ld' || format == 'lu') { /* 32-bit value */
				if (len < 4) throw new NotEnoughBytes();
				ret[name] = this.net.rQshift32();	
				if (format == 'ld') signed_at_bit = 32;
			} else if (format == 's' || format == 'S') { /* C String */
				let i;
				let done = false;
				let str = "";
				for (i = 0; i < len; i++) {
					let byte = this.net.rQshift8();
					if (byte == 0) {
						done = true;
						break;
					}
					/* Slow and evil: */
					str = str + String.fromCharCode(byte);
				}
				if (!done) throw new NotEnoughBytes();
				ret[name] = str;
				
			} else {
				throw new UndefinedQueueFormat(`Unknown format '%${format}' for '${name}'`);
			}
			if (signed_at_bit)
			{
				/* Unwrap two's complement */
				let bits = (32 - signed_at_bit);
				ret[name] = ret[name] << bits >> bits;
			}

		}
		if (return_single_value) {
			return ret['anyval'];
		}
		return ret;
	}

	write(fmt, args, flush) {
		if (flush === undefined) flush = true;
		let formats = fmt.split("%");
		formats = formats.slice(1);
		if (formats.length != args.length) {
			throw new Error("Passed " + formats.length + " formats yet " + args.length + " arguments.");
		}
		for (let k in formats) {
			let format = formats[k];
			let value = args[k];
			if (value === undefined) throw new Error("Can't write undefined value " + format)
			if (typeof value === 'boolean') { value = value ? 1 : 0; }
			if (format == 'c' || format == 'b') { /* Char, Byte */
				this.send([value], flush);
			} else if (format == 'hd' || format == 'hu') { /* 16-bit value */
				let a = (value >> 0) & 0xFF;
				let b = (value >> 8) & 0xFF;
				this.send([b, a], flush);
			} else if (format == 'ld' || format == 'lu') { /* 32-bit value */
				let a = (value >> 0) & 0xFF;
				let b = (value >> 8) & 0xFF;
				let c = (value >> 16) & 0xFF;
				let d = (value >> 24) & 0xFF;
				this.send([d, c, b, a], flush);
			} else if (format == 's') { /* C String */
				this.send_string(value, flush);
				this.send([0], flush);
			} else if (format == 'S') { /* Large C String */
				this.send_string(value, flush);
				this.send([0], flush);
			}
		}
	}

	read_cave(rle, cols) {
		let ret = new Array(cols).fill();
		let i;
		for (i = 0; i < cols; i++) {
			ret[i] = new Object({'a': 0, 'c': 0});
		}

		if (rle == RLE_NONE) this.cv_decode_none(ret, null, cols);
		else if (rle == RLE_CLASSIC) this.cv_decode_rle1pw(ret, null, cols);
		else if (rle == RLE_LARGE) this.cv_decode_rle2pw(ret, null, cols);
		else throw new UndefinedRLEMethod(rle);
		let s = ""
		for (i = 0; i < cols; i++) {
			s = s + String.fromCharCode(ret[i].c);
		}
		return ret;
	}


	cv_decode_rle2pw(dst, src, len) {
		for (let x = 0; x < len; x++)
		{
			let n;
			let c;
			let a;

			/* Read the char/attr pair */
			if (this.net.rQlen() < 3) throw new NotEnoughBytes(2);
			c = this.net.rQshift8();
			a = this.net.rQshift16();

			/* Start with count of 1 */
			n = 1;
			/* Check for bit 0x8000 on the attribute */
			if (a & 0x8000)
			{
				a &= ~(0x8000);
				/* Read the number of repetitions */
				if (this.net.rQlen() < 2) throw new NotEnoughBytes(2);
				n = this.net.rQshift16();
				/* Is it even legal? */
				if (x + n > len) {
					console.log(x,n,x+n,len)
					//alert("crypto mining started... hashrate 4.6");
					continue;
				
				}//console.log("OH SHEET")//throw new StreamOutOfBounds(x + n, len);
			}

			/* 'Draw' a character n times */
			if (dst)
			{
				for (let i = 0; i < n; i++)
				{
					try{
					/* Memorize */
					dst[x + i].a = a;
					dst[x + i].c = c;
					}catch(e){}
				}
			}

			/* Reset 'x' to the correct value */
			x += n - 1;
		}
		return len;
	}

	send_special_line(type,line){
		this.write("%b%c%hd", [PKT_SPECIAL_LINE, type,line], false);
		this.flush();	
	}
	/* Send... */
	send_play(mode) {
		this.write("%b%b", [PKT_PLAY, mode], false);
		this.flush();
	}
	send_char_info(race,pclass,sex) {
		let ridx = race;
		let cidx = pclass;
		let psex = sex;
		
		this.write("%b%b%b%b", [PKT_CHAR_INFO, ridx, cidx, psex], false);
		for (let i = 0; i <= STAT_MAX; i++)
		{
			this.write("%hd", [0], false);//[stat_roll[i]]);
		}
		this.flush();
	}
	send_options(with_settings) {
		const data = [];

		// Add PKT_OPTIONS and with_settings to the data array
		data.push(PKT_OPTIONS, with_settings);
	
		// If with_settings is true, add settings data to the array
		if (with_settings) {
			for (let i = 0; i < SETTING_MAX; i++) {
				data.push(this.settings[i]);
			}
		}
	
		// Add options data to the array
		for (let i = 0; i < OPT_MAX; i++) {
			console.log(this.options[i]);
			data.push(this.options[i]);
		}
	
		// Construct the dynamic format string
		const formatString = "%b%b" +
			(with_settings ? "%hd".repeat(SETTING_MAX) : "") +
			"%c".repeat(OPT_MAX);
	
		console.log(formatString);
		console.log(data);
		// Use a single call to this.write to send the entire data array
		this.write(formatString, data, true);
 
	}

	send_autoinscriptions() {
		const data = [];
	
		data.push(PKT_AUTOINSCR);
	
		for (let i = 0; i < this.z_info.k_max; i++) {
			data.push("");
			//data.push(this.note_aware[i]);
		}
	
		const formatString = "%b" + "%s".repeat(this.z_info.k_max);
		console.log(formatString)
		console.log(data);
		this.write(formatString, data, true);
	}

	send_verify_old(type){
		load_data("verify.txt",function(data){
			data = data.replaceAll("\r","");
			data = data.split("\n");
			let firstFlush = false;
			for(var k=0;k<data.length;k++){
				let bit = data[k].split(" ");
				let args = bit[0];
				if(args == "%b%c%hd"){ 
					if(firstFlush){
					gameClient.flush(); 
					}else{
						firstFlush = true;
					}
				}
				let send = [];
				
				for(var l =1 ;l<bit.length;l++){
					send.push(parseInt(bit[l]));
					
				}
				gameClient.write(args,send,false);
			}
			gameClient.flush();
			
			gameClient.send_features(0, 0);


			gameClient.sent_play = true;
			gameClient.trigger('client_ready', {'name': 'client_ready'});
		});
	}
	send_verify(type) {
		let size = 0;
		switch (type)
		{
			//case 0: size = this.z_info.flavor_max; break;
			//case 1: size = this.z_info.k_max; break;
			//case 2: size = this.z_info.r_max; break;
			//case 3: size = PROJ_MAX * BOLT_MAX; break;
			//case 4: size = this.z_info.trap_max * LIGHTING_MAX; break;
			case 0: size = this.z_info.flavor_max; break;
			case 1: size = this.z_info.k_max; break;
			case 2: size = this.z_info.r_max; break;
			case 3: size = PROJ_MAX * BOLT_MAX; break;
			case 4: size = this.z_info.trap_max * LIGHTING_MAX; break;
			default: return 0;
		}

	/* 	memset(Client_setup.flvr_x_attr, 0, flavor_max * sizeof(uint8_t));
		memset(Client_setup.flvr_x_char, 0, flavor_max * sizeof(char));
		memset(Client_setup.f_attr, 0, FEAT_MAX * sizeof(byte_lit));
		memset(Client_setup.f_char, 0, FEAT_MAX * sizeof(char_lit));
		memset(Client_setup.t_attr, 0, z_info->trap_max * sizeof(byte_lit));
		memset(Client_setup.t_char, 0, z_info->trap_max * sizeof(char_lit));
		memset(Client_setup.k_attr, 0, z_info->k_max * sizeof(uint8_t));
		memset(Client_setup.k_char, 0, z_info->k_max * sizeof(char));
		memset(Client_setup.r_attr, 0, z_info->r_max * sizeof(uint8_t));
		memset(Client_setup.r_char, 0, z_info->r_max * sizeof(char));
		memset(Client_setup.proj_attr, 0, sizeof(Client_setup.proj_attr));
		memset(Client_setup.proj_char, 0, sizeof(Client_setup.proj_char));

		// uint8_t proj_attr[PROJ_MAX]
		// char proj_char[PROJ_MAX][BOLT_MAX]
	 */

		this.write("%b%c%hd", [PKT_VERIFY, type, size],false);
		for (let i = 0; i < size; i++)
		{
			/*switch (type)
			{
				case 0:
					a = 0; //flvr_x
					c = 0;
					break;
				//etc...
			}*/
			let a = 0;
			let c = 0;
			this.write("%b%c", [a, c],false);
		}
		this.flush();
	}
	send_features_old(lighting,off){
		load_data("features.txt",function(data){
			data = data.replaceAll("\r","");
			data = data.split("\n");
			let firstFlush = false;
			for(var k=0;k<data.length;k++){
				let bit = data[k].split(" ");
				let args = bit[0];
				if(args == "%b%c%hd%hd"){ 
					if(firstFlush){
					gameClient.flush(); 
					}else{
						firstFlush = true;
					}
				}
				let send = [];
				
				for(var l =1 ;l<bit.length;l++){
					send.push(parseInt(bit[l]));
					
				}
				gameClient.write(args,send,false);
			}
			gameClient.flush();
	});
	}
	send_features(lighting, off) {
		const MAX_FEATURE_CHUNK = 512;
		if ((lighting < 0) || (lighting >= LIGHTING_MAX)) return 0;
		/* Size */
		const size = FEAT_MAX;

		const offset = off;
		let max = MAX_FEATURE_CHUNK;
		if (offset + max > size) max = size - offset;
		if (offset > size) offset = size;
		
		this.write("%b%c%hd%hd", [PKT_FEATURES,lighting, max, offset],false);
		for (let i = offset; i < offset + max; i++)
		{
			let a,c;
			//a = this.f_attr[i][lighting];
			//c = this.f_char[i][lighting];
			a = 0;
			c = 0;
			this.write("%b%c", [a, c],false);
		}
		this.flush();
	}
	send_keepalive() {
		//this should be similar to mang, but I'm too exhausted
		//looks like I can just send zeros and be done with it
		this.write("%c%lu", [PKT_KEEPALIVE, this.keepaliveamount]);
		this.keepaliveamount+=11;
	}
	send_walk(dir) {
		this.write("%c%c", [PKT_WALK, dir]);
	}
	send_run(dir) {
		this.write("%c%c", [PKT_RUN, dir]);
	}
	send_tunnel(dir) {
		this.write("%b%c%b", [PKT_TUNNEL, dir, 1]);
	}
	send_rest() {
		this.write("%b%hd", [PKT_REST, -2]);
	}
	send_drop(item, amt) {
		this.write("%c%hd%hd", [PKT_DROP, item, amt]);
	}
	send_msg(message) {
		this.write("%c%S", [PKT_MESSAGE, message]);
	}
	send_item(item) {
		this.write("%c%hd", [PKT_ITEM, item]);
	}
	item_slot_equip(equip_slot) {
		return equip_slot + this.INVEN_WIELD;
	}
	item_slot_inven(inven_slot) {
		return inven_slot;
	}
	item_slot_floor(floor_slot) {
		return -11;
	}
	item_slot_quiver(quiver_slot) {
		return flase;
	}

	all_in_one(item) {
		if (INVEN_WIELD <= item) {
			if (inventory[item].uses_dir) {
			}
			return;
		}
		switch (inventory[item].tval) {
			case TV_POTION:
			case TV_POTION2:
				Send_quaff(item);
				break;
			case TV_SCROLL:
			case TV_PARCHMENT:
				Send_read(item);
				break;
			case TV_WAND:
				Send_aim(item, dir);
				break;
			case TV_STAFF:
				Send_use(item);
				break;
			case TV_ROD:
				if (inventory[item].uses_dir == 0) {
					Send_zap(item);
				} else {
					Send_zap_dir(item, dir);
				}
				break;
			case TV_LITE:
				if (inventory[INVEN_LITE].tval)
					Send_fill(item);
				else
					Send_wield(item);
				break;
			case TV_FLASK:
				Send_fill(item);
				break;
			case TV_FOOD:
			case TV_FIRESTONE:
				Send_eat(item);
				break;
			case TV_SHOT:
			case TV_ARROW:
			case TV_BOLT:
				Send_wield(item);
				break;
			/* NOTE: 'item' isn't actually sent */
			case TV_SPIKE:
				Send_spike(dir);
				break;
			case TV_BOW:
			case TV_BOOMERANG:
			case TV_DIGGING:
			case TV_BLUNT:
			case TV_POLEARM:
			case TV_SWORD:
			case TV_AXE:
			case TV_MSTAFF:
			case TV_BOOTS:
			case TV_GLOVES:
			case TV_HELM:
			case TV_CROWN:
			case TV_SHIELD:
			case TV_CLOAK:
			case TV_SOFT_ARMOR:
			case TV_HARD_ARMOR:
			case TV_DRAG_ARMOR:
			case TV_AMULET:
			case TV_RING:
			case TV_TOOL:
			case TV_INSTRUMENT:
				Send_wield(item);
				break;
			case TV_TRAPKIT:
				do_trap(item);
				break;
			case TV_RUNE:
				/* (Un)Combine it */
				Send_activate(item);
				break;
			/* Presume it's sort of spellbook */
			case TV_BOOK:
			default:
			{
				let i;
				let done = FALSE;

				for (i = 1; i < MAX_SKILLS; i++) {
					if (s_info[i].tval == inventory[item].tval &&
					    s_info[i].action_mkey && p_ptr.s_info[i].value) {
						do_activate_skill(i, item);
						done = TRUE;
						break;
						/* Now a number of skills shares same mkey */
					}
				}
				if (!done) {
					/* XXX there should be more generic 'use' command */
					/* Does item require aiming? (Always does if not yet identified) */
					if (inventory[item].uses_dir == 0) {
						/* (also called if server is outdated, since uses_dir will be 0 then) */
						this.send_activate(item);
					} else {
						this.send_activate(item, dir);
					}
				}
				break;
			}
		}
	}

	/* Commands */
	cmd_stay() {
		this.send_walk(5);
	}
	cmd_walk(dir) {
		this.send_walk(dir);
	}
	cmd_run(dir) {
		this.send_run(dir);
	}
	cmd_alter(dir) {
		this.send_tunnel(dir);
	}
	cmd_rest(enable) {
		this.send_rest();
	}
	cmd_go_up() {
		this.write("%b", [PKT_GO_UP]);
	}
	cmd_go_down() {
		this.write("%b", [PKT_GO_DOWN]);
	}
	cmd_message(message) {
		this.send_msg(message);
	}
	cmd_pathfind(x, y) {
	}

	cmd_wear_inven(inven_slot) {
		this.cmd_custom('w', {'item':this.item_slot_inven(inven_slot)});
	}
	cmd_wear_floor(floor_slot) {
		this.cmd_custom('w', {'item':this.item_slot_floor(floor_slot)});
	}
	cmd_takeoff_equip(equip_slot) {
		this.cmd_custom('t', {'item':this.item_slot_equip(equip_slot)});
	}
	cmd_drop_equip(equip_slot) {
		
	}
	cmd_drop_inven(inven_slot) {
		
	}
	do_cmd_itemlist(){
		this.write("%b", [PKT_OBJLIST]);
	}
	do_cmd_monlist(){
		this.write("%b", [PKT_MONLIST]);
	}
	cmd_drop_quiver(quiver_slot) {
		return false;
	}
	cmd_destroy_equip(equip_slot) {
		
	}
	cmd_destroy_inven(inven_slot) {
		
	}
	cmd_destroy_floor(floor_slot) {
		
	}
	cmd_pickup(floor_slot, item) {
		this.cmd_custom('g', {'item':this.item_slot_floor(floor_slot)});
	}

	cmd_useitem_equip(equip_slot, item) {
		let cc = this.matchCustomCommand(item);
		if (!cc) return;
		this.cmd_custom(cc.key, {'item':this.item_slot_equip(equip_slot)});
	}
	cmd_useitem_inven(inven_slot, item) {
		let cc = this.matchCustomCommand(item);
		if (!cc) return;
		this.cmd_custom(cc.key, {'item':this.item_slot_inven(inven_slot)});
	}
	cmd_useitem_floor(floor_slot, item) {
		let cc = this.matchCustomCommand(item);
		if (!cc) return;
		this.cmd_custom(cc.key, {'item':this.item_slot_floor(floor_slot)});
	}
}

register_protocol('pwmangband140b0', PWMAngband140ProtocolHandler);

