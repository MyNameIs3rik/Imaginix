const Places = new Array(62).fill(null);
const T1 = new Array(45).fill(null);
const T2 = new Array(18).fill(null);
const T3 = new Array(3).fill(null);


// stasting polie - []
// atk pole - ATK random weapon
// magic pole - ATK random magic item
// def pole - ATK random armor
// ruiny pole - random ruiny sprava a karta

// tier 1 - [1,meno,atk,hp] random intro a random obrazok
// tier 2 - [2,meno,atk,hp] random intro a random obrazok
// tier 3 - [3,meno,atk,hp] random intro a random obrazok


let ATK = "Potiahni si útočnu kartu";
let DEF = "Potiahni si obrannú kartu";
let MAGIC = "Potiahni si magickú kartu";
let encounter = "";
let Lmessage = "Vyhoď 3 najsilnejšie karty a vráť sa na štart.";
let win1 = ["Víťazstvo je tvoje. Potiahni si útočnú kartu. Získavaš 1 bod!","Víťazstvo je tvoje. Potiahni si obrannú kartu. Získavaš 1 bod!"];
let win2 = "Víťazstvo je tvoje. Potiahni si útočnú a obrannú kartu. Získavaš 2 body!";
let win3 = "Víťazstvo je tvoje. Potiahni si útočnú, obrannú a magickú kartu. Získavaš 3 body!";
let found = "Našiel si";
let atk = "Útok";
let def = "Obrana";

let green = 0;
let white = 0;
let black = 0;
let blue = 0;
let red = 0;
let orange = 0;

let addd;

let intros;
let weapons;
let armors;
let magic_items;
let wmess;
let lmess;
let theme;
let Others;
let Count;
let ruins;
let lang;

const ima = new Audio("sounds/imaginixx.wav");
const imax = new Audio("sounds/imaginix.m4a");
const outro = new Audio("sounds/outro.wav");

function start(Data) {
    Data[1] = shuffle(Data[1])
    const names = Data[1].slice(0,22);
    Others = Data[1].slice(22);
    Count = 0;

    theme = Data[0][0];
    intros = Data[2];
    weapons = Data[3];
    armors = Data[4];
    magic_items = Data[5];
    wmess = Data[6];
    lmess = Data[7];
    ruins = Data[8];
    lang = Data[0][1];

    if (lang === "sk") {
        ATK = "Potiahni si útočnu kartu";
        DEF = "Potiahni si obrannú kartu";
        MAGIC = "Potiahni si magickú kartu";
        encounter = "";
        Lmessage = "Vyhoď 3 najsilnejšie karty a vráť sa na štart.";
        win1 = ["Víťazstvo je tvoje. Potiahni si útočnú kartu. Získavaš 1 bod!","Víťazstvo je tvoje. Potiahni si obrannú kartu. Získavaš 1 bod!"];
        win2 = "Víťazstvo je tvoje. Potiahni si útočnú a obrannú kartu. Získavaš 2 body!";
        win3 = "Víťazstvo je tvoje. Potiahni si útočnú, obrannú a magickú kartu. Získavaš 3 body!";
        found = "Našiel si"
        atk = "Útok";
        def = "Obrana";
    } 
    else if (lang === "en") {
        ATK = "Draw an attack card";
        DEF = "Draw a defense card";
        MAGIC = "Draw a magic card";
        encounter = "";
        Lmessage = "Discard 3 strongest cards and return to the start.";
        win1 = ["The victory is yours. Draw an attack card. You won 1 point!","The victory is yours. Draw a defense card. You won 1 point!"];
        win2 = "The victory is yours. Draw an attack and a defense card. You won 2 points!";
        win3 = "The victory is yours. Draw an attack, defense, and a magic card. You won 3 points!";
        found = "You found"
        atk = "Attack";
        def = "Defense";
        document.getElementById("xbuttonn").src="img/zavrieten.png";
        document.getElementById("lbuttonn").src="img/prehraen.png";
        document.getElementById("wbuttonn").src="img/vyhraen.png";
    }


    const startovaciepolicka = [1, 11, 15, 47, 51, 61];
    const atkpolicka = [3, 7, 10, 52, 55, 59];
    const defpolicka = [2, 20, 24, 38, 42, 60];
    const magicpolicka = [5, 16, 19, 43, 46, 57];

    for (const i of startovaciepolicka) {
        Places[i - 1] = [0];
    }
    for (const i of atkpolicka) {
        Places[i - 1] = [11];
    }
    for (const i of defpolicka) {
        Places[i - 1] = [12];
    }
    for (const i of magicpolicka) {
        Places[i - 1] = [13];
    }

    Places[31 - 1] = [3,names[21],null,null];
    // hp atk tier 3
    Places[30][2] = Math.floor(Math.random() * (5 + 1)) + 15;
    Places[30][3] = Math.floor(Math.random() * (3 + 1)) + 7;

    let x = 0;
    const t2policka = [22, 26, 27, 35, 36, 40];
    for (const i of t2policka) {
        Places[i - 1] = [2,null,null,null];

        // hp atk meno tier 2
        Places[i - 1][1] = names[20 - x];
        Places[i - 1][2] = Math.floor(Math.random() * (10 + 1)) + 5;
        Places[i - 1][3] = Math.floor(Math.random() * (4 + 1)) + 3;
        x += 1
    }
    

    x = 0;
    const volnepolicka = [
        4, 6, 8, 9, 12, 13, 14, 17, 18, 21, 23, 25, 28, 29, 30,
        32, 33, 34, 37, 39, 41, 44, 45, 48, 49, 50, 53, 54, 56, 58
    ];
    for (let i = volnepolicka.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [volnepolicka[i], volnepolicka[j]] = [volnepolicka[j], volnepolicka[i]];
    }
    const t1policka = volnepolicka.slice(0, 15);
    
    for (const i of t1policka) {
        Places[i - 1] = [1,null,null,null];
        Places[i - 1][1] = names[14 - x];
        Places[i - 1][2] = Math.floor((Math.random() * 10) + 1);
        Places[i - 1][3] = Math.floor((Math.random() * 5) + 1);
        x += 1 
    }
    const randompolicka = volnepolicka.slice(15);
    for (const i of randompolicka) {
        Places[i - 1] = [10];
    }

    document.getElementById("begin").classList.add("invisible");
    document.getElementById("hexa").classList.remove("invisible");
    document.getElementById("scor").classList.remove("invisible");
    document.getElementById("scorrr").classList.remove("invisible");
    bo(1)
    update()
}

