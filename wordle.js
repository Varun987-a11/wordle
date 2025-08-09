/*
  Refined wordle.js
  - Proper input handling (letters, backspace, enter)
  - Duplicate-letter handling (correct/present/absent)
  - Friendly messages and accessible aria-live
  - New Game button reloads
*/

/* ------------------ Configuration ------------------ */
const HEIGHT = 6;
const WIDTH = 5;

/* ------------------ Word list ------------------ */
/* For brevity I include a modest sample below.
   Replace / extend this array with your full list if desired. */
const words = [
  "abide","about","above","acorn","actor","acute","admit","adore","adult","after",
  "again","agent","agree","ahead","alarm","album","alert","alike","alive","allow",
  "alone","along","altar","amber","amend","angel","anger","angle","ankle","apple",
  "apply","apron","arbor","argue","arise","armor","aroma","array","arrow","aside",
  "asset","atlas","attic","audio","audit","augur","aunty","awake","award","aware",
  "badly","bagel","baker","balmy","bandy","banjo","barge","basil","basis","beach",
  "beads","beard","beast","began","begin","being","belly","bench","berry","birth",
  "black","blade","blame","bland","blank","blast","blaze","bleak","blend","bless",
  "blimp","blind","blink","bliss","block","blood","bloom","blown","bluer","bluff",
  "blunt","blush","board","boast","bonus","boost","booth","booty","borne","bossy",
  "bough","bound","bowel","boxer","brace","brain","brake","brand","brash","brass",
  "brave","bread","break","breed","brick","bride","brief","bring","brink","brisk",
  "broad","broil","broke","brown","brush","brute","buddy","build","built","bulky",
  "bunch","bunny","burly","burnt","burst","bushy","buyer","cabin","cable","cache",
  "cadet","cagey","camel","cameo","canal","candy","canoe","canon","cargo","carol",
  "carry","carve","catch","cater","cause","cease","cedar","chain","chair","chalk",
  "champ","chant","chaos","charm","chart","chase","cheap","check","cheek","cheer",
  "chess","chest","chief","child","chili","chill","china","choir","choke","chord",
  "chunk","civil","claim","class","clean","clear","clerk","click","cliff","climb",
  "cling","clock","clone","close","cloth","cloud","clown","coach","coast","cobra",
  "color","comet","comic","comma","coral","couch","could","count","court","cover",
  "crack","craft","crane","crash","crate","crawl","craze","crazy","creak","cream",
  "creek","creep","crepe","crest","cried","crime","crisp","cross","crowd","crown",
  "crude","cruel","crumb","crush","crust","cubic","cumin","curly","curse","curve",
  "cycle","daily","dairy","daisy","dance","dandy","dated","dealt","death","debut",
  "decal","decay","decor","defer","delve","demon","dense","depot","depth","derby",
  "devil","diary","digit","diner","dingy","dirty","ditch","diver","dizzy","donor",
  "doubt","dough","dozen","draft","drain","drake","drama","drawn","dream","dress",
  "drift","drill","drink","drive","droll","drone","drool","droop","drove","drown",
  "druid","drunk","dryer","eager","eagle","early","earth","easel","ebony","edict",
  "eight","elbow","elder","elect","elite","elope","email","empty","enact","endow",
  "enemy","enjoy","enter","entry","envoy","equal","equip","erase","error","erupt",
  "essay","ester","ethic","evade","event","every","evict","exact","exalt","excel",
  "exert","exile","exist","expel","extra","fable","facet","faint","fairy","faith",
  "false","fancy","farce","fatal","fatty","fault","feast","fence","ferry","fetch",
  "fever","fewer","fiber","field","fiery","fifth","fifty","fight","final","finch",
  "first","fizzy","flair","flake","flame","flank","flare","flash","flask","fleet",
  "flesh","flick","flint","flock","flood","floor","flora","flour","flown","fluff",
  "fluid","flute","focus","foggy","folly","force","forge","forte","forth","forty",
  "found","frame","fraud","fresh","friar","fried","frill","frisk","frock","front",
  "frost","fruit","fudge","fully","fungi","funky","funny","furor","furry","fussy",
  "gaily","gamer","gamma","gamut","gauge","gaunt","gavel","gears","geese","genie",
  "genre","ghost","giant","giddy","gipsy","girly","given","glade","gland","glare",
  "glass","glaze","gleam","glean","glide","globe","gloom","glory","glove","gnome",
  "goose","grace","grade","grain","grand","grant","grape","graph","grasp","grass",
  "grate","grave","gravy","great","greed","green","greet","grief","grill","grind",
  "groan","grove","growl","grown","guard","guess","guest","guide","guild","guilt",
  "gully","gumbo","gusto","habit","hairy","halve","hands","handy","happy","harsh",
  "haste","hatch","haunt","haven","havoc","hazel","heart","heavy","hedge","heist",
  "hello","herbs","heroic","hilly","hinge","hoard","hobby","holly","honey","honor",
  "hoist","horde","horny","horse","hotel","hound","house","hover","human","humid",
  "humor","hurry","husky","hyena","icing","ideal","idiom","idler","image","imply",
  "inbox","incur","index","infer","input","inter","intro","ionic","irony","issue",
  "ivory","jelly","jewel","joint","joker","jolly","judge","juice","juicy","jumbo",
  "jumpy","junta","juror","karma","kayak","keeps","kettle","keyed","khaki","kiosk",
  "kitty","knack","kneel","knife","knock","known","koala","label","labor","laden",
  "lager","lance","lanky","large","laser","later","laugh","layer","learn","lease",
  "leash","least","leave","ledge","lemon","level","lever","light","liken","limbo",
  "limit","linen","liner","liver","livid","loamy","lobby","local","lofty","logic",
  "loner","loose","lorry","louse","lover","lower","loyal","lucky","lunar","lunch",
  "lunge","lupus","lurch","lurid","lusty","lying","lyric","macro","madam","madly",
  "maize","major","maker","mango","manor","maple","march","marry","mason","match",
  "mater","maths","medal","media","melee","melon","mercy","merge","merit","merry",
  "metal","meter","micro","mimic","minor","minus","mixed","model","modem","moist",
  "molar","moldy","money","month","moody","moose","moral","moron","morph","mossy",
  "motor","motto","mount","mourn","mouse","mouth","mover","movie","mower","muckr",
  "mummy","mural","music","musty","myrrh","nadir","nanny","nasal","nasty","naval",
  "needy","neigh","nerve","never","newer","newly","nicer","niche","night","ninja",
  "noble","noise","north","nosey","notch","novel","nudge","nurse","nutty","oasis",
  "ocean","occur","offer","often","olden","older","olive","omega","onion","onset",
  "opera","orbit","order","organ","other","otter","ounce","outer","owner","oxide",
  "ozone","paddy","pagan","paint","paler","palsy","panel","panic","pansy","pants",
  "papal","paper","parka","party","pasta","paste","patch","patio","payer","peace",
  "peach","pearl","pecan","pedal","penal","penny","perch","peril","petal","petty",
  "phase","phone","photo","piano","piece","piety","piggy","pilot","pinch","piney",
  "pinky","pinto","piper","pitch","pivot","pixel","place","plaid","plain","plane",
  "plant","plate","plead","plied","plonk","pluck","plumb","plume","plush","poesy",
  "point","poise","poker","polar","polka","polyp","pooch","porch","poser","posse",
  "pouch","pound","power","prank","press","price","pride","prime","print","prior",
  "prism","privy","prize","probe","prone","proof","props","prose","proud","prove",
  "prowl","proxy","psalm","puffy","pulse","punch","pupil","puppy","puree","purer",
  "purge","purse","pushy","putty","pygmy","quack","quail","quake","qualm","quart",
  "queen","queer","quell","query","quest","quick","quiet","quill","quilt","quirk",
  "quite","quota","quote","rabid","racer","radar","radio","rainy","raise","rally",
  "ranch","range","rapid","rarer","raspy","rated","ratio","raven","reach","react",
  "ready","realm","rearm","rebar","rebel","rebus","recur","redeem","refer","refit",
  "regal","rehab","reign","relax","relay","relic","remit","renew","repay","reply",
  "reset","resin","retro","retry","reuse","revel","rhino","rhyme","rider","ridge",
  "rifle","right","rigid","rinse","risky","rival","river","roach","roast","robin",
  "robot","rocky","rogue","roman","roomy","roost","rotor","rouge","rough","round",
  "route","rover","rowdy","royal","rugby","ruler","rumor","runny","rural","rusty",
  "sadly","safer","saint","salad","sally","salon","salsa","salty","salve","samey",
  "sandy","saner","sassy","satin","sauce","sauna","saved","saver","scale","scalp",
  "scare","scarf","scary","scene","scent","scope","score","scorn","scout","scrap",
  "screw","scrub","seams","sears","seats","sedan","seeds","seeks","seems","seize",
  "sells","semen","sends","sense","serif","serum","serve","setup","seven","sever",
  "sewed","sewer","shack","shade","shaft","shake","shaky","shale","shall","shame",
  "shank","shape","share","shark","sharp","shave","shawl","shear","sheen","sheep",
  "sheer","sheet","shelf","shell","shift","shine","shiny","shirt","shoal","shock",
  "shoes","shone","shook","shoot","shore","short","shout","shove","shown","showy",
  "shrub","shrug","shuck","shush","shyly","sicko","siege","sieve","sight","sigma",
  "signs","silky","silly","since","sings","siren","sites","sixth","sixty","sized",
  "sizes","skate","skies","skill","skimp","skins","skirt","skull","slack","slain",
  "slang","slant","slash","slate","slave","sleek","sleep","sleet","slice","slick",
  "slide","slime","sling","slink","sloop","slope","sloth","slump","small","smart",
  "smash","smear","smell","smelt","smile","smirk","smoke","smoky","snack","snake",
  "snaky","snare","snarl","sneak","sneer","snide","snipe","snore","snort","snout",
  "snowy","snuff","soapy","sober","socko","socks","sofas","softy","solar","solid",
  "solve","sonar","songs","sonic","sooth","sooty","sorry","sound","south","space",
  "spade","spare","spark","spasm","spawn","speak","spear","speck","speed","spell",
  "spend","spent","sperm","spice","spicy","spied","spies","spike","spill","spine",
  "spiny","spire","spite","split","spoil","spoke","spoon","spore","sport","spots",
  "spout","spray","spree","sprig","spunk","spurn","spurt","squad","squat","squib",
  "stack","staff","stage","staid","stain","stair","stake","stale","stalk","stall",
  "stamp","stand","stank","stare","start","stash","state","stave","stead","steak",
  "steal","steam","steed","steel","steep","steer","stein","stern","stick","stiff",
  "still","stilt","sting","stink","stint","stock","stoic","stoke","stole","stone",
  "stony","stood","stool","stoop","store","storm","story","stout","stove","strap",
  "straw","stray","strew","strip","strum","strut","stuck","study","stuff","stump",
  "stung","stunk","stunt","style","suave","sugar","suite","sulky","sunny","super",
  "surge","surly","swami","swamp","swarm","swash","swath","swear","sweat","sweep",
  "sweet","swell","swept","swift","swill","swine","swing","swirl","swish","swoon",
  "swoop","sword","sworn","synod","syrup","table","taboo","tacit","tacky","taffy",
  "tails","taint","taken","taker","tally","talon","tamer","tango","tangy","taper",
  "tapir","tardy","tarot","taste","tasty","taunt","tawny","teach","teary","tease",
  "teddy","teeth","tempo","tenor","tense","tenth","tepee","terse","testy","thank",
  "theft","their","theme","there","these","thick","thief","thigh","thing","think",
  "third","thong","thorn","those","three","threw","throb","throw","thrum","thumb",
  "thump","tiara","tibia","tidal","tiger","tight","tilde","timer","timid","tipsy",
  "tired","title","toast","today","token","tonal","tonga","tonic","tooth","topaz",
  "topic","torch","torso","total","totem","touch","tough","towel","tower","toxic",
  "trace","track","tract","trade","trail","train","trait","tramp","trash","tread",
  "treat","trend","triad","trial","tribe","trick","tried","tripe","trite","troll",
  "troop","trope","trout","truce","truck","truly","trump","trunk","truss","trust",
  "truth","tulip","tummy","tumor","tuned","tuner","tunic","turbo","turns","tutor",
  "twang","tweak","tweed","tweet","twice","twine","twirl","twist","twixt","tying",
  "udder","ultra","uncle","uncut","under","undue","unfit","union","unite","unity",
  "unlit","unmet","unset","untie","until","unwed","unzip","upper","upset","urban",
  "urged","urges","usage","usher","using","usual","usurp","utile","utter","vague",
  "valet","valid","valor","value","valve","vapor","vault","vaunt","vegan","venom",
  "venue","verge","verse","verso","verve","vicar","video","vigil","vigor","villa",
  "vinyl","viola","viper","viral","virus","visit","visor","vista","vital","vivid",
  "vixen","vocal","vodka","vogue","voice","volts","voter","vouch","vowel","vulva",
  "wacky","wafer","wager","wagon","waist","waive","waltz","warty","waste","watch",
  "water","waver","waxen","weary","weave","wedge","weedy","weigh","weird","welch",
  "welsh","whack","whale","wharf","wheat","wheel","whelp","where","which","whiff",
  "while","whine","whiny","whirl","whisk","white","whole","whoop","whose","widen",
  "wider","widow","width","wield","wight","willy","wimpy","wince","winch","windy",
  "wiser","wispy","witch","witty","woken","woman","women","woody","wooly","woozy",
  "wordy","world","worry","worse","worst","worth","would","wound","woven","wrack",
  "wrath","wreak","wreck","wrest","wring","wrist","write","wrong","wrote","wrung",
  "yacht","yearn","yeast","yield","young","yours","youth","zebra","zesty","zonal"
];

