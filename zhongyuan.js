/* 推導《中原音韻》
 *
 * 可選四家擬音方案：
 *
 * - 楊耐思. 中原音韻音系. 北京: 中國社會科學出版社, 1981.
 * - 寧繼福. 中原音韻表稿. 長春: 吉林文史出版社, 1985.
 * - 薛鳳生. 中原音韻音位系統. 魯國堯, 侍建國, 譯. 北京: 北京語言學院出版社, 1990.
 * - unt. 《中原音韻》音系簡述, 2021. https://zhuanlan.zhihu.com/p/353713058
 *
 * @author unt
 */

const is = (...x) => 音韻地位.屬於(...x);
const when = (...x) => 音韻地位.判斷(...x);

if (!音韻地位) return [
  ['顯示', [5,
    '音位（薛鳳生, 1990）',
    '音位（unt, 2021）',
    '音值（楊耐思, 1981）',
    '音值（寧繼福, 1985）',
    '音值（unt, 2021）',
  ]],
  ['標記古入聲字', true],
  ['包含部分例外音變', true],
  ['異讀分隔符（留空則爲換行）', ''],
  ['高元音開口呼', 選項.顯示?.includes('unt') ?? true ? [1, 'ɨ', 'ə'] : null],
  ['皆來韻梗二見入', 選項.顯示?.includes('unt') ?? true ? [2, 'aj', '(j)aj', 'jaj'] : null],
];

const 例外 = 選項.包含部分例外音變;
let 層次 = 0; // 本方案只涉及 0 和 1 兩個層次。對入聲來說，0 代表白讀，1 代表文讀

function 調整音韻地位() {
  function 調整(表達式, 調整屬性) { if (is(表達式)) 音韻地位 = 音韻地位.調整(調整屬性); }
  // 輕唇化例外
  調整('明母 尤韻', { 等: '一', 韻: '侯' });
  調整('明母 東韻', { 等: '一' });

  調整('云母 通攝 平聲', { 母: '匣' }); // 熊
  if (!例外) return;

  // 流攝脣音入遇攝字
  調整('明母 侯韻 上聲', { 韻: '模' }); // 母某牡畝（謀戊在《廣韻》中涉及的字太多，不加入）
  if (層次 === 0) 調整('尤韻 並母 平上聲', { 韻: '虞' }); // 浮、婦阜負（《中原音韻》僅魚模，元曲押魚模、尤侯）
  調整('尤韻 幫滂母 去聲', { 韻: '虞' }); // 富、副

  // 蟹攝二等入假攝字
  if (when([
    ['佳韻', [
      ['並母 上聲', true], // 罷
      ['見母 開口 平聲', true], // 佳
      ['溪母 合口 平聲', true], // 咼
      ['見匣母 合口 去聲', true], // 卦掛、畫
      [層次 === 1 && '疑母 開口 平聲', true], // 涯\崖
      [層次 === 1 && '生母 開口 去聲', true], // 洒\曬
    ]],
    ['夬韻 匣母 合口 去聲', true], // 話
  ])) 調整('蟹攝', { 韻: '麻' });

  調整('端母 蕭韻 上聲', { 母: '泥' }); // 鳥
  調整('生母 山韻 上聲', { 母: '初' }); // 産
  調整('書母 通攝 舒聲', { 母: '昌' }); // 舂
  調整('書母 鍾韻 入聲', { 母: '昌' }); // 束
  if (層次 === 0) 調整('書母 支韻 開口 去聲', { 母: '昌' }); // 翅\施
  調整('見母 蕭韻 平聲', { 母: '曉' }); // 梟鴞驍

  if (層次 === 0) {
    調整('果攝 開口 (定泥母 去聲 或 透母 平聲)', { 韻: '麻', 等: '二' }); // 大那+他
    調整('端母 庚韻 上聲', { 韻: '麻' }); // 打
  }
}

