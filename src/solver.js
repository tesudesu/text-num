const letterToNum = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26
}

const numToLetter = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
    11: 'K',
    12: 'L',
    13: 'M',
    14: 'N',
    15: 'O',
    16: 'P',
    17: 'Q',
    18: 'R',
    19: 'S',
    20: 'T',
    21: 'U',
    22: 'V',
    23: 'W',
    24: 'X',
    25: 'Y',
    26: 'Z'
}

function encrypt(input, d) {
    let res = '';
    if (/^\s*$/.test(input)) {
        return res;
    }
    const str = input.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    for (let i = 0; i < str.length; i++) {
        const curr = letterToNum[str[i]];
        const next = letterToNum[str[i + 1]];
        if (curr) {
            let val = (curr + Number(d)) % 26;
            if (val <= 0) {
                val += 26;
            }
            res += val;
            if (next) {
                res += '-';
            }
        } else {
            res += str[i];
        }
    }
    return res;
}

function decrypt(input, d) {
    let res = '';
    if (/^\s*$/.test(input)) {
        return res;
    }
    const words = input.trim().split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        const word = words[i].match(/\d+|[^-]/g);
        for (let j = 0; j < word.length; j++) {
            const numbered = Number(word[j]);
            if (numToLetter[numbered]) {
                let val = (numbered - Number(d)) % 26;
                if (val <= 0) {
                    val += 26;
                }
                res += numToLetter[val];
            } else {
                res += word[j];
            }
        }
        res += ' ';
    }
    return res;
}

export { letterToNum, numToLetter, encrypt, decrypt };