/* If you want the original long list, paste it here (all lower-case). */

/* ------------------ Game state ------------------ */
let boardElement = document.getElementById("board");
let answerElement = document.getElementById("answer");
let reloadButton = document.getElementById("reloadButton");

let row = 0;
let col = 0;
let gameOver = false;
let secret = getRandomWord();

/* Build board */
function initialize() {
  boardElement.innerHTML = "";
  answerElement.textContent = "";
  for (let r = 0; r < HEIGHT; r++) {
    for (let c = 0; c < WIDTH; c++) {
      const span = document.createElement("span");
      span.id = `${r}-${c}`;
      span.className = "tile";
      span.textContent = "";
      boardElement.appendChild(span);
    }
  }
  reloadButton.classList.add("hidden");
  row = 0;
  col = 0;
  gameOver = false;
}

/* Choose random word */
function getRandomWord() {
  const i = Math.floor(Math.random() * words.length);
  return words[i].toLowerCase();
}

/* Show a short message in the answer box (aria-live will announce) */
function showMessage(msg) {
  answerElement.textContent = msg;
}

/* Add a letter to current tile */
function addLetter(letter) {
  if (gameOver) return;
  if (col >= WIDTH) return;
  const tile = document.getElementById(`${row}-${col}`);
  tile.textContent = letter.toUpperCase();
  col++;
}