function get聲母() {
  return when([
    [例外, [
      ['崇母 止攝 仄聲', 'ʂ'], // 士
      ['常母 平聲 (支韻 合口 或 魚尤宵韻)', 'tʂʰ'], // 垂蜍讎韶
      ['常母 深攝 平聲', 'ʂ'], // 忱煁
      ['船母 平聲 合口', 'tʂʰ'], // 船唇
      [層次 === 1 && '船母 曾攝 舒聲', 'tʂʰ'], // 乗\繩

      [層次 === 1 && '匣母 寒韻 合口 平聲', ''], // 丸\桓
      ['匣母 肴韻 平聲', 'x'], // 爻。《中州樂府音韻類編》與哮小韻陰陽配對，《中州音韻》與遙小韻合併
      ['以母 蟹攝 合口', 'ɻ'], // 鋭
      [層次 === 0 && '脂韻 以母 合口 平聲', 'ʋ'], // 惟\遺
      ['疑母', [
        ['宕攝 三等 開口', 'ŋ'], // 仰、虐瘧
        ['山攝 三四等 開口 入聲', 'n'], // 囓臬糵
        ['咸攝 三四等 入聲', 'ŋ'], // 業鄴
        [層次 === 1 && '梗攝 二等 入聲', 'ŋ'], // 額
        ['效攝 一等 仄聲', 'ŋ'], // 傲奡鏊
      ]], // 俺《廣韻》未收，不考慮
    ]],

    ['東鍾微虞廢文元歌陽尤凡韻 三等 非 重紐A類', [ // “非 重紐A類”用於過濾𩦠小韻，“歌韻”用於包含縛小韻
      ['幫滂並母', 'f'], ['明母', 'ʋ'],
    ]],
    ['幫母 或 並母 仄聲', 'p'], ['滂並母', 'pʰ'], ['明母', 'm'],
    ['端母 或 定母 仄聲', 't'], ['透定母', 'tʰ'], ['泥孃母', 'n'], ['來母', 'l'],
    ['見母 或 羣母 仄聲', 'k'], ['溪羣母', 'kʰ'], ['影疑云以母', ''], ['曉匣母', 'x'],
    ['精母 或 從母 仄聲', 'ts'], ['清從母', 'tsʰ'], ['心邪俟母', 's'],

    ['常母 平聲 陽聲韻', 'tʂʰ'],
    ['知莊章母 或 澄崇母 仄聲', 'tʂ'], ['徹澄初崇昌母', 'tʂʰ'], ['生俟常書船母', 'ʂ'], ['日母', 'ɻ'],
  ], '無聲母規則', true);
}