function Close() {
    document.getElementById("pop").classList.add("invisible");
    document.getElementById("xbutton").classList.add("invisible");
    document.getElementById("text").classList.add("invisible");
    document.getElementById("image").classList.add("invisible");
    document.getElementById("instrukcie").classList.add("invisible");
    document.getElementById("stats").classList.add("invisible");
    document.getElementById("scorr").classList.add("invisible");
    document.getElementById("image").classList.add("h170");
    document.getElementById("image").classList.remove("h140");
    document.getElementById("wbutton").classList.add("invisible");
    document.getElementById("lbutton").classList.add("invisible");
}
function tookanL() {
    innertext = Lmessage;
    message = pick_random(lmess);
    document.getElementById("wbutton").classList.add("invisible");
    document.getElementById("lbutton").classList.add("invisible");
    document.getElementById("stats").classList.add("invisible");
    document.getElementById("instrukcie").classList.remove("invisible");
    document.getElementById("xbutton").classList.remove("invisible");
    document.getElementById("text").innerText=message;
    document.getElementById("instrukcie").innerText=innertext;
    document.getElementById("image").classList.add("invisible");
    document.getElementById("image").src="img/lose.png";
    document.getElementById("image").classList.remove("h170");
    document.getElementById("image").classList.add("h140");


}
function tookaW() {
    num = Places[61]
    if (Places[num][0] === 1) {
        Places[num][1] = Others[Count];
        Places[num][2] = Math.floor(Math.random() * (10 + 1)) + 1;
        Places[num][3] = Math.floor(Math.random() * (4 + 1)) + 1;
        let randomIndex = Math.floor(Math.random() * 2); 
        document.getElementById("text").innerText =pick_random(wmess);
        if (randomIndex === 0) {
            document.getElementById("instrukcie").classList.remove("invisible");
            document.getElementById("instrukcie").innerText= win1[0];
            document.getElementById("image").src="img/mec.png";
        }
        else if (randomIndex === 1) {
            document.getElementById("instrukcie").classList.remove("invisible");
            document.getElementById("instrukcie").innerText= win1[1];
            document.getElementById("image").src="img/stit.png";
        }
    }
    else if (Places[num][0] === 2) {
        document.getElementById("text").innerText = pick_random(wmess);
        document.getElementById("instrukcie").classList.remove("invisible");
        document.getElementById("instrukcie").innerText= win2;
        document.getElementById("image").src="img/ad.png";
        Places[num][1] = Others[Count];
        Places[num][2] = Math.floor(Math.random() * (10 + 1)) + 5;
        Places[num][3] = Math.floor(Math.random() * (4 + 1)) + 3;
        Count += 1;
    }
    else if (Places[num][0] === 3) {
        document.getElementById("instrukcie").classList.remove("invisible");
        document.getElementById("text").innerText =pick_random(wmess);
        document.getElementById("instrukcie").innerText= win3;
        document.getElementById("image").src="img/amd.png";
        Places[30][1] = Others[Count];
        Places[30][2] = Math.floor(Math.random() * (5 + 1)) + 15;
        Places[30][3] = Math.floor(Math.random() * (3 + 1)) + 7;
        Count += 1;
    }
    document.getElementById("image").classList.remove("h170");
    document.getElementById("image").classList.add("h140");
    document.getElementById("scorr").classList.remove("invisible");
    document.getElementById("wbutton").classList.add("invisible");
    document.getElementById("stats").classList.add("invisible");
    document.getElementById("lbutton").classList.add("invisible");
}