/* Remove last letter */
function removeLetter() {
  if (gameOver) return;
  if (col === 0) return;
  col--;
  const tile = document.getElementById(`${row}-${col}`);
  tile.textContent = "";
}

/* Submit current row as guess */
function submitGuess() {
  if (gameOver) return;
  if (col !== WIDTH) {
    showMessage("Complete the word (5 letters) before submitting.");
    return;
  }

  // Build guess
  let guess = "";
  for (let c = 0; c < WIDTH; c++) {
    guess += document.getElementById(`${row}-${c}`).textContent.toLowerCase();
  }

  if (!/^[a-z]{5}$/.test(guess)) {
    showMessage("Guess must be alphabetic 5 letters.");
    return;
  }

  if (!words.includes(guess)) {
    showMessage("Not a valid word (not in dictionary).");
    return;
  }

  // Evaluate guess with two-pass approach to handle duplicates properly
  const target = secret.split("");
  const guessArr = guess.split("");
  const result = new Array(WIDTH).fill("absent");

  // First pass: correct letters
  for (let i = 0; i < WIDTH; i++) {
    if (guessArr[i] === target[i]) {
      result[i] = "correct";
      target[i] = null; // consume letter
    }
  }

  // Second pass: present but wrong position
  for (let i = 0; i < WIDTH; i++) {
    if (result[i] === "correct") continue;
    const idx = target.indexOf(guessArr[i]);
    if (idx !== -1) {
      result[i] = "present";
      target[idx] = null; // consume that letter
    }
  }

  // Apply classes to tiles
  for (let i = 0; i < WIDTH; i++) {
    const tile = document.getElementById(`${row}-${i}`);
    tile.classList.add(result[i]);
  }

  // Check win
  if (result.every(r => r === "correct")) {
    showMessage("Congratulations! You guessed the word!");
    endGame(true);
    return;
  }

  // Move to next row or end game if out of rows
  row++;
  col = 0;

  if (row >= HEIGHT) {
    showMessage(`Out of tries — the word was: ${secret.toUpperCase()}`);
    endGame(false);
  } else {
    showMessage(""); // clear temporary messages
  }
}

/* End game: reveal reload button */
function endGame(won) {
  gameOver = true;
  reloadButton.classList.remove("hidden");
}

/* New game handler */
function newGame() {
  secret = getRandomWord();
  initialize();
}

/* Keyboard events */
document.addEventListener("keydown", (e) => {
  if (gameOver && e.key !== "Enter") return;

  const key = e.key;

  if (key === "Backspace") {
    removeLetter();
    return;
  }

  if (key === "Enter") {
    submitGuess();
    return;
  }

  // letter keys a-z
  if (/^[a-zA-Z]$/.test(key)) {
    addLetter(key.toLowerCase());
  }
});

/* Touch / focus: ensure board exists before init */
window.addEventListener("load", () => {
  boardElement = document.getElementById("board");
  answerElement = document.getElementById("answer");
  reloadButton = document.getElementById("reloadButton");
  reloadButton.addEventListener("click", () => {
    // small delay to ensure the user sees the click feedback
    setTimeout(newGame, 80);
  });
  initialize();
  console.log("Secret word (debug):", secret);
});