function get韻母() {
  let 洪細 = when([
    [例外, [
      ['見影組 二等 開口 梗攝 平聲', [
        ['曉母', ''], // 亨
        ['匣母 耕韻', ''], // 莖
        [層次 === 1 && '影母', ''], // 甖
      ]],
      ['通攝 三等', [
        ['日母 入聲', 'j'], // 辱褥
        ['溪羣母 平聲', 'j'], // 穹芎、窮藭蛩卭笻
        [層次 === 1 && '影母 平聲', ''], // 癰廱壅\邕嗈雍
      ]]
    ]],

    ['幫組 微廢韻', 'j'],
    ['幫組 東鍾微虞廢文元歌陽尤凡韻 三等 非 重紐A類', ''],
    ['莊組', ''],

    ['(精章組 或 日母) 止攝 開口', ''],
    ['宕攝 合口 三等', ''],
    ['通攝 三等', [
      ['知章組 非 孃母 或 日母', [
        ['舒聲', ''],
        [層次 === 1 && '入聲', ''],
      ]],
      ['見溪羣母 舒聲', ''], // 弓拱恐共
    ]],

    ['三四等 或 見影組 二等 非 合口', 'j'],
    ['', ''],
  ], '無洪細規則', true);

  let 開合 = when([
    [例外, [
      ['止蟹攝 四等 合口 匣母 平聲', ''], // 畦携
      ['止蟹攝 重紐A類 合口 見母 去聲', ''], // 季
      ['脂韻 以母 合口 平聲', ''], // 遺
      [層次 === 1 && '以母 合口 山攝', ''], // 緣沿掾\捐鉛鳶
      [層次 === 1 && '曉匣母 先韻 合口', ''], // 懸縣血
      [層次 === 1 && '清青韻 合口', ''],

      ['見組 祭韻 合口', ''], // 鱖

      [層次 === 0 && '疑母 歌韻 開口 上聲', 'w'], // 我
      [層次 === 1 && '定母 宕江攝 入聲', ''], // 鐸

      ['止蟹攝 重紐B類', [
        ['幫母 去聲', ''], // 秘祕賁\詖
        ['滂母 上聲', ''], // 嚭
      ]],
      ['止蟹攝 重紐A類', [
        ['幫母 平聲', 'w'], // 卑（避諱）
        ['幫母 支韻 去聲', 'w'], // 臂
        ['並母 仄聲', 'w'], // 婢避幣\斃
        ['明母 去聲', 'w'], // 袂寐
      ]],
    ]],

    ['幫組', [
      ['一等 非 通宕曾流效攝', 'w'],
      [層次 === 1 && '宕攝 入聲', 'w'],
      ['曾攝 一等 入聲', 'w'],
      ['文歌韻', 'w'],
      ['(止蟹攝 或 臻攝 入聲) 重紐B類', 'w'], // 蟹攝幫三實際上無 B 類
    ]],

    ['果江攝 銳音 或 宕攝 莊組', 'w'],
    [層次 === 1 && '宕攝 入聲 銳音', 'w'],
    ['合口', 'w'],
    ['', ''],
  ], '無開合規則', true);

  let 韻基 = when([
    [例外, [
      [層次 === 1 && '心母 止攝 開口 上聲 非 脂韻', 'jɨj'], // 璽枲徙\死（避諱。元曲“徙”押支思）
      [層次 === 1 && '昌母 止攝 開口 非 (之韻 上聲 或 支韻 去聲)', 'jɨj'], // 蚩媸鴟幟熾\齒（元曲押支思）\\翅施
      ['知母 開口 (脂韻 平聲 或 之韻 上聲)', 'ɨ'], // 胝（元曲無）、徵（元曲押支思）

      [層次 === 0 && '幫滂並母 尤韻 仄聲', 'ʌw'], // 缶覆
      [層次 === 0 && '滂母 侯韻 上聲', 'ʌw'], // 剖
      [層次 === 0 && '明母 侯韻 去聲', 'aw'], // 茂
      ['效攝 一等 明母', 'aw'],
      ['泰韻 疑母 合口', 'aj'], // 外
    ]],

    ['遇攝', 'u'], // 魚模韻
    ['止攝 開口 (精莊章組 或 日母)', 'ɨ'], // 支思韻
    ['果攝 (一等 或 幫組 三等)', 'ʌ'], // 歌戈韻
    ['假攝 (二等 或 莊組)', 'a'], // 家麻韻
    ['果假攝 三等', 'ɛ'], // 車遮韻

    ['蟹攝 (一等 開口 或 二等 或 莊組) 或 止攝 莊組', 'aj'], // 皆來韻
    ['止蟹攝', 'ɨj'], // 齊微韻

    ['流攝', 'ɨw'], // 尤侯韻
    ['效攝 一等', 'ʌw'], // 蕭豪韻·一等。作爲共通音位，先將 ʌw 獨立，以便推導各家擬音
    ['效攝 (二等 或 莊組)', 'aw'], // 蕭豪韻·二等
    ['效攝 三四等', 'ɛw'], // 蕭豪韻·三四等

    ['舒聲', [
      [例外, [
        [層次 === 1 && '曾梗攝 一二等 非 開口 或 庚韻 三等 合口', 'uŋ'],
        ['溪母 登韻 上聲 或 以母 蒸韻 去聲', 'ɨn'], // 肯孕
        [層次 === 1 && '知母 清韻 或 昌母 蒸韻 去聲', 'ɨn'], // +貞稱（元曲押真文、庚青）
      ]],
      ['通攝', 'uŋ'], // 東鍾韻
      ['宕江攝', 'aŋ'], // 江陽韻
      ['曾梗攝', 'ɨŋ'], // 庚青韻

      ['臻攝 非 元韻', 'ɨn'], // 真文韻
      ['山攝 一等 非 開口', 'ʌn'], // 桓歡韻
      ['山攝 (一二等 或 莊組) 或 元韻 幫組', 'an'], // 寒山韻
      ['山攝 三四等 或 元韻', 'ɛn'], // 先天韻

      ['深攝', is`幫組` ? 'ɨn' : 'ɨm'], // 侵尋韻
      ['咸攝 (一二等 或 莊組) 或 嚴凡韻 幫組', is`幫組` ? 'an' : 'am'], // 監咸韻
      ['咸攝 三四等', is`幫組` ? 'ɛn' : 'ɛm'], // 廉纖韻
    ]],
    ['入聲', [
      [例外, [
        [層次 === 0 && '宕江攝 一等 明母', 'aw'],
        [層次 === 1 && '登韻 心母', 'ɨ'], // 塞（元曲押齊微）
        [層次 === 1 && '登韻 精母', 'aj'], // 則（元曲押齊微）
        [層次 === 1 && '曾梗攝 一等 溪母 開口', 'jaj'], // 刻（元曲押齊微、皆來）
        [層次 === 1 && '曾梗攝 二等 溪疑母 開口', 'ɛ'], // 客（元曲押皆來、車遮）、額（元曲只押皆來）
        [層次 === 0 && '文韻 並母', 'ʌ'], // 佛（元曲押魚模、歌戈）
        ['臻攝 一等 幫組 非 明母', 'ʌ'], // 勃
        [層次 === 0 && '日母 深攝', 'u'], // 入
      ]],

      ['通攝', [
        [層次 === 0 && '(精知章莊組 或 來日母) 東韻 三等', 'ɨw'],
        [層次 === 0 && '(知章莊組 或 日母) 鍾韻', 'ɨw'], // 燭褥+贖屬（元曲押魚模、尤侯）\辱（元曲只押魚模）
        ['', 'u'],
      ]],
      ['宕江攝', [
        [層次 === 1, 'ʌ'],
        ['一等 或 鈍音 三等 非 開口', 'ʌw'],
        ['', 'aw'],
      ]],

      ['臻攝 (一等 或 文韻 幫組 或 合口 非 元韻)', 'u'], // +麧（《中原音韻》未收）
      ['臻深攝 莊組 開口', 'ɨ'],
      ['曾梗臻深攝 (二等 或 莊組)', 'aj'],
      ['曾梗臻深攝 非 元韻', 'ɨj'],
      ['山咸攝 一等 非 (銳音 開口)', 'ʌ'],
      ['山咸攝 (一二等 或 莊組) 或 元嚴凡韻 幫組', 'a'],
      ['山咸攝 三四等 或 元韻', 'ɛ'],
    ]],
  ], '無韻基規則', true);


  let 韻母 = 洪細 + 開合 + 韻基;
  韻母 = 韻母.replace('wu', 'u');
  韻母 = 韻母.replace('jwɨj', 'wɨj');
  韻母 = 韻母.replace('jʌ', 'jwʌ');
  return 韻母;
}

