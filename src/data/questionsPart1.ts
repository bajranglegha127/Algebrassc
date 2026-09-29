export interface RawQuestion {
  id: number;
  page: number;
  col: 1 | 2;
  en: string;
  hi: string;
  options: [string, string, string, string];
}

export const QUESTIONS_PART_1: RawQuestion[] = [
  // PAGE 1
  {
    id: 1, page: 1, col: 1,
    en: "If a + b = 12, ab = 22, then (a² + b²) is equal to",
    hi: "अगर a + b = 12, ab = 22, तो (a² + b²):",
    options: ["188", "144", "34", "100"]
  },
  {
    id: 2, page: 1, col: 1,
    en: "If p + q = 10 and pq = 5, then the numerical value of p/q + q/p will be",
    hi: "अगर p + q = 10 और pq = 5, तो p/q + q/p का मान:",
    options: ["16", "20", "22", "18"]
  },
  {
    id: 3, page: 1, col: 1,
    en: "If x = (√3 + 1)/(√3 − 1) & y = (√3 − 1)/(√3 + 1) then value of x² + y² is :",
    hi: "अगर x = (√3 + 1)/(√3 − 1) और y = (√3 − 1)/(√3 + 1) है, तो x² + y²:",
    options: ["14", "13", "15", "10"]
  },
  {
    id: 4, page: 1, col: 1,
    en: "If a = (√3 + √2)/(√3 − √2) and b = (√3 − √2)/(√3 + √2), then what is the value of a² + b² − ab?",
    hi: "यदि a = (√3 + √2)/(√3 − √2) तथा b = (√3 − √2)/(√3 + √2) है, तो a² + b² − ab का मान क्या है?",
    options: ["97", "2√3 + 2", "4√6 + 1", "98"]
  },
  {
    id: 5, page: 1, col: 1,
    en: "If a = (√5 + 1)/(√5 − 1) & b = (√5 − 1)/(√5 + 1), then the value of (a² + ab + b²)/(a² − ab + b²) is",
    hi: "अगर a = (√5 + 1)/(√5 − 1) & b = (√5 − 1)/(√5 + 1), तो (a² + ab + b²)/(a² − ab + b²) का मान:",
    options: ["3/4", "4/3", "3/5", "5/3"]
  },
  {
    id: 6, page: 1, col: 1,
    en: "If x = 3 + 2√2 and xy = 1, then the value of (x² + 3xy + y²)/(x² − 3xy + y²) is",
    hi: "अगर x = 3 + 2√2 और xy = 1, तो (x² + 3xy + y²)/(x² − 3xy + y²):",
    options: ["30/31", "70/31", "35/31", "37/31"]
  },
  {
    id: 7, page: 1, col: 1,
    en: "If a = √8 − √7 and a = 1/b, then (a² + b² − 3ab)/(a² + ab + b²) is equal to:",
    hi: "अगर a = √8 − √7 और a = 1/b, तो (a² + b² − 3ab)/(a² + ab + b²) बराबर है:",
    options: ["27/31", "27/32", "29/33", "29/31"]
  },
  {
    id: 8, page: 1, col: 2,
    en: "If x = √10 + √11, y = √10 − √11, then value of 7x² − 50xy + 7y² = ______.",
    hi: "यदि x = √10 + √11, y = √10 − √11, तो 7x² − 50xy + 7y² का मान ज्ञात कीजिए|",
    options: ["386", "1360", "344", "704"]
  },
  {
    id: 9, page: 1, col: 2,
    en: "Simplify (957 + 932)² − 4 × 957 × 932.",
    hi: "(957 + 932)² − 4 × 957 × 932 को सरल करे|",
    options: ["625", "676", "529", "576"]
  },
  {
    id: 10, page: 1, col: 2,
    en: "If x = 1/(2 + √3), y = 1/(2 − √3), then the value of 8xy(x² + y²) is",
    hi: "अगर x = 1/(2 + √3), y = 1/(2 − √3), तो 8xy(x² + y²) का मान:",
    options: ["112", "194", "290", "196"]
  },
  {
    id: 11, page: 1, col: 2,
    en: "If a + b = √7 and a − b = √5, then find the value of 8ab(a² + b²) − (a − b)².",
    hi: "यदि a + b = √7 और a − b = √5 है, तो 8ab(a² + b²) − (a − b)² का मान ज्ञात कीजिए|",
    options: ["19", "23", "21", "27"]
  },
  {
    id: 12, page: 1, col: 2,
    en: "If the value of (3x√y + 2y√x)/(3x√y − 2y√x) − (3x√y − 2y√x)/(3x√y + 2y√x) is same as that of √x √y, then which of the following relations between x and y is correct?",
    hi: "यदि (3x√y + 2y√x)/(3x√y − 2y√x) − (3x√y − 2y√x)/(3x√y + 2y√x) का मान √x √y के समान है, तो x और y के बीच निम्नलिखित में से कौन सा संबंध सही है?",
    options: ["9x − 4y = 36", "9x + 4y = 24", "9x + 4y = 36", "9x − 4y = 24"]
  },

  // PAGE 2
  {
    id: 13, page: 2, col: 1,
    en: "If (x + √(x² − 1))/(x − √(x² − 1)) + (x − √(x² − 1))/(x + √(x² − 1)) = 34, then the value of x is (x < 0)",
    hi: "यदि (x + √(x² − 1))/(x − √(x² − 1)) + (x − √(x² − 1))/(x + √(x² − 1)) = 34 है, तो x का मान ज्ञात करो (x < 0)|",
    options: ["-1", "-2", "-3", "-4"]
  },
  {
    id: 14, page: 2, col: 1,
    en: "If x² − y² = 80 and x − y = 8, then the average of x and y is",
    hi: "अगर x² − y² = 80 और x − y = 8 तो x और y का औसत:",
    options: ["2", "3", "4", "5"]
  },
  {
    id: 15, page: 2, col: 1,
    en: "(x³ + y⁶)(x³ − y⁶) is equal to",
    hi: "(x³ + y⁶)(x³ − y⁶) समान है:",
    options: ["(x⁶ − y¹²)", "(x⁹ − y¹⁶)", "(x⁶ + y¹²)", "(x⁹ + y³⁶)"]
  },
  {
    id: 16, page: 2, col: 1,
    en: "If a and b be positive integers such that a² − b² = 19, then the value of a² − b is",
    hi: "अगर a और b धनात्मक पूर्णांक इस प्रकार हैं की a² − b² = 19 तो a² − b का मान:",
    options: ["19", "91", "89", "10"]
  },
  {
    id: 17, page: 2, col: 1,
    en: "Given that x, y, z are positive real numbers, if (x + y)² − z² = 8, (y + z)² − x² = 10 and (x + z)² − y² = 7, then (x + y + z) is equal to:",
    hi: "दिया गया है कि x, y, z धनात्मक वास्तविक संख्याएँ हैं, यदि (x + y)² − z² = 8, (y + z)² − x² = 10 और (x + z)² − y² = 7, फिर (x + y + z) बराबर है:",
    options: ["5", "7", "8", "6"]
  },
  {
    id: 18, page: 2, col: 1,
    en: "If (x + y)² = 21 + z², (y + z)² = 32 + x² and (z + x)² = 28 + y², find x + y + z = ?",
    hi: "यदि (x + y)² = 21 + z², (y + z)² = 32 + x² और (z + x)² = 28 + y² है, तो x + y + z का मान ज्ञात करो |",
    options: ["7", "8", "9", "10"]
  },
  {
    id: 19, page: 2, col: 2,
    en: "The factors of a² − 1 − 2x − x² are ______.",
    hi: "a² − 1 − 2x − x² के गुणनखंड _________ है|",
    options: ["(a − x − 1)(a − x − 1)", "(a − x + 1)(a − x − 1)", "(a + 1 + x)(a − 1 − x)", "(a − x + 1)(a − x + 1)"]
  },
  {
    id: 20, page: 2, col: 2,
    en: "If x = b + c − 2a, y = c + a − 2b, z = a + b − 2c, then the value of x² + y² − z² + 2xy is",
    hi: "अगर x = b + c − 2a, y = c + a − 2b, z = a + b − 2c, तो x² + y² − z² + 2xy का मान:",
    options: ["0", "a + b + c", "a − b + c", "a + b − c"]
  },
  {
    id: 21, page: 2, col: 2,
    en: "How many pairs of natural numbers are there such that the difference of their squares is 35?",
    hi: "प्राकृतिक संख्याओं के कितने जोड़े ऐसे हैं जिनके वर्गों का अंतर 35 है?",
    options: ["1", "2", "3", "4"]
  },
  {
    id: 22, page: 2, col: 2,
    en: "What is the value of 1006² − 1007 × 1005 + 1008 × 1004 − 1009 × 1003 ?",
    hi: "1006² − 1007 × 1005 + 1008 × 1004 − 1009 × 1003 का मान क्या है?",
    options: ["6", "3", "12", "24"]
  },
  {
    id: 23, page: 2, col: 2,
    en: "The value of (1018)² − 1019 × 1017 + 1015 × 1012 − 1016 × 1011 is:",
    hi: "(1018)² − 1019 × 1017 + 1015 × 1012 − 1016 × 1011 का मान ज्ञात करें|",
    options: ["1", "4", "3", "5"]
  },
  {
    id: 24, page: 2, col: 2,
    en: "2³² − (2 + 1)(2² + 1)(2⁴ + 1)(2⁸ + 1)(2¹⁶ + 1) is equal to",
    hi: "2³² − (2 + 1)(2² + 1)(2⁴ + 1)(2⁸ + 1)(2¹⁶ + 1) किसके समान है?",
    options: ["2", "2¹⁶", "0", "1"]
  },

  // PAGE 3
  {
    id: 25, page: 3, col: 1,
    en: "(2 + 1)(2² + 1)(2⁴ + 1)(2⁸ + 1)(2¹⁶ + 1)(2³² + 1)(2⁶⁴ + 1) is:",
    hi: "(2 + 1)(2² + 1)(2⁴ + 1)(2⁸ + 1)(2¹⁶ + 1)(2³² + 1)(2⁶⁴ + 1) का मान है:",
    options: ["2²⁵⁶ − 1", "2²⁵⁶ + 1", "2¹²⁸ − 1", "2¹²⁸ + 1"]
  },
  {
    id: 26, page: 3, col: 1,
    en: "What is the simplified value of (3 + 1)(3² + 1)(3⁴ + 1)(3⁸ + 1)(3¹⁶ + 1)?",
    hi: "(3 + 1)(3² + 1)(3⁴ + 1)(3⁸ + 1)(3¹⁶ + 1) का सरलीकृत मान क्या है?",
    options: ["(3³² − 1)/2", "(3¹⁶ − 1)/2", "(3⁶⁴ − 1)/2", "(3¹²⁸ − 1)/2"]
  },
  {
    id: 27, page: 3, col: 1,
    en: "What is the simplified value of (x¹²⁸ + 1)(x³² + 1)(x⁶⁴ + 1)(x¹⁶ + 1)(x⁸ + 1)(x⁴ + 1)(x² + 1)(x + 1)?",
    hi: "(x¹²⁸ + 1)(x³² + 1)(x⁶⁴ + 1)(x¹⁶ + 1)(x⁸ + 1)(x⁴ + 1)(x² + 1)(x + 1) का सरलीकृत मान क्या है ?",
    options: ["x²⁵⁶ − 1", "(x¹²⁸ − 1)/(x − 1)", "(x⁶⁴ − 1)/(x − 1)", "(x²⁵⁶ − 1)/(x − 1)"]
  },
  {
    id: 28, page: 3, col: 1,
    en: "What is 1/(a − b) − 1/(a + b) − 2b/(a² + b²) − 4b³/(a⁴ + b⁴) − 8b⁷/(a⁸ − b⁸) equal to?",
    hi: "1/(a − b) − 1/(a + b) − 2b/(a² + b²) − 4b³/(a⁴ + b⁴) − 8b⁷/(a⁸ − b⁸) किसके बराबर है ?",
    options: ["a + b", "a − b", "1", "0"]
  },
  {
    id: 29, page: 3, col: 1,
    en: "If P = 2² + 6² + 10² + 14² + ... 94² and Q = 1² + 5² + 9² + ... 81², then what is the value of P − Q?",
    hi: "यदि P = 2² + 6² + 10² + 14² + ... 94² तथा Q = 1² + 5² + 9² + ... 81² है तो P − Q का मान क्या है?",
    options: ["24645", "26075", "29317", "31515"]
  },
  {
    id: 30, page: 3, col: 1,
    en: "Factors of m⁵ − 16m",
    hi: "m⁵ − 16m के गुणनखंड होंगे-",
    options: ["m(m − 1)(m − 3)", "m(m − 2)(m + 2)(m² + 4)", "m(m − 1)(m − 2)(m + 2)", "None of these"]
  },
  {
    id: 31, page: 3, col: 2,
    en: "(a + 1)⁴ − a⁴ is divisible by",
    hi: "(a + 1)⁴ − a⁴ विभाजित है :",
    options: ["−2a² + 2a − 1", "2a³ − 2a − 1", "2a³ − 2a + 1", "2a² + 2a + 1"]
  },
  {
    id: 32, page: 3, col: 2,
    en: "A complete factorization of x⁴ + 64 is",
    hi: "x⁴ + 64 का सम्पूर्ण गुणनखंडन करें :",
    options: ["(x² + 8)²", "(x² + 8)(x² − 8)", "(x² − 4x + 8)(x² − 4x − 8)", "(x² + 4x + 8)(x² − 4x + 8)"]
  },
  {
    id: 33, page: 3, col: 2,
    en: "The value of [4.669 × 4.669 − 9 × (0.777)²] / [(4.669)² + (2.331)² + 14(0.667)(2.331)] is (1 − k), where k = ?",
    hi: "[4.669 × 4.669 − 9 × (0.777)²] / [(4.669)² + (2.331)² + 14(0.667)(2.331)] का मान है (1 − k), जहां k = ?",
    options: ["0.666", "0.334", "1", "2.338"]
  },
  {
    id: 34, page: 3, col: 2,
    en: "x and y are positive integers. If x⁴ + y⁴ + x²y² = 481 and xy = 12, then what is the value of x² − xy + y² ?",
    hi: "x तथा y एक धनात्मक पूर्णांक है| यदि x⁴ + y⁴ + x²y² = 481 तथा xy = 12 है, तो x² − xy + y² का मान क्या है?",
    options: ["16", "13", "113", "15"]
  },
  {
    id: 35, page: 3, col: 2,
    en: "The value of (4x³ − x)/[(2x − 1)(6x + 3)] when x = 9999 is",
    hi: "(4x³ − x)/[(2x − 1)(6x + 3)] का मान अगर x = 9999",
    options: ["1111", "2222", "3333", "6666"]
  },
  {
    id: 36, page: 3, col: 2,
    en: "What is [(x² + y²)(x − y) − (x − y)³] / (x²y − xy²) equal to?",
    hi: "[(x² + y²)(x − y) − (x − y)³] / (x²y − xy²) किसके बराबर है ?",
    options: ["1", "2", "4", "-2"]
  },
  {
    id: 37, page: 3, col: 2,
    en: "The factors of (x² − 1 − 2a − a²) are :",
    hi: "(x² − 1 − 2a − a²) के गुणनखंड ज्ञात करो |",
    options: ["(x − a + 1)(x − a − 1)", "(x + a − 1)(x − a + 1)", "(x + a + 1)(x − a − 1)", "None of these"]
  },

  // PAGE 4
  {
    id: 38, page: 4, col: 1,
    en: "A = (x⁸ − 1)/(x⁴ + 1) and B = (y⁴ − 1)/(y² + 1). If x = 2 and y = 9, then what is the value of A² + 2AB + AB² ?",
    hi: "यदि A = (x⁸ − 1)/(x⁴ + 1) तथा B = (y⁴ − 1)/(y² + 1) है| यदि x = 2 तथा y = 9 है, तो A² + 2AB + AB² का क्या मान है?",
    options: ["96475", "98625", "92425", "89125"]
  },
  {
    id: 39, page: 4, col: 1,
    en: "If ax + by = 3, bx − ay = 4 & x² + y² = 1, then find a² + b².",
    hi: "यदि ax + by = 3, bx − ay = 4 और x² + y² = 1 है, तो a² + b² ज्ञात करो |",
    options: ["17", "16", "9", "25"]
  },
  {
    id: 40, page: 4, col: 1,
    en: "If ax + by = 6, bx − ay = 2 & x² + y² = 4 then the value of (a² + b²) is",
    hi: "यदि ax + by = 6, bx − ay = 2 और x² + y² = 4 है, तो (a² + b²) का मान है :",
    options: ["2", "4", "5", "10"]
  },
  {
    id: 41, page: 4, col: 1,
    en: "If a² + b² = 25, x² + y² = 17 and ax + by = 8, then what is the value of (ay − bx)?",
    hi: "यदि a² + b² = 25, x² + y² = 17 और ax + by = 8 है, तो (ay − bx) का मान क्या होगा?",
    options: ["23", "25", "21", "19"]
  },
  {
    id: 42, page: 4, col: 1,
    en: "If (a² + b²)(m² + n²) = (am + bn)² then, which of the following is correct.",
    hi: "यदि (a² + b²)(m² + n²) = (am + bn)², तो निम्नलिखित में से कौन - सा कथन सत्य है ?",
    options: ["a/m − b/n = 0", "a/n = b/m", "ab = mn", "a + b = m + n"]
  },
  {
    id: 43, page: 4, col: 1,
    en: "If √x = √3 − √5, then the value of x² − 16x + 6 is",
    hi: "यदि √x = √3 − √5 है, तो x² − 16x + 6 का मान है:",
    options: ["0", "-2", "2", "4"]
  },
  {
    id: 44, page: 4, col: 2,
    en: "If p = √5 − 2, then p⁴ + 16p² + 8p³ + 4 = ?",
    hi: "यदि p = √5 − 2 है, तो p⁴ + 16p² + 8p³ + 4 ज्ञात करो |",
    options: ["3", "5", "1", "0"]
  },
  {
    id: 45, page: 4, col: 2,
    en: "If a = 89, b = −69, c = 8 then the value of 9(a + b)² + 49c² − 42(a + b)c is:",
    hi: "यदि a = 89, b = −69, c = 8 है, तो 9(a + b)² + 49c² − 42(a + b)c का मान है :",
    options: ["2", "4", "16", "0"]
  },
  {
    id: 46, page: 4, col: 2,
    en: "If x, y, z are positive integers such that x² + y² = 45 and y² + z² = 40, then find the value of x + y + z.",
    hi: "यदि x, y, z धनात्मक पूर्णांक हैं जैसे कि x² + y² = 45 और y² + z² = 40 हो, तो x + y + z का मान ज्ञात कीजिए।",
    options: ["11", "10", "20", "15"]
  },
  {
    id: 47, page: 4, col: 2,
    en: "If a, b and c are positive integers such that a² + b² = 82 and b² + c² = 65, then the value of 2a + 7b − 3c is:",
    hi: "यदि a, b और c धनात्मक पूर्णांक इस प्रकार है कि a² + b² = 82 और b² + c² = 65 है, तो 2a + 7b − 3c का मान ज्ञात करें|",
    options: ["2", "5", "49", "1"]
  },
  {
    id: 48, page: 4, col: 2,
    en: "If √(13x³ − 14x + 29) + √(13x³ − 14x − 21) = 10, then √(13x³ − 14x + 29) − √(13x³ − 14x − 21) = ?",
    hi: "यदि √(13x³ − 14x + 29) + √(13x³ − 14x − 21) = 10 है, तो √(13x³ − 14x + 29) − √(13x³ − 14x − 21) का मान होगा :",
    options: ["3", "4", "5", "6"]
  },

  // PAGE 5
  {
    id: 49, page: 5, col: 1,
    en: "The term to be added to 121a² + 64b² to make a perfect square is",
    hi: "121a² + 64b² में क्या जोड़ा जाए ताकि ये पूर्ण वर्ग बन जाए?",
    options: ["176 ab", "276 a²b", "178 ab", "188 b²a"]
  },
  {
    id: 50, page: 5, col: 1,
    en: "The term, that should be added to (4x² + 8x) so that resulting expression be a perfect square is:",
    hi: "(4x² + 8x) में क्या जोड़ा जाए ताकि ये पूर्ण वर्ग बन जाए?",
    options: ["2x", "2", "1", "4"]
  },
  {
    id: 51, page: 5, col: 1,
    en: "The expression x⁴ − x² + k a perfect square if the value of k is",
    hi: "k के किस मान के लिए x⁴ − x² + k एक पूर्ण वर्ग होगा?",
    options: ["1", "0", "1/4", "−1/4"]
  },
  {
    id: 52, page: 5, col: 1,
    en: "If x + (1/5)√x + a² is a perfect square then a is",
    hi: "a के किस मान के लिए x + (1/5)√x + a² एक पूर्ण वर्ग होगा?",
    options: ["1/100", "±1/10", "1/10", "−1/10"]
  },
  {
    id: 53, page: 5, col: 1,
    en: "For what value(s) of k the expression p + (1/4)√p + k is perfect square?",
    hi: "k के किस मान के लिए p + (1/4)√p + k एक पूर्ण वर्ग होगा?",
    options: ["1/64", "±1/4", "±1/8", "±1/64"]
  },
  {
    id: 54, page: 5, col: 1,
    en: "For what value(s) of k will the expression p + (1/9)√p + k² be a perfect square",
    hi: "k के किस मान/किन मानो के लिए व्यंजक p + (1/9)√p + k² एक पूर्ण वर्ग होगा?",
    options: ["k = ±1/8", "k = ±1/9", "k = ±1/21", "k = ±1/18"]
  },
  {
    id: 55, page: 5, col: 2,
    en: "If the expression 4x²/y² + tx + y²/4 is a perfect square, then the values of t is",
    hi: "अगर 4x²/y² + tx + y²/4 एक पूर्ण वर्ग है तो t का मान:",
    options: ["2", "±2", "0", "−2"]
  },
  {
    id: 56, page: 5, col: 2,
    en: "The expression x⁴ − 16x² + k³ a perfect square if the value of k is",
    hi: "k के किस मान के लिए x⁴ − 16x² + k³ एक पूर्ण वर्ग होगा?",
    options: ["64", "8", "4", "±4"]
  },
  {
    id: 57, page: 5, col: 2,
    en: "If the expression x² + x + 1 is written in the form of (x + 1/2)² + q², then the possible values of q are",
    hi: "अगर x² + x + 1 को (x + 1/2)² + q² के रूप में लिखा जाए तो q के संभव मान:",
    options: ["±1/3", "±√3/2", "±2/√3", "±1/2"]
  },
  {
    id: 58, page: 5, col: 2,
    en: "If N = (12345)² + 12345 + 12346, then what is the value of √N ?",
    hi: "यदि N = (12345)² + 12345 + 12346 है, तो √N का मान क्या है?",
    options: ["12346", "12345", "12344", "12347"]
  },
  {
    id: 59, page: 5, col: 2,
    en: "If the expression x + 809436 × 809438 be a perfect square, then the value of x is",
    hi: "अगर x + 809436 × 809438 एक पूर्ण वर्ग है, तो x का मान पता करो|",
    options: ["809436", "809438", "0", "1"]
  },
  {
    id: 60, page: 5, col: 2,
    en: "The least positive integer that should be subtracted from 3011 × 3012 so that the difference is a perfect square is",
    hi: "3011 × 3012 में से कौनसा छोटे से छोटा धनात्मक पूर्णांक घटाया जाए ताकि उन अंकों का अंतर एक पूर्ण वर्ग हो",
    options: ["3009", "2010", "3011", "3012"]
  },

  // PAGE 6
  {
    id: 61, page: 6, col: 1,
    en: "If (a + b)² − 2(a + b) = 80 and ab = 16, then what can be the value of 3a − 19b?",
    hi: "यदि (a + b)² − 2(a + b) = 80 तथा ab = 16 है, तो 3a − 19b का मान क्या हो सकता है?",
    options: ["-16", "-14", "-18", "-20"]
  },
  {
    id: 62, page: 6, col: 1,
    en: "If [a + (1/a)]² − 2[a − (1/a)] = 12, then which of the following is a value of a?",
    hi: "यदि [a + (1/a)]² − 2[a − (1/a)] = 12 हो, तो निम्नलिखित में से कौन सा a का मान है?",
    options: ["−8 + √3", "−8 − √3", "−8 + √5", "None of these"]
  },
  {
    id: 63, page: 6, col: 1,
    en: "Simplify the following expression: [(1 + p)(1 + p²)(1 + p⁴)(1 + p⁸)(1 + p¹⁶)(1 − p) − 1]",
    hi: "निम्नलिखित व्यंजक को सरल कीजिये: [(1 + p)(1 + p²)(1 + p⁴)(1 + p⁸)(1 + p¹⁶)(1 − p) − 1]",
    options: ["−p³²", "p³²", "(1 + p³²)", "(1 − p³²)"]
  },
  {
    id: 64, page: 6, col: 1,
    en: "The value of [p² − (q − r)²]/[(p + r)² − q²] + [q² − (p − r)²]/[(p + q)² − r²] + [r² − (p − q)²]/[(q + r)² − p²] is:",
    hi: "[p² − (q − r)²]/[(p + r)² − q²] + [q² − (p − r)²]/[(p + q)² − r²] + [r² − (p − q)²]/[(q + r)² − p²] का मान ज्ञात कीजिए|",
    options: ["1", "2", "0", "3"]
  },
  {
    id: 65, page: 6, col: 1,
    en: "If p − 2q = 4, then the value of p³ − 8q³ − 24pq − 64 is",
    hi: "अगर p − 2q = 4, तो p³ − 8q³ − 24pq − 64 का मान:",
    options: ["2", "0", "3", "-1"]
  },
  {
    id: 66, page: 6, col: 2,
    en: "If m − 5n = 2, then the value of (m³ − 125n³ − 30mn) is",
    hi: "अगर m − 5n = 2, तो (m³ − 125n³ − 30mn) का मान:",
    options: ["6", "7", "8", "9"]
  },
  {
    id: 67, page: 6, col: 2,
    en: "If x = ∛5 + 2, then the value of x³ − 6x² + 12x − 13 is",
    hi: "अगर x = ∛5 + 2, तो x³ − 6x² + 12x − 13 का मान:",
    options: ["-1", "1", "2", "0"]
  },
  {
    id: 68, page: 6, col: 2,
    en: "If 5x + 9y = 5 and 125x³ + 729y³ = 120, then the value of the product of x and y is",
    hi: "अगर 5x + 9y = 5 और 125x³ + 729y³ = 120 तो x और y का गुणनफल क्या होगा?",
    options: ["45", "1/9", "1/135", "135"]
  },
  {
    id: 69, page: 6, col: 2,
    en: "If p = 999, then the value of ∛(p(p² + 3p + 3) + 1) is",
    hi: "अगर p = 999, तो ∛(p(p² + 3p + 3) + 1) का मान:",
    options: ["1000", "999", "998", "1002"]
  },
  {
    id: 70, page: 6, col: 2,
    en: "If p = 124, then ∛(p(p² + 3p + 3) + 1) = ?",
    hi: "अगर p = 124, तो ∛(p(p² + 3p + 3) + 1) = ?",
    options: ["5", "7", "123", "125"]
  },
  {
    id: 71, page: 6, col: 2,
    en: "If p = 99, then value of p(p² + 3p + 3) is",
    hi: "अगर p = 99, तो p(p² + 3p + 3) का मान:",
    options: ["999", "9999", "99999", "999999"]
  },
  {
    id: 72, page: 6, col: 2,
    en: "If p³ + 3p² + 3p = 26, then the value of p² + 2p is:",
    hi: "यदि p³ + 3p² + 3p = 26 है, तो p² + 2p का मान ज्ञात कीजिए|",
    options: ["8", "12", "10", "15"]
  },

  // PAGE 7
  {
    id: 73, page: 7, col: 1,
    en: "If m = −9, n = 8, then the value of m³ − 3m² + 3m + 3n + 3n² + n³ is",
    hi: "अगर m = −9, n = 8, तो m³ − 3m² + 3m + 3n + 3n² + n³ का मान:",
    options: ["271", "-271", "-1", "0"]
  },
  {
    id: 74, page: 7, col: 1,
    en: "If x + y + z = 2s find (s − x)³ + (s − y)³ + 3(s − x)(s − y)z = ?",
    hi: "यदि x + y + z = 2s है, तो (s − x)³ + (s − y)³ + 3(s − x)(s − y)z का मान ज्ञात करो |",
    options: ["z³", "−z³", "0", "2z³"]
  },
  {
    id: 75, page: 7, col: 1,
    en: "If (8x³ + 27y³) ÷ (2x + 3y) = (Ax² + Bxy + Cy²), then the value of (5A + 4B + 3C) is",
    hi: "यदि (8x³ + 27y³) ÷ (2x + 3y) = (Ax² + Bxy + Cy²) तो (5A + 4B + 3C) का मान है:",
    options: ["27", "24", "23", "71"]
  },
  {
    id: 76, page: 7, col: 1,
    en: "If 8x³ − 27y³ = (Ax + By)(Cx² − Dy² + 6xy), then (A + B + C − D) is equal to:",
    hi: "यदि 8x³ − 27y³ = (Ax + By)(Cx² − Dy² + 6xy) है, तो (A + B + C − D) निम्नलिखित में से किसके बराबर है?",
    options: ["-12", "12", "15", "9"]
  },
  {
    id: 77, page: 7, col: 1,
    en: "If 2√2x³ − 3√3y³ = (√2x − √3y)(Ax² + By² + Cxy), then the value of A² + B² − C² is:",
    hi: "यदि 2√2x³ − 3√3y³ = (√2x − √3y)(Ax² + By² + Cxy) है, तो A² + B² − C² का क्या मान है:",
    options: ["11", "7", "19", "10"]
  },
  {
    id: 78, page: 7, col: 1,
    en: "If 24√3x³ + 5√5y³ = (2√3x + √5y) × (Ax² + Bxy + Cy²), then what is the value of (A² − B² + C²)?",
    hi: "यदि 24√3x³ + 5√5y³ = (2√3x + √5y) × (Ax² + Bxy + Cy²) है, तो (A² − B² + C²) का मान क्या होगा ?",
    options: ["108", "128", "109", "139"]
  },
  {
    id: 79, page: 7, col: 2,
    en: "If 250√2x³ − 5√5y³ = (5√2x − √5y)(Ax² + Bxy + Cy²), then the value of (A + C − √10B) is:",
    hi: "यदि 250√2x³ − 5√5y³ = (5√2x − √5y)(Ax² + Bxy + Cy²) है, तो (A + C − √10B) का मान है:",
    options: ["10", "5", "5√2", "2√5"]
  },
  {
    id: 80, page: 7, col: 2,
    en: "If (135√5x³ − 2√2y³) ÷ (3√5x − √2y) = Ax² + By² + √10Cxy, then the value of (A + B − 9C) is:",
    hi: "यदि (135√5x³ − 2√2y³) ÷ (3√5x − √2y) = Ax² + By² + √10Cxy, तो (A + B − 9C) का मान है:",
    options: ["20", "18", "10", "12"]
  },
  {
    id: 81, page: 7, col: 2,
    en: "If x⁶ − 512y⁶ = (x² + Ay²)(x⁴ − Bx²y² + Cy⁴), then what is the value of (A + B − C)?",
    hi: "अगर x⁶ − 512y⁶ = (x² + Ay²)(x⁴ − Bx²y² + Cy⁴), तो (A + B − C) का मान क्या है?",
    options: ["−72", "72", "−80", "48"]
  },
  {
    id: 82, page: 7, col: 2,
    en: "If [8(x + y)³ − 27(x − y)³] ÷ (5y − x) = Ax² + Bxy + Cy² then the value of (A + B + C) is:",
    hi: "यदि [8(x + y)³ − 27(x − y)³] ÷ (5y − x) = Ax² + Bxy + Cy² तो (A + B + C) का मान है:",
    options: ["27", "24", "16", "18"]
  },
  {
    id: 83, page: 7, col: 2,
    en: "If 8(a + b)³ + (a − b)³ = (3a + b)(Aa² + Bab + Cb²), then what is the value of (A + B − C)?",
    hi: "यदि 8(a + b)³ + (a − b)³ = (3a + b)(Aa² + Bab + Cb²) है, तो (A + B − C) का मान क्या होगा ?",
    options: ["2", "4", "10", "11"]
  },

  // PAGE 8
  {
    id: 84, page: 8, col: 1,
    en: "If 8(x + y)³ − (x − y)³ = (x + 3y)(Ax² + Bxy + Cy²), then the value of (A − B − C) is :",
    hi: "यदि 8(x + y)³ − (x − y)³ = (x + 3y)(Ax² + Bxy + Cy²) है, तो (A − B − C) का मान है:",
    options: ["-2", "-6", "10", "14"]
  },
  {
    id: 85, page: 8, col: 1,
    en: "Given that (2x + y)³ − (x + 2y)³ = (x − y)[A(x² + y²) + Bxy], the value of (2A − B) is:",
    hi: "दिया गया है कि (2x + y)³ − (x + 2y)³ = (x − y)[A(x² + y²) + Bxy] है, तो (2A − B) का मान ज्ञात करें|",
    options: ["7", "6", "0", "1"]
  },
  {
    id: 86, page: 8, col: 1,
    en: "If (x³ − y³) : (x² + xy + y²) = 5 : 1 and (x² − y²) : (x − y) = 7 : 1, then the ratio 2x : 3y equals",
    hi: "अगर (x³ − y³) : (x² + xy + y²) = 5 : 1 और (x² − y²) : (x − y) = 7 : 1 है तो 2x : 3y पता करो|",
    options: ["4 : 1", "2 : 3", "4 : 3", "3 : 2"]
  },
  {
    id: 87, page: 8, col: 1,
    en: "Simplify the following expression: [(62 × 62 × 62) − 3(62 × 62 × 22) + 3(62 × 22 × 22) − (22 × 22 × 22)] / (8 × 8 × 8)",
    hi: "निम्नलिखित व्यंजक को हल कीजिए: [(62 × 62 × 62) − 3(62 × 62 × 22) + 3(62 × 22 × 22) − (22 × 22 × 22)] / (8 × 8 × 8)",
    options: ["225", "1250", "125", "25"]
  },
  {
    id: 88, page: 8, col: 1,
    en: "[(253)³ + (247)³] / [25.3 × 2.53 − 62.491 + 2.47 × 24.7] = 50 × 10ᵏ, k = ?",
    hi: "[(253)³ + (247)³] / [25.3 × 2.53 − 62.491 + 2.47 × 24.7] = 50 × 10ᵏ, k = ?",
    options: ["3", "4", "2", "-3"]
  },
  {
    id: 89, page: 8, col: 1,
    en: "[775 × 775 × 775 + 225 × 225 × 225] / [77.5 × 77.5 + 22.5 × 22.5 − 77.5 × 22.5] is equal to:",
    hi: "[775 × 775 × 775 + 225 × 225 × 225] / [77.5 × 77.5 + 22.5 × 22.5 − 77.5 × 22.5] का मान ज्ञात करें|",
    options: ["100", "10000", "100000", "10"]
  },
  {
    id: 90, page: 8, col: 2,
    en: "Simplify the following: [0.01 × 0.01 × 0.01 + 0.003 × 0.003 × 0.003] / [0.05 × 0.05 − 0.015 × 0.05 + 0.015 × 0.015]",
    hi: "निम्नलिखित को सरलीकरण कीजिए: [0.01 × 0.01 × 0.01 + 0.003 × 0.003 × 0.003] / [0.05 × 0.05 − 0.015 × 0.05 + 0.015 × 0.015]",
    options: ["(13/25) × 10³", "(13/15) × 10⁻³", "(13/15) × 10³", "(13/25) × 10⁻³"]
  },
  {
    id: 91, page: 8, col: 2,
    en: "The simplified value of (1 − 2xy/(x² + y²)) ÷ ((x³ − y³)/(x − y) − 3xy) is",
    hi: "मान निकालें : (1 − 2xy/(x² + y²)) ÷ ((x³ − y³)/(x − y) − 3xy)",
    options: ["1/(x² − y²)", "1/(x² + y²)", "1/(x − y)", "1/(x + y)"]
  },
  {
    id: 92, page: 8, col: 2,
    en: "If a³ + b³ = 110 and a + b = 5, then (a + b)² − 3ab is equal to",
    hi: "अगर a³ + b³ = 110 और a + b = 5, तो (a + b)² − 3ab बराबर है",
    options: ["52", "32", "42", "22"]
  },
  {
    id: 93, page: 8, col: 2,
    en: "If a³ + b³ = 1344 and a + b = 28, then (a + b)² − 3ab is equal to",
    hi: "अगर a³ + b³ = 1344 और a + b = 28, तो (a + b)² − 3ab बराबर है",
    options: ["24", "16", "32", "48"]
  },
  {
    id: 94, page: 8, col: 2,
    en: "On simplification, (x³ − y³)/[x((x + y)² − 3xy)] ÷ [y((x − y)² + 3xy)]/(x³ + y³) × [(x + y)² − (x − y)²]/(x² − y²) is equal to:",
    hi: "सरलीकरण पर, (x³ − y³)/[x((x + y)² − 3xy)] ÷ [y((x − y)² + 3xy)]/(x³ + y³) × [(x + y)² − (x − y)²]/(x² − y²) इसके बराबर है:",
    options: ["4", "1", "1/2", "1/4"]
  },

  // PAGE 9
  {
    id: 95, page: 9, col: 1,
    en: "If P = (x³ + y³)/[(x − y)² + 3xy], Q = [(x + y)² − 3xy]/(x³ − y³) and R = [(x + y)² + (x − y)²]/(x² − y²), then what is the value of (P ÷ Q) × R?",
    hi: "अगर P = (x³ + y³)/[(x − y)² + 3xy], Q = [(x + y)² − 3xy]/(x³ − y³) और R = [(x + y)² + (x − y)²]/(x² − y²), तो (P ÷ Q) × R का मान क्या है?",
    options: ["2(x² + y²)", "4xy", "x² + y²", "2xy"]
  },
  {
    id: 96, page: 9, col: 1,
    en: "If P = (x⁴ − 8x)/(x³ − x² − 2x), Q = (x² + 2x + 1)/(x² − 4x − 5) and R = (2x² + 4x + 8)/(x − 5), then (P × Q) ÷ R is equal to:",
    hi: "अगर P = (x⁴ − 8x)/(x³ − x² − 2x), Q = (x² + 2x + 1)/(x² − 4x − 5) और R = (2x² + 4x + 8)/(x − 5) तो (P × Q) ÷ R बराबर है:",
    options: ["1/2", "1", "2", "4"]
  },
  {
    id: 97, page: 9, col: 1,
    en: "(x + 1/x)(x − 1/x)(x² + 1/x² − 1)(x² + 1/x² + 1) is",
    hi: "(x + 1/x)(x − 1/x)(x² + 1/x² − 1)(x² + 1/x² + 1) का मान है:",
    options: ["x⁶ + 1/x⁶", "x⁸ + 1/x⁸", "x⁸ − 1/x⁸", "x⁶ − 1/x⁶"]
  },
  {
    id: 98, page: 9, col: 1,
    en: "If x⁶ + 1/x⁶ = k(x² + 1/x²), then k is equal to",
    hi: "यदि x⁶ + 1/x⁶ = k(x² + 1/x²) है, तो k बराबर है :",
    options: ["(x² − 1 + 1/x²)", "(x⁴ − 1 + 1/x⁴)", "(x⁴ + 1 + 1/x⁴)", "(x⁴ − 1 − 1/x⁴)"]
  },
  {
    id: 99, page: 9, col: 1,
    en: "If a + b = 1 and a³ + b³ + 3ab = k, then the value of k is",
    hi: "अगर a + b = 1 और a³ + b³ + 3ab = k तो k का मान:",
    options: ["1", "3", "5", "7"]
  },
  {
    id: 100, page: 9, col: 1,
    en: "If p³ − q³ = (p − q){(p − q)² − xpq}, then the value of x is",
    hi: "अगर p³ − q³ = (p − q){(p − q)² − xpq} है तो x का मान:",
    options: ["-1", "3", "1", "-3"]
  },
  {
    id: 101, page: 9, col: 2,
    en: "The value of (x^(1/3) + x^(−1/3))(x^(2/3) − 1 + x^(−2/3)) is:",
    hi: "(x^(1/3) + x^(−1/3))(x^(2/3) − 1 + x^(−2/3)) का मान है :",
    options: ["x¹ + x^(2/3)", "x + x^(−1/3)", "x^(1/3) + x⁻¹", "x + x⁻¹"]
  },
  {
    id: 102, page: 9, col: 2,
    en: "If (a² + b²)³ = (a³ + b³)², then the value of a/b + b/a is",
    hi: "यदि (a² + b²)³ = (a³ + b³)² है, तो a/b + b/a का मान है :",
    options: ["1/3", "2/3", "−1/3", "−2/3"]
  },
  {
    id: 103, page: 9, col: 2,
    en: "If x is a rational number and [(x + 1)³ − (x − 1)³] / [(x + 1)² − (x − 1)²] = 2, then the sum of numerator and denominator of x is:",
    hi: "अगर x एक परिमेय संख्या है और [(x + 1)³ − (x − 1)³] / [(x + 1)² − (x − 1)²] = 2 है तो x के अंश और हर का जोड़ ज्ञात करें:",
    options: ["3", "4", "5", "7"]
  },
  {
    id: 104, page: 9, col: 2,
    en: "If xy(x + y) = 1, then the value of 1/(x³y³) − x³ − y³",
    hi: "अगर xy(x + y) = 1, तो 1/(x³y³) − x³ − y³:",
    options: ["0", "1", "3", "-2"]
  },
  {
    id: 105, page: 9, col: 2,
    en: "If x(x − 3) = −1, then the value of x³(x³ − 18) is",
    hi: "अगर x(x − 3) = −1, तो x³(x³ − 18) का मान:",
    options: ["-1", "2", "1", "0"]
  },
  {
    id: 106, page: 9, col: 2,
    en: "If x = 2 + 2^(1/3) + 2^(2/3) then what is the value of x³ − 6x² + 6x?",
    hi: "अगर x = 2 + 2^(1/3) + 2^(2/3) है तो x³ − 6x² + 6x का मान क्या होगा?",
    options: ["3", "2", "1", "0"]
  },

  // PAGE 10
  {
    id: 107, page: 10, col: 1,
    en: "If a² + b² + ab = 0, then (a³ − b³) is equal to",
    hi: "अगर a² + b² + ab = 0 है, तो (a³ − b³):",
    options: ["0", "1", "(a + b)³", "a²b⁴ + a⁴b²"]
  },
  {
    id: 108, page: 10, col: 1,
    en: "If a/b + b/a = 1, a ≠ 0, b ≠ 0 the value of a³ + b³ is",
    hi: "अगर a/b + b/a = 1, a ≠ 0, b ≠ 0 तो a³ + b³ का मान:",
    options: ["0", "1", "-1", "2"]
  },
  {
    id: 109, page: 10, col: 1,
    en: "If a = b²/(b − a), then the value of a³ + b³ is",
    hi: "अगर a = b²/(b − a), तो a³ + b³ का मान:",
    options: ["6ab", "0", "1", "2"]
  },
  {
    id: 110, page: 10, col: 1,
    en: "If 1/(x + y) = 1/x + 1/y then the value of x³ − y³ is",
    hi: "अगर 1/(x + y) = 1/x + 1/y तो x³ − y³ का मान:",
    options: ["0", "1", "-1", "2"]
  },
  {
    id: 111, page: 10, col: 1,
    en: "If a⁴ + b⁴ = a²b², then (a⁶ + b⁶) equals",
    hi: "अगर a⁴ + b⁴ = a²b² है, तो (a⁶ + b⁶):",
    options: ["0", "1", "a² + b²", "a²b⁴ + a⁴b²"]
  },
  {
    id: 112, page: 10, col: 1,
    en: "If a² + a + 1 = 0, then the value of a⁹ is",
    hi: "अगर a² + a + 1 = 0 है, तो a⁹ का मान:",
    options: ["2", "-1", "1", "0"]
  },
  {
    id: 113, page: 10, col: 1,
    en: "If a² + a + 1 = 0, then the value of a⁵ + a⁴ + 1 is",
    hi: "अगर a² + a + 1 = 0 है, तो a⁵ + a⁴ + 1 का मान:",
    options: ["1", "0", "a + 1", "a²"]
  },
  {
    id: 114, page: 10, col: 1,
    en: "If a³ + 3a² + 9a = 1, then what is the value of a³ + (3/a)?",
    hi: "यदि a³ + 3a² + 9a = 1 हो, तो a³ + (3/a) का मान क्या है?",
    options: ["31", "26", "28", "24"]
  },
  {
    id: 115, page: 10, col: 2,
    en: "If a + a² + a³ − 1 = 0, then what is the value of a³ + 1/a?",
    hi: "यदि a + a² + a³ − 1 = 0 हो, तो a³ + 1/a का मान क्या है?",
    options: ["1", "4", "2", "3"]
  },
  {
    id: 116, page: 10, col: 2,
    en: "If a + 1/a + 1 = 0 (a ≠ 0) then the value of (a⁴ − a) is:",
    hi: "अगर a + 1/a + 1 = 0 (a ≠ 0) है तो (a⁴ − a) का मान:",
    options: ["0", "1", "-2a", "-1"]
  },
  {
    id: 117, page: 10, col: 2,
    en: "If X + Y = 10 and XY = 4, then what is the value of X⁴ + Y⁴?",
    hi: "यदि X + Y = 10 तथा XY = 4 है, तो X⁴ + Y⁴ का मान क्या है?",
    options: ["8464", "8432", "7478", "6218"]
  },
  {
    id: 118, page: 10, col: 2,
    en: "If x = √5 + 1 & y = √5 − 1 then the value of x²/y² + y²/x² + 4[x/y + y/x] + 6 is",
    hi: "यदि x = √5 + 1 तथा y = √5 − 1 है, तो x²/y² + y²/x² + 4[x/y + y/x] + 6 का मान क्या है?",
    options: ["31", "23√5", "27√5", "25"]
  },
  {
    id: 119, page: 10, col: 2,
    en: "If a + b = 27 and a³ + b³ = 5427, then find ab.",
    hi: "यदि a + b = 27 और a³ + b³ = 5427 है, तो ab का मान ज्ञात करें|",
    options: ["143", "135", "176", "149"]
  },
  {
    id: 120, page: 10, col: 2,
    en: "The difference between two numbers is 3 and the difference between their cubes is 999. Find the difference between their squares.",
    hi: "दो संख्याओं के बीच का अंतर 3 है और उनके घनों के बीच का अंतर 999 है| उनके वर्गों का अंतर ज्ञात कीजिए|",
    options: ["81", "63", "36", "18"]
  },

  // PAGE 11
  {
    id: 121, page: 11, col: 1,
    en: "If the difference between two numbers is 5 and the difference of their cubes is 1850, then the difference between their squares is:",
    hi: "यदि दो संख्याओं का अंतर 5 है और उनके घनों का अंतर 1850 है, तो उनके वर्गों के मध्य कितना अंतर होगा?",
    options: ["5√482", "5√483", "5√484", "5√485"]
  },
  {
    id: 122, page: 11, col: 1,
    en: "If x + y = 7 and xy = 10, then the value of (1/x³ + 1/y³) is:",
    hi: "यदि x + y = 7 और xy = 10, तो (1/x³ + 1/y³) का मान है:",
    options: ["0.543", "0.131", "0.133", "0.454"]
  },
  {
    id: 123, page: 11, col: 1,
    en: "If a³ = 117 + b³ and a = 3 + b, then the value of a + b is :",
    hi: "यदि a³ = 117 + b³ और a = 3 + b हो, तो a + b का मान निकालें ?",
    options: ["±7", "±49", "±13", "0"]
  },
  {
    id: 124, page: 11, col: 1,
    en: "If x = (√3 − √2)/(√3 + √2) and y = (√3 + √2)/(√3 − √2) then the value of x³ + y³ is",
    hi: "अगर x = (√3 − √2)/(√3 + √2) और y = (√3 + √2)/(√3 − √2) तो x³ + y³ का मान:",
    options: ["950", "730", "650", "970"]
  },
  {
    id: 125, page: 11, col: 1,
    en: "If x = (√5 + √3)/(√5 − √3) and y is the reciprocal of x, then what is the value of (x³ − y³)?",
    hi: "यदि x = (√5 + √3)/(√5 − √3) है और y, x का व्युत्क्रम है तो (x³ − y³) का मान है:",
    options: ["120√15", "114√15", "126√15", "123√15"]
  },
  {
    id: 126, page: 11, col: 2,
    en: "If x³ + y³ = 416 and x + y = 8, then find x⁴ + y⁴.",
    hi: "यदि x³ + y³ = 416 और x + y = 8 है तो x⁴ + y⁴ का मान ज्ञात कीजिए|",
    options: ["3002", "3204", "3004", "3104"]
  },
  {
    id: 127, page: 11, col: 2,
    en: "If a² + b² = 99 and ab = 11, (a > 0, b > 0) then the value of (a³ + b³) is :",
    hi: "यदि a² + b² = 99 और ab = 11, (a > 0, b > 0) तो (a³ + b³) का मान है:",
    options: ["1250", "968", "1100", "1080"]
  },
  {
    id: 128, page: 11, col: 2,
    en: "If a² + b² = 88 and ab = 6, (a > 0, b > 0) then what is the value of (a³ + b³) is ?",
    hi: "यदि a² + b² = 88 और ab = 6, (a > 0, b > 0) तो (a³ + b³) का मान क्या है?",
    options: ["980", "1180", "820", "1000"]
  },
  {
    id: 129, page: 11, col: 2,
    en: "If x² + y² = 45 and x − y = 5 then what is the value of x³ − y³?",
    hi: "यदि x² + y² = 45 और x − y = 5 है, तो x³ − y³ का मान ज्ञात करें|",
    options: ["150", "250", "−25", "275"]
  },
  {
    id: 130, page: 11, col: 2,
    en: "If a + b = p, ab = q, then (a⁴ + b⁴) is equal to:",
    hi: "यदि a + b = p, ab = q है, तो (a⁴ + b⁴) का मान ज्ञात कीजिए|",
    options: ["p⁴ − 2p²q² + q²", "p⁴ − 4p²q² + 2q²", "p⁴ − 4p²q + q²", "p⁴ − 4p²q + 2q²"]
  },
  {
    id: 131, page: 11, col: 2,
    en: "If a + b = p, ab = q, then (a⁴ + b⁴) is equal to:",
    hi: "यदि a + b = p, ab = q है, तो (a⁴ + b⁴) का मान ज्ञात कीजिए|",
    options: ["p⁴ − 2p²q² + q²", "p⁴ − 4p²q² + 2q²", "p⁴ − 4p²q + q²", "p⁴ − 4p²q + 2q²"]
  },

  // PAGE 12
  {
    id: 132, page: 12, col: 1,
    en: "If 8a³ + b³ = 16 and 2a + b = 4, then find the value of 16a⁴ + b⁴.",
    hi: "यदि 8a³ + b³ = 16 और 2a + b = 4 है, तो 16a⁴ + b⁴ का मान क्या होगा?",
    options: ["32", "36", "28", "38"]
  },
  {
    id: 133, page: 12, col: 1,
    en: "If 16x² + y² = 48 and xy = 2, x, y > 0, then the value of (64x³ + y³) is:",
    hi: "यदि 16x² + y² = 48 और xy = 2, x, y > 0 है, तो (64x³ + y³) का मान ज्ञात करें|",
    options: ["320", "300", "240", "340"]
  },
  {
    id: 134, page: 12, col: 1,
    en: "x, y are two positive numbers such that x > y. If x⁴ + y⁴ = 706 and xy = 15, then the value of 2x + 3y is:",
    hi: "x, y दो ऐसी धनात्मक संख्याएँ हैं कि x > y है| यदि x⁴ + y⁴ = 706 और xy = 15 है, तो 2x + 3y का मान ज्ञात करें|",
    options: ["19", "20", "18", "15"]
  },
  {
    id: 135, page: 12, col: 1,
    en: "If (x² + 1/(49x²)) = 15 5/7, then what is the value of (x + 1/(7x))?",
    hi: "यदि (x² + 1/(49x²)) = 15 5/7 है, तो (x + 1/(7x)) का मान क्या होगा?",
    options: ["7", "±7", "±4", "4"]
  },
  {
    id: 136, page: 12, col: 1,
    en: "If x⁴ + 16/x⁴ = 27217, x > 0, then the value of x + 2/x is:",
    hi: "यदि x⁴ + 16/x⁴ = 27217, x > 0 है, तो x + 2/x का मान क्या होगा?",
    options: ["17", "11", "15", "13"]
  },
  {
    id: 137, page: 12, col: 1,
    en: "If 20x² − 30x + 1 = 0, then what is the value of 25x² + 1/(16x²)?",
    hi: "यदि 20x² − 30x + 1 = 0, तो 25x² + 1/(16x²) का मान क्या है?",
    options: ["53 1/2", "58 1/2", "53 3/4", "58 3/4"]
  },
  {
    id: 138, page: 12, col: 2,
    en: "If 2x² − 8x − 1 = 0, then what is the value of 8x³ − 1/x³ ?",
    hi: "यदि 2x² − 8x − 1 = 0 है, तो 8x³ − 1/x³ का मान ज्ञात करें|",
    options: ["524", "560", "464", "540"]
  },
  {
    id: 139, page: 12, col: 2,
    en: "If x + 1/(15x) = 3 then the value of 9x³ + 1/(375x³) will be:",
    hi: "यदि x + 1/(15x) = 3 है, तो 9x³ + 1/(375x³) का मान ज्ञात करें|",
    options: ["237.6", "376.2", "273.6", "367.2"]
  },
  {
    id: 140, page: 12, col: 2,
    en: "If (4a − 3b) = 1, ab = 1/2, where a > 0 and b > 0, what is the value of (64a³ + 27b³)?",
    hi: "यदि (4a − 3b) = 1, ab = 1/2 हैं, जहाँ a > 0 और b > 0 है, (64a³ + 27b³) का मान क्या होगा ?",
    options: ["15", "25", "30", "35"]
  }
];
