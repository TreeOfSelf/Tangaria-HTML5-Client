/* Packets sent to the client */packetNum = 1; const PKT_BASIC_INFO = packetNum++;
const PKT_END = packetNum++;
const PKT_STRUCT_INFO = packetNum++;
const PKT_DEATH_CAUSE = packetNum++;
const PKT_WINNER = packetNum++;
const PKT_LEV = packetNum++;
const PKT_WEIGHT = packetNum++;
const PKT_PLUSSES = packetNum++;
const PKT_AC = packetNum++;
const PKT_EXP = packetNum++;
const PKT_GOLD = packetNum++;
const PKT_HP = packetNum++;
const PKT_SP = packetNum++;
const PKT_VARIOUS = packetNum++;
const PKT_STAT = packetNum++;
const PKT_INDEX = packetNum++;
const PKT_ITEM_REQUEST = packetNum++;
const PKT_TITLE = packetNum++;
const PKT_TURN = packetNum++;
const PKT_EXTRA = packetNum++;
const PKT_DEPTH = packetNum++;
const PKT_STATUS = packetNum++;
const PKT_RECALL = packetNum++;
const PKT_STATE = packetNum++;
const PKT_LINE_INFO = packetNum++;
const PKT_SPEED = packetNum++;
const PKT_STUDY = packetNum++;
const PKT_COUNT = packetNum++;
const PKT_SHOW_FLOOR = packetNum++;
const PKT_CHAR = packetNum++;
const PKT_SPELL_INFO = packetNum++;
const PKT_BOOK_INFO = packetNum++;
const PKT_FLOOR = packetNum++;
const PKT_SPECIAL_OTHER = packetNum++;
const PKT_STORE = packetNum++;
const PKT_STORE_INFO = packetNum++;
const PKT_TARGET_INFO = packetNum++;
const PKT_SOUND = packetNum++;
const PKT_MINI_MAP = packetNum++;
const PKT_SKILLS = packetNum++;
const PKT_PAUSE = packetNum++;
const PKT_MONSTER_HEALTH = packetNum++;
const PKT_AWARE = packetNum++;
const PKT_EVERSEEN = packetNum++;
const PKT_EGO_EVERSEEN = packetNum++;
const PKT_CURSOR = packetNum++;
const PKT_OBJFLAGS = packetNum++;
const PKT_SPELL_DESC = packetNum++;
const PKT_DTRAP = packetNum++;
const PKT_TERM = packetNum++;
const PKT_PLAYER = packetNum++;
const PKT_MINIPOS = packetNum++;
const PKT_MESSAGE_FLUSH = packetNum++;
/* Packets sent from the client */ const PKT_WEATHER = packetNum++;
const PKT_SLASH_FX = packetNum++;
const PKT_VERIFY = packetNum++;
const PKT_ICKY = packetNum++;
const PKT_SYMBOL_QUERY = packetNum++;
const PKT_POLY_RACE = packetNum++;
const PKT_BREATH = packetNum++;
const PKT_WALK = packetNum++;
const PKT_RUN = packetNum++;
const PKT_TUNNEL = packetNum++;
const PKT_AIM_WAND = packetNum++;
const PKT_DROP = packetNum++;
const PKT_IGNORE_DROP = packetNum++;
const PKT_FIRE = packetNum++;
const PKT_PICKUP = packetNum++;
const PKT_DESTROY = packetNum++;
const PKT_TARGET_CLOSEST = packetNum++;
const PKT_SPELL = packetNum++;
const PKT_OPEN = packetNum++;
const PKT_QUAFF = packetNum++;
const PKT_READ = packetNum++;
const PKT_TAKE_OFF = packetNum++;
const PKT_USE = packetNum++;
const PKT_THROW = packetNum++;
const PKT_WIELD = packetNum++;
const PKT_ZAP = packetNum++;
const PKT_TARGET = packetNum++;
const PKT_INSCRIBE = packetNum++;
const PKT_UNINSCRIBE = packetNum++;
const PKT_ACTIVATE = packetNum++;
const PKT_DISARM = packetNum++;
const PKT_EAT = packetNum++;
const PKT_FILL = packetNum++;
const PKT_LOCATE = packetNum++;
const PKT_MAP = packetNum++;
const PKT_STEALTH_MODE = packetNum++;
const PKT_QUEST = packetNum++;
const PKT_CLOSE = packetNum++;
const PKT_GAIN = packetNum++;
const PKT_GO_UP = packetNum++;
const PKT_GO_DOWN = packetNum++;
const PKT_DROP_GOLD = packetNum++;
const PKT_REDRAW = packetNum++;
const PKT_REST = packetNum++;
const PKT_GHOST = packetNum++;
const PKT_SUICIDE = packetNum++;
const PKT_STEAL = packetNum++;
const PKT_MASTER = packetNum++;
const PKT_MIMIC = packetNum++;
const PKT_CLEAR = packetNum++;
const PKT_OBSERVE = packetNum++;
const PKT_STORE_EXAMINE = packetNum++;
const PKT_ALTER = packetNum++;
const PKT_FIRE_AT_NEAREST = packetNum++;
const PKT_JUMP = packetNum++;
const PKT_SOCIAL = packetNum++;
const PKT_MONLIST = packetNum++;
const PKT_FEELING = packetNum++;
const PKT_INTERACTIVE = packetNum++;
const PKT_FOUNTAIN = packetNum++;
const PKT_TIME = packetNum++;
const PKT_OBJLIST = packetNum++;
const PKT_CENTER = packetNum++;
const PKT_TOGGLE_IGNORE = packetNum++;
const PKT_USE_ANY = packetNum++;
const PKT_STORE_ORDER = packetNum++;
const PKT_TRACK_OBJECT = packetNum++;
const PKT_FLOOR_ACK = packetNum++;
const PKT_MONWIDTH = packetNum++;
/* Packets sent from either the client or server */ const PKT_PLAY = packetNum++;
const PKT_QUIT = packetNum++;
const PKT_FEATURES = packetNum++;
const PKT_TEXT_SCREEN = packetNum++;
const PKT_KEEPALIVE = packetNum++;
const PKT_CHAR_INFO = packetNum++;
const PKT_OPTIONS = packetNum++;
const PKT_CHAR_DUMP = packetNum++;
const PKT_MESSAGE = packetNum++;
const PKT_ITEM = packetNum++;
const PKT_SELL = packetNum++;
const PKT_PARTY = packetNum++;
const PKT_SPECIAL_LINE = packetNum++;
const PKT_FULLMAP = packetNum++;
const PKT_POLY = packetNum++;
const PKT_PURCHASE = packetNum++;
const PKT_STORE_LEAVE = packetNum++;
const PKT_STORE_CONFIRM = packetNum++;
const PKT_IGNORE = packetNum++;
const PKT_FLUSH = packetNum++;
const PKT_CHANNEL = packetNum++;
const PKT_HISTORY = packetNum++;
const PKT_AUTOINSCR = packetNum++;
const PKT_PLAY_SETUP = packetNum++;