function get聲調() {
  return when([
    [例外, [
      ['匣母 蟹攝 上聲 開口', '³'], // 駭蟹\解獬
      ['羣母 臻攝 上聲 合口 非 元韻', '³'], // 窘

      ['羣母 梗攝 三等 開口 入聲', '⁴ʼ'], // 劇
      ['生母 山攝 合口 入聲', '⁴ʼ'], // 刷
      ['影疑母 通臻攝 一等 入聲 非 開口', '³ʼ'], // 屋沃兀
      [層次 === 0 && '影母 眞韻 重紐A類 開口 入聲', '³ʼ'], // 一
    ]],
    ['平聲 (全清 或 次清)', '¹'],
    ['平聲 (全濁 或 次濁)', '²'],
    ['上聲 非 全濁', '³'],
    ['上去聲', '⁴'],
    ['入聲', [
      ['全濁', '²ʼ'],
      ['次濁 或 影母', '⁴ʼ'], // 影母入聲《中原音韻》按次濁歸派
      ['', '³ʼ'],
    ]],
  ], '無聲調規則', true);
}

function get音節() {
  let 聲母 = get聲母();
  let 韻母 = get韻母();
  let 聲調 = get聲調();
  const is脣音 = 'pmfʋ'.includes(聲母[0]);
  const is銳音 = 'tnlsʂɻ'.includes(聲母[0]);
  if (is脣音 && !'jwu'.includes(韻母[0])) 韻母 = 'β' + 韻母; // 以便推導薛鳳生和寧繼福擬音

  const 轉換規則字典 = {
    // 規則: (from, to, [condition, [else to]])
    '音位（unt, 2021）': [
      ['β', ''],
      ['ʌw', 'waw', is脣音, 'aw'],
      ['ɨ', 選項.高元音開口呼],
      ['jaj', 選項.皆來韻梗二見入, 聲調.includes('ʼ')],
    ],
    '音值（unt, 2021）': [
      ['β', ''],
      ['jw', 'ɥ'], ['ɨj', 'ɨi'],
      ['jɨ', 'i'], ['ii', 'i'],
      ['wɨ', 'u', !韻母.includes('ŋ')],
      ['ɥɨ', 'y', !韻母.includes('ŋ'), 'ɥi'],
      ['ʌw', 'waw', is脣音, 'aw'],
      ['wʌ', 'ɔ', is脣音 || is銳音 && 韻母 === 'wʌ', 'wɔ'],
      ['ɥʌ', 'jɔ'],
      ['ɨ', 選項.高元音開口呼],
      ['ə', 'ɹ̩', 韻母 === 'ə'], ['ɹ̩', 'ɻ̍', !聲母.includes('s')],
      ['jaj', 選項.皆來韻梗二見入, 聲調.includes('ʼ')],
    ],
    '音位（薛鳳生, 1990）': [
      ['ʰ', 'h'], ['ʋ', 'v'], ['ʂ', 'sr'], ['ɻ', 'r'],
      ['ts', 'c'], ['x', 'h'],
      ['waw', 'ow'], ['β', 'w'],
      ['j', 'y'],
      ['ɨ', 'e', 韻母.includes('ŋ')], ['ɛ', 'e'],
      ['u', 'wɨ', !韻母.includes('ŋ'), 'wo'], ['ʌ', 'o'],
    ],
    '音值（楊耐思, 1981）': [
      ['ʰ', 'ʻ'], ['ʋ', 'v'], ['ʂ', 'ʃ'], ['ɻ', 'ʒ'],
      ['β', ''],
      ['ɨ', 'ï', 韻母 === 'ɨ', 'ə'],
      ['j', 'i'], ['w', 'u'],
      ['əi', 'ei'], ['iei', 'i'],
      ['uau', 'au'], ['ʌu', 'au'], ['iau', 'iɛu', is銳音],
      ['ʌ', 'o'], ['iuo', 'io'], ['uon', 'on'],
      ['ia', 'i̯a', !韻母.includes('ŋ')],
    ],
    '音值（寧繼福, 1985）': [
      ['β', '', 'jw'.includes(韻母.slice(-1)), 'w'],
      ['ʰ', 'ʻ'], ['ɻ', 'ɽ'],
      ['ɨ', 'ï', 韻母 === 'ɨ', 'ə'],
      ['j', 'i'], ['w', 'u'],
      ['uəi', 'ui'], ['əi', 'ei'], ['iei', 'i'],
      ['uʌu', 'au'], ['ʌu', 'ɑu'],
      ['uau', 'au'], ['iau', 'au', !聲調.includes('ʼ')],
      ['iɛu', 'iau'],
      ['ʌ', 'ɔ'], ['iuɔ', 'iɔ'],
    ],
  };
  let 音节 = 聲母 + 韻母 + 聲調;
  轉換規則字典[選項.顯示]?.forEach(規則 => {
    if (規則.length === 2 || 規則[2]) 音节 = 音节.replace(new RegExp(規則[0], 'g'), 規則[1]);
    else if (規則.length === 4) 音节 = 音节.replace(new RegExp(規則[0], 'g'), 規則[3]);
  });

  if (!選項.標記古入聲字) 音节 = 音节.replace('ʼ', '');
  return 音节;
}

const 音韻地位備份 = 音韻地位;
const 結果 = [0, 1].map(i => {
  層次 = i;
  音韻地位 = 音韻地位備份;
  調整音韻地位();
  return get音節();
});
return [...new Set(結果)].join(選項['異讀分隔符（留空則爲換行）'] || '\n');