function Click(num) {
    Places[61] = num;
    document.getElementById("numero").innerText = num + 1;

    if (Places[num][0] === 10) {
        // pick a random number
        x = Math.floor(Math.random() * 7) + 1;
        if (x === 1) {
            card = "img/hulka.png";
            innertext = MAGIC;
            message = `${found} ${pick_random(magic_items)}`;
        } else if (x > 4) {
            card = "img/mec.png";
            innertext = ATK;
            message = `${found} ${pick_random(weapons)}`;
        } else {
            card = "img/stit.png";
            innertext = DEF;
            message = `${found} ${pick_random(armors)}`;
        }
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("xbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("instrukcie").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("image").src=card;
        document.getElementById("text").innerText=message;
        document.getElementById("instrukcie").innerText=innertext;
    }
    else if (Places[num][0] === 11) {
        card = "img/mec.png";
        innertext = ATK;
        message = `${found} ${pick_random(weapons)}`;
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("xbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("instrukcie").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("image").src=card;
        document.getElementById("text").innerText=message;
        document.getElementById("instrukcie").innerText=innertext;
    }
    else if (Places[num][0] === 12) {
        card = "img/stit.png";
        innertext = DEF;
        message = `${found} ${pick_random(armors)}`;
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("xbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("instrukcie").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("image").src=card;
        document.getElementById("text").innerText=message;
        document.getElementById("instrukcie").innerText=innertext;
    }
    else if (Places[num][0] === 13) {
        x = Math.floor(Math.random() * 4) + 1;
        if (x > 2) {
            card = "img/hulka.png";
            innertext = MAGIC;
            message = `${found} ${pick_random(magic_items)}`;
        } else if (x === 2) {
            card = "img/mec.png";
            innertext = ATK;
            message = `${found} ${pick_random(weapons)}`;
        } else {
            card = "img/stit.png";
            innertext = DEF;
            message = `${found} ${pick_random(armors)}`;
        }
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("xbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("instrukcie").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("image").src=card;
        document.getElementById("text").innerText=message;
        document.getElementById("instrukcie").innerText=innertext;
    }
    else if (Places[num][0] === 1) {
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("wbutton").classList.remove("invisible");
        document.getElementById("lbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("stats").classList.remove("invisible");
        document.getElementById("text").innerText=`${pick_random(intros)} ${Places[num][1]}`;
        document.getElementById("image").src="img/"+ theme+ "/A" + (Math.floor(Math.random() * 10)+1)+".webp";
        document.getElementById("stats").innerText= `${atk} :  ${Places[num][2]}    |    ${def} :  ${Places[num][3]}`;
        addd=1;
    }
    else if (Places[num][0] === 2) {
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("wbutton").classList.remove("invisible");
        document.getElementById("lbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("stats").classList.remove("invisible");
        document.getElementById("text").innerText=`${pick_random(intros)} ${Places[num][1]}`;
        document.getElementById("image").src="img/"+ theme+ "/A" + (Math.floor(Math.random() * 10)+1)+".webp";
        document.getElementById("stats").innerText= `${atk} :  ${Places[num][2]}    |    ${def} :  ${Places[num][3]}`;
        addd=2;
    }
    else  {
        document.getElementById("pop").classList.remove("invisible");
        document.getElementById("wbutton").classList.remove("invisible");
        document.getElementById("lbutton").classList.remove("invisible");
        document.getElementById("text").classList.remove("invisible");
        document.getElementById("image").classList.remove("invisible");
        document.getElementById("stats").classList.remove("invisible");
        document.getElementById("text").innerText=`${pick_random(intros)} ${Places[num][1]}`;
        document.getElementById("image").src="img/"+ theme+ "/A" + (Math.floor(Math.random() * 10)+1)+".webp";
        document.getElementById("stats").innerText= `${atk} :  ${Places[num][2]}    |    ${def} :  ${Places[num][3]}`;
        addd=3
    }
}


function update() {
    document.getElementById("Green").innerText = green;
    document.getElementById("Red").innerText = red;
    document.getElementById("White").innerText = white;
    document.getElementById("Blue").innerText = blue;
    document.getElementById("Black").innerText = black;
    document.getElementById("Orange").innerText = orange;
}

function pick_random(array) {
    return shuffle(array)[2];
}

function add(x) {

    if (x === 0) {
        green += addd;
    }
    else if (x === 4) {
        red += addd;
    }
    else if (x === 3) {
        blue += addd;
    }
    else if (x === 2) {
        black += addd;
    }
    else if (x === 1) {
        white += addd;
    }
    else if (x === 5) {
        orange += addd;
    }

    update();
    Close();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function bo(x) {
    ima.volume = 0.4;
    ima.play();
    setTimeout(playy, 2500); 
}
function playy() {
    imax.volume = 1;
    imax.play();
    setTimeout(after, 3800); 
}
function after() {
    outro.volume = 0.4;
    outro.play();
}