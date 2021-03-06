import _ from 'underscore';
import user from 'js/lib/user';
import Multitracker from 'js/app/multitrackerSingleton';
import rtlCssJS from 'rtl-css-js';
import epic from 'bundles/epic/client';

// load common translator so we can get the locale
// of the current RequireJS context
// @see http://requirejs.org/docs/api.html#multiversion
import _t from 'i18n!nls/page';

function languageTagToName(): Record<string, string> {
  return {
    ab: _t('Abkhaz'),
    aa: _t('Afar'),
    af: _t('Afrikaans'),
    ak: _t('Akan'),
    sq: _t('Albanian'),
    am: _t('Amharic'),
    ar: _t('Arabic'),
    an: _t('Aragonese'),
    hy: _t('Armenian'),
    as: _t('Assamese'),
    av: _t('Avaric'),
    ae: _t('Avestan'),
    ay: _t('Aymara'),
    az: _t('Azerbaijani'),
    bm: _t('Bambara'),
    ba: _t('Bashkir'),
    eu: _t('Basque'),
    be: _t('Belarusian'),
    bn: _t('Bengali'),
    bh: _t('Bihari'),
    bi: _t('Bislama'),
    bs: _t('Bosnian'),
    br: _t('Breton'),
    bg: _t('Bulgarian'),
    my: _t('Burmese'),
    ca: _t('Catalan'),
    ch: _t('Chamorro'),
    ce: _t('Chechen'),
    ny: _t('Chichewa'),
    zh: _t('Chinese'),
    'zh-CN': _t('Chinese (Simplified)'),
    'zh-TW': _t('Chinese (Traditional)'),
    cv: _t('Chuvash'),
    kw: _t('Cornish'),
    co: _t('Corsican'),
    cr: _t('Cree'),
    hr: _t('Croatian'),
    cs: _t('Czech'),
    da: _t('Danish'),
    dv: _t('Divehi'),
    nl: _t('Dutch'),
    dz: _t('Dzongkha'),
    en: _t('English'),
    eo: _t('Esperanto'),
    et: _t('Estonian'),
    ee: _t('Ewe'),
    fo: _t('Faroese'),
    fj: _t('Fijian'),
    fi: _t('Finnish'),
    fr: _t('French'),
    ff: _t('Fula'),
    gl: _t('Galician'),
    ka: _t('Georgian'),
    de: _t('German'),
    el: _t('Greek'),
    gn: _t('GuaranĂ­'),
    gu: _t('Gujarati'),
    ht: _t('Haitian'),
    ha: _t('Hausa'),
    he: _t('Hebrew'),
    hz: _t('Herero'),
    hi: _t('Hindi'),
    ho: _t('Hiri Motu'),
    hu: _t('Hungarian'),
    ia: _t('Interlingua'),
    id: _t('Indonesian'),
    ie: _t('Interlingue'),
    ga: _t('Irish'),
    ig: _t('Igbo'),
    ik: _t('Inupiaq'),
    io: _t('Ido'),
    is: _t('Icelandic'),
    it: _t('Italian'),
    iu: _t('Inuktitut'),
    ja: _t('Japanese'),
    jv: _t('Javanese'),
    kl: _t('Kalaallisut'),
    kn: _t('Kannada'),
    kr: _t('Kanuri'),
    ks: _t('Kashmiri'),
    kk: _t('Kazakh'),
    km: _t('Khmer'),
    ki: _t('Kikuyu'),
    rw: _t('Kinyarwanda'),
    ky: _t('Kyrgyz'),
    kv: _t('Komi'),
    kg: _t('Kongo'),
    ko: _t('Korean'),
    ku: _t('Kurdish'),
    kj: _t('Kwanyama'),
    la: _t('Latin'),
    lb: _t('Luxembourgish'),
    lg: _t('Ganda'),
    li: _t('Limburgish'),
    ln: _t('Lingala'),
    lo: _t('Lao'),
    lt: _t('Lithuanian'),
    lu: _t('Luba-Katanga'),
    lv: _t('Latvian'),
    gv: _t('Manx'),
    mk: _t('Macedonian (FYROM)'),
    mg: _t('Malagasy'),
    ms: _t('Malay'),
    ml: _t('Malayalam'),
    mt: _t('Maltese'),
    mi: _t('MÄ?ori'),
    mr: _t('Marathi'),
    mh: _t('Marshallese'),
    mn: _t('Mongolian'),
    na: _t('Nauru'),
    nv: _t('Navajo'),
    nb: _t('Norwegian BokmĂ¥l'),
    nd: _t('North Ndebele'),
    ne: _t('Nepali'),
    ng: _t('Ndonga'),
    nn: _t('Norwegian Nynorsk'),
    no: _t('Norwegian'),
    ii: _t('Nuosu'),
    nr: _t('South Ndebele'),
    oc: _t('Occitan'),
    oj: _t('Ojibwe'),
    cu: _t('Old Church Slavonic'),
    om: _t('Oromo'),
    or: _t('Oriya'),
    os: _t('Ossetian'),
    pa: _t('Panjabi'),
    pi: _t('PÄ?li'),
    fa: _t('Persian'),
    pl: _t('Polish'),
    ps: _t('Pashto'),
    pt: _t('Portuguese (Brazilian)'),
    'pt-BR': _t('Portuguese (Brazilian)'),
    'pt-PT': _t('Portuguese (European)'),
    qu: _t('Quechua'),
    rm: _t('Romansh'),
    rn: _t('Kirundi'),
    ro: _t('Romanian'),
    ru: _t('Russian'),
    sa: _t('Sanskrit'),
    sc: _t('Sardinian'),
    sd: _t('Sindhi'),
    se: _t('Northern Sami'),
    sm: _t('Samoan'),
    sg: _t('Sango'),
    sr: _t('Serbian'),
    gd: _t('Gaelic'),
    sn: _t('Shona'),
    si: _t('Sinhala'),
    sk: _t('Slovak'),
    sl: _t('Slovene'),
    so: _t('Somali'),
    st: _t('Southern Sotho'),
    es: _t('Spanish'),
    su: _t('Sundanese'),
    sw: _t('Swahili'),
    ss: _t('Swati'),
    sv: _t('Swedish'),
    ta: _t('Tamil'),
    te: _t('Telugu'),
    tg: _t('Tajik'),
    th: _t('Thai'),
    ti: _t('Tigrinya'),
    bo: _t('Tibetan'),
    tk: _t('Turkmen'),
    tl: _t('Tagalog'),
    tn: _t('Tswana'),
    to: _t('Tonga'),
    tr: _t('Turkish'),
    ts: _t('Tsonga'),
    tt: _t('Tatar'),
    tw: _t('Twi'),
    ty: _t('Tahitian'),
    ug: _t('Uighur'),
    uk: _t('Ukrainian'),
    ur: _t('Urdu'),
    uz: _t('Uzbek'),
    ve: _t('Venda'),
    vi: _t('Vietnamese'),
    vo: _t('VolapĂ¼k'),
    wa: _t('Walloon'),
    cy: _t('Welsh'),
    wo: _t('Wolof'),
    fy: _t('Western Frisian'),
    xh: _t('Xhosa'),
    yi: _t('Yiddish'),
    yo: _t('Yoruba'),
    za: _t('Zhuang'),
    zu: _t('Zulu'),
  };
}

/**
 * NOTE: below is a list of language tags we currently support as languages for courses
 * see https://github.com/webedx-spark/infra-services/blob/main/libs/models/src/main/scala/org/coursera/languagecode/LanguageCode.scala
 * See TRANSCRIPTION_VENDOR_LANG_CODES for fully supported locales (we have vendor transcription for these)
 */
export const courseLanguageTags: string[] = [
  'af',
  'am',
  'ar',
  'az',
  'bg',
  'bn',
  'bs',
  'ca',
  'cs',
  'da',
  'de',
  'el',
  'es',
  'et',
  'eu',
  'en',
  'fa',
  'fi',
  'fr',
  'he',
  'hi',
  'hr',
  'hu',
  'hy',
  'id',
  'it',
  'ja',
  'jv',
  'ka',
  'kk',
  'km',
  'kn',
  'ko',
  'lt',
  'lv',
  'mk',
  'mn',
  'mr',
  'ms',
  'my',
  'ne',
  'nl',
  'no',
  'pl',
  'ps',
  'pt-BR',
  'pt-PT',
  'ro',
  'ru',
  'rw',
  'sk',
  'sl',
  'sq',
  'sr',
  'st',
  'sv',
  'sw',
  'ta',
  'te',
  'th',
  'tl',
  'tr',
  'tn',
  'uk',
  'ur',
  'uz',
  'vi',
  'xh',
  'yo',
  'zh-CN',
  'zh-TW',
  'zu',
];

// English, followed by translated languages in alphabetical order
export const supportedLanguageSubdomains: string[] = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru', 'zh', 'zh-tw'];

export const localeToRegionalHomePage: Record<string, string> = {
  'en-in': '/in',
};

export const localesWithHomePages = ['en-in'];

// special umbrella locales ar_AR, es_LA. Push arabic and spanish locales into these ones.
const facebookSpecialCases: Record<string, string> = {
  ar: 'ar_AR',
  es: 'es_LA',
};

const cmsSupportedLanguageSubdomains: Record<string, string> = {
  ...supportedLanguageSubdomains.reduce((acc, cur) => {
    acc[cur] = cur;
    return acc;
  }, {} as Record<string, string>),
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  'zh-tw': 'zh-Hant-TW',
  zh: 'zh-Hans',
};

/**
 * Convert a language code to the IETF language tag
 *
 * @param  {String} code any language code or accept-language encoding
 * @return String user's language code per IETF spec, e.g. en-US
 */
export function toIetfLanguageTag(code: string): string {
  const normalizeLanguageCode = (code || '').replace(/_/g, '-').split(/[;=,]/)[0];
  return normalizeLanguageCode.toLowerCase().replace(/(-[a-z]{1,}$)/, function (match) {
    return match.toUpperCase();
  });
}

/**
 * Get user's [IETF Language Tag](http://en.wikipedia.org/wiki/IETF_language_tag)
 * for the current user from RequireJS
 *
 * @return String user's language code per IETF spec, e.g. en-US
 */
export function getIetfLanguageTag(): string {
  try {
    return toIetfLanguageTag(_t.getLocale());
  } catch (e) {
    // in case of error, default to English and emit tracking event
    Multitracker.push(['user.language.error', { error: e }]);
    return 'en-US';
  }
}

/**
 * Shorten language codes to only contain the 2 character language codes
 * @param  {String} languageTag language tag
 * @return {String}      2 character language code (ISO-631)
 */
export function toLanguageCode(languageTag: string): string {
  return toIetfLanguageTag(languageTag).split('-')[0];
}

/**
 * Get user's language code (ISO-631) from the IETF language co
 * @return {String} User's ISO-631 language code
 */
export function getLanguageCode(): string {
  return toLanguageCode(getIetfLanguageTag());
}

/**
 * Moment requires language codes to be lowercase
 * @return {String} user's language code in IETF in lowercase as required by moment
 */
export function getMomentLanguage(): string {
  const lowerCaseIetfLanguage = getIetfLanguageTag().toLowerCase();
  switch (lowerCaseIetfLanguage) {
    case 'zh-tw':
      return 'zh-tw';
    default:
      return lowerCaseIetfLanguage.split('-')[0];
  }
}

/**
 * Get the locale string from the language name. E.g. en_US, zh_CN... etc
 * Intended for use with facebook integration localization.
 * As per https://developers.facebook.com/docs/internationalization, the Arabic and Spanish
 * localizations had to be coded as a special case, as facebook uses a non-standard "umbrella
 * locale" for those.
 *
 * @return {String}      locale name
 */
export function getFacebookLocaleString(): string {
  const localeString = getIetfLanguageTag().replace('-', '_');
  const localeLang = localeString.split('_')[0];
  return facebookSpecialCases[localeLang] || localeString;
}

/**
 * Get the locale string from the language name, e.g. en, es, etc.
 * This is primarily intended for use with our current CMS Contentful's APIs as its API takes in particular locale-region combinations.
 *
 * If given a locale that is not supported by Contentful or Coursera, we default to the English locale.
 */
export function getCmsLocaleString(): string {
  const languageCode = getLanguageCode();
  return cmsSupportedLanguageSubdomains[languageCode] || cmsSupportedLanguageSubdomains.en;
}

/**
 * Get the language name corresponding to a language code
 * For more specific language codes in with more components such as zh-tw,
 * this function will attempt to look up the code in decreasing order of
 * specificity, meaning chopping off components from the end 1 at a time,
 * until it either finds a name mapping and returns it, or returns the code
 * itself if there's no mapping
 * @param  {String} code language code
 * @return {String}      language name
 */
export function languageCodeToName(code: string): string {
  const languageCode = toIetfLanguageTag(code);
  const components = languageCode.split('-');
  const languageTagToNameObject = languageTagToName();
  let language;
  const languageMappingExists = components.some((c, i) => {
    const codeToTest = components.slice(0, components.length - i).join('-');
    language = languageTagToNameObject[toIetfLanguageTag(codeToTest)];
    return !!language;
  });

  return languageMappingExists && language != null ? language : code;
}

/**
 * Translate a csv containing language codes to a hash of code => language
 * @param  {String} csv csv of language codes
 * @return {Object}     hash of code => language
 */
export function languageCodeCSVtoLanguages(csv?: string): Record<string, string> {
  const subtitlesLangs = (csv || '').split(/,\s*/g).filter(Boolean);
  return _.reduce(
    subtitlesLangs,
    (memo, code) => {
      const modifiedMemo = memo;
      modifiedMemo[code] = languageCodeToName(code);
      return modifiedMemo;
    },
    {} as Record<string, string>
  );
}

/**
 * Detect if a language code is a right to left language
 * @param  {String}  language language code
 * @return {Boolean}          whether the language is right to left
 */
export function isRightToLeft(language: string): boolean {
  const rightToLeftLanguages = ['ar', 'he'];
  return _(rightToLeftLanguages).contains(toLanguageCode(language));
}

export function langDir(language: string): 'ltr' | 'rtl' {
  return isRightToLeft(language) ? 'rtl' : 'ltr';
}

/**
 * Detect if the user is using a right to left language
 * @return {Boolean} whether the user's language is right to left
 */
export function isUserRightToLeft(): boolean {
  return isRightToLeft(getIetfLanguageTag());
}

// this character map is written this way because uglify strips out quotes
// around keys in object literals. This causes problems in IE9 because it
// doesn't recognize raw latin unicode characters as keys
const RAW_LATIN_MAP: Record<string, string> = {
  A: 'Ă? Ä‚ áº® áº¶ áº° áº² áº´ Ç? Ă‚ áº¤ áº¬ áº¦ áº¨ áºª Ă„ Ç? È¦ Ç  áº  È€ Ă€ áº¢ È‚ Ä€ Ä„ Ă… Çº á¸€ Èº Ăƒ â±¯ á´€',
  AA: 'êœ²',
  AE: 'Ă† Ç¼ Ç¢ á´?',
  AO: 'êœ´',
  AU: 'êœ¶',
  AV: 'êœ¸ êœº',
  AY: 'êœ¼',
  B: 'á¸‚ á¸„ Æ? á¸† Éƒ Æ‚ Ê™ á´ƒ',
  C: 'Ä† ÄŒ Ă‡ á¸ˆ Äˆ Ä? Æ‡ È» êœ¾ á´„',
  D: 'Ä? á¸? á¸’ á¸? á¸Œ Æ? á¸? Ç² Ç… Ä? Æ‹ ê?¹ á´…',
  DZ: 'Ç± Ç„',
  E: 'Ă‰ Ä” Ä? È¨ á¸œ Ă? áº¾ á»† á»€ á»‚ á»„ á¸˜ Ă‹ Ä– áº¸ È„ Ăˆ áºº È† Ä’ á¸– á¸” Ä˜ É† áº¼ á¸? Æ? Æ? á´‡ â±»',
  ET: 'ê?ª',
  F: 'á¸? Æ‘ ê?» êœ°',
  G: 'Ç´ Ä? Ç¦ Ä¢ Äœ Ä  Æ“ á¸  Ç¤ ê?½ É¢ Ê›',
  H: 'á¸ª È? á¸¨ Ä¤ â±§ á¸¦ á¸¢ á¸¤ Ä¦ Êœ',
  I: 'Ă? Ä¬ Ç? Ă? Ă? á¸® Ä° á»? Èˆ ĂŒ á»ˆ È? Äª Ä® Æ— Ä¨ á¸¬ Éª',
  R: 'ê?‚ Å” Å˜ Å– á¹˜ á¹? á¹œ È? È’ á¹? ÉŒ â±¤ Ê? Ê€ á´™ á´?',
  S: 'ê?„ Å? á¹¤ Å  á¹¦ Å? Åœ È˜ á¹  á¹¢ á¹¨ êœ±',
  T: 'ê?† Å¤ Å¢ á¹° È? È¾ á¹ª á¹¬ Æ¬ á¹® Æ® Å¦ á´›',
  IS: 'ê?¬',
  J: 'Ä´ Éˆ á´?',
  K: 'á¸° Ç¨ Ä¶ â±© ê?‚ á¸² Æ˜ á¸´ ê?€ ê?„ á´‹',
  L: 'Ä¹ È½ Ä½ Ä» á¸¼ á¸¶ á¸¸ â±  ê?ˆ á¸º Ä¿ â±¢ Çˆ Å? ê?€ ÊŸ á´Œ',
  LJ: 'Ç‡',
  M: 'á¸¾ á¹€ á¹‚ â±® Æœ á´?',
  N: 'Åƒ Å‡ Å… á¹? á¹„ á¹† Ç¸ Æ? á¹ˆ È  Ç‹ Ă‘ É´ á´?',
  NJ: 'Ç?',
  O: 'Ă“ Å? Ç‘ Ă” á»? á»˜ á»’ á»” á»– Ă– Èª È® È° á»Œ Å? ÈŒ Ă’ á»? Æ  á»? á»¢ á»œ á»? á»  È? ê?? ê?Œ ÅŒ á¹’ á¹? ÆŸ Çª Ç¬ Ă˜ Ç¾ Ă• á¹Œ á¹? È¬ Æ† á´? á´?',
  OI: 'Æ¢',
  OO: 'ê??',
  OU: 'È¢ á´•',
  P: 'á¹” á¹– ê?’ Æ¤ ê?” â±£ ê?? á´˜',
  Q: 'ê?˜ ê?–',
  V: 'É… ê?? á¹¾ Æ² á¹¼ á´ ',
  TZ: 'êœ¨',
  U: 'Ă? Å¬ Ç“ Ă› á¹¶ Ăœ Ç— Ç™ Ç› Ç• á¹² á»¤ Å° È” Ă™ á»¦ Æ¯ á»¨ á»° á»ª á»¬ á»® È– Åª á¹º Å² Å® Å¨ á¹¸ á¹´ á´œ',
  VY: 'ê? ',
  W: 'áº‚ Å´ áº„ áº† áºˆ áº€ â±² á´¡',
  X: 'áºŒ áº?',
  Y: 'Ă? Å¶ Å¸ áº? á»´ á»² Æ³ á»¶ á»¾ È² É? á»¸ Ê?',
  Z: 'Å¹ Å½ áº? â±« Å» áº’ È¤ áº” Æµ á´¢',
  IJ: 'Ä²',
  OE: 'Å’ É¶',
  a: 'Ă¡ Äƒ áº¯ áº· áº± áº³ áºµ Ç? Ă¢ áº¥ áº­ áº§ áº© áº« Ă¤ ÇŸ È§ Ç¡ áº¡ È? Ă  áº£ Èƒ Ä? Ä… á¶? áº? Ă¥ Ç» á¸? â±¥ Ă£ É? â‚?',
  aa: 'êœ³',
  ae: 'Ă¦ Ç½ Ç£ á´‚',
  ao: 'êœµ',
  au: 'êœ·',
  av: 'êœ¹ êœ»',
  ay: 'êœ½',
  b: 'á¸ƒ á¸… É“ á¸‡ áµ¬ á¶€ Æ€ Æƒ',
  o: 'Éµ Ă³ Å? Ç’ Ă´ á»‘ á»™ á»“ á»• á»— Ă¶ È« È¯ È± á»? Å‘ È? Ă² á»? Æ¡ á»› á»£ á»? á»Ÿ á»¡ È? ê?‹ ê?? â±º Å? á¹“ á¹‘ Ç« Ç­ Ă¸ Ç¿ Ăµ á¹? á¹? È­ É” á¶— á´‘ á´“ â‚’',
  c: 'Ä‡ Ä? Ă§ á¸‰ Ä‰ É• Ä‹ Æˆ È¼ â†„ êœ¿',
  d: 'Ä? á¸‘ á¸“ È¡ á¸‹ á¸? É— á¶‘ á¸? áµ­ á¶? Ä‘ É– ÆŒ ê?º',
  i: 'Ä± Ă­ Ä­ Ç? Ă® Ă¯ á¸¯ á»‹ È‰ Ă¬ á»‰ È‹ Ä« Ä¯ á¶– É¨ Ä© á¸­ á´‰ áµ¢',
  j: 'È· ÉŸ Ê„ Ç° Äµ Ê? É‰ â±¼',
  dz: 'Ç³ Ç†',
  e: 'Ă© Ä• Ä› È© á¸? Ăª áº¿ á»‡ á»? á»ƒ á»… á¸™ Ă« Ä— áº¹ È… Ă¨ áº» È‡ Ä“ á¸— á¸• â±¸ Ä™ á¶’ É‡ áº½ á¸› É› á¶“ É˜ Ç? â‚‘',
  et: 'ê?«',
  f: 'á¸Ÿ Æ’ áµ® á¶‚ ê?¼',
  g: 'Çµ ÄŸ Ç§ Ä£ Ä? Ä¡ É  á¸¡ á¶ƒ Ç¥ áµ¹ É¡ áµ·',
  h: 'á¸« ÈŸ á¸© Ä¥ â±¨ á¸§ á¸£ á¸¥ É¦ áº– Ä§ É¥ Ê® Ê¯',
  hv: 'Æ•',
  r: 'ê?ƒ Å• Å™ Å— á¹™ á¹› á¹? È‘ É¾ áµ³ È“ á¹Ÿ É¼ áµ² á¶‰ É? É½ É¿ É¹ É» Éº â±¹ áµ£',
  s: 'ê?… Å¿ áºœ áº› áº? Å› á¹¥ Å¡ á¹§ ÅŸ Å? È™ á¹¡ á¹£ á¹© Ê‚ áµ´ á¶? È¿',
  t: 'ê?‡ Å¥ Å£ á¹± È› È¶ áº— â±¦ á¹« á¹­ Æ­ á¹¯ áµµ Æ« Êˆ Å§ Ê‡',
  is: 'ê?­',
  k: 'á¸± Ç© Ä· â±ª ê?ƒ á¸³ Æ™ á¸µ á¶„ ê?? ê?… Ê?',
  l: 'Äº Æ? É¬ Ä¾ Ä¼ á¸½ È´ á¸· á¸¹ â±¡ ê?‰ á¸» Å€ É« á¶… É­ Å‚ ê??',
  lj: 'Ç‰',
  m: 'á¸¿ á¹? á¹ƒ É± áµ¯ á¶† É¯ É°',
  n: 'Å„ Åˆ Å† á¹‹ Èµ á¹… á¹‡ Ç¹ É² á¹‰ Æ? áµ° á¶‡ É³ Ă±',
  nj: 'ÇŒ',
  oi: 'Æ£',
  oo: 'ê??',
  ou: 'È£',
  p: 'á¹• á¹— ê?“ Æ¥ áµ± á¶ˆ ê?• áµ½ ê?‘',
  q: 'ê?™ Ê  É‹ ê?—',
  u: 'á´? Ăº Å­ Ç” Ă» á¹· Ă¼ Ç˜ Ç? Çœ Ç– á¹³ á»¥ Å± È• Ă¹ á»§ Æ° á»© á»± á»« á»­ á»¯ È— Å« á¹» Å³ á¶™ Å¯ Å© á¹¹ á¹µ áµ¤',
  th: 'áµº',
  oe: 'á´” Å“',
  v: 'ÊŒ â±´ ê?Ÿ á¹¿ Ê‹ á¶Œ â±± á¹½ áµ¥',
  w: 'Ê? áºƒ Åµ áº… áº‡ áº‰ áº? â±³ áº˜',
  y: 'Ê? Ă½ Å· Ă¿ áº? á»µ á»³ Æ´ á»· á»¿ È³ áº™ É? á»¹',
  tz: 'êœ©',
  ue: 'áµ«',
  um: 'ê?¸',
  vy: 'ê?¡',
  x: 'áº? áº‹ á¶? â‚“',
  z: 'Åº Å¾ áº‘ Ê‘ â±¬ Å¼ áº“ È¥ áº• áµ¶ á¶? Ê? Æ¶ É€',
  ff: 'ï¬€',
  ffi: 'ï¬ƒ',
  ffl: 'ï¬„',
  fi: 'ï¬?',
  fl: 'ï¬‚',
  ij: 'Ä³',
  st: 'ï¬†',
};

// transform RAW_LATIN_MAP into a 1:1 latin => ascii character map
const LATIN_MAP: Record<string, string> = _.chain(RAW_LATIN_MAP)
  // convert to a list 1:1 character pairs
  .map(function (value, key) {
    return _.map(value.split(' '), function (v) {
      return [v, key];
    });
  })
  .flatten(true)
  .object()
  .value();

export function latinizeText(string: string): string {
  return string.replace(/[^A-Za-z0-9[] ]/g, function (a) {
    return LATIN_MAP[a] || a;
  });
}

export function getMobileBadgeLanguageCode(): string {
  const mobileBadgeLanguageCodes = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'pt-br', 'ru', 'zh-cn', 'zh-tw', 'ar'];

  const languageTagLower = getIetfLanguageTag().toLowerCase();
  if (_(mobileBadgeLanguageCodes).contains(languageTagLower)) {
    return languageTagLower;
  }

  const languageCode = getLanguageCode();
  if (languageCode === 'pt') {
    return 'pt-br';
  } else if (languageCode === 'es') {
    return 'es';
  } else if (languageCode === 'ar') {
    return 'ar';
  } else if (languageCode === 'zh') {
    return 'zh-cn';
  } else {
    return 'en';
  }
}

/*
 * mapping taken from libs/models/src/main/scala/org/coursera/languagecode/TranscriptionVendorLanguageCode.scala
 * with manual mapping of vendor's codes back to ours (via languageCodeToTranscriptionVendorCodeMapping)
 */

const TRANSCRIPTION_VENDOR_LANG_CODES = [
  'ar',
  'zh-tw',
  'zh-cn',
  'cs',
  'da',
  'nl',
  'en',
  'fr',
  'fi',
  'de',
  'el',
  'he',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'no',
  'pl',
  'pt-br',
  'ru',
  'es',
  'sk',
  'sv',
  'th',
  'tr',
  'vi',
];

/**
 * whether the language is supported for automatic transcription by our vendors
 * @param {string} langCode
 */
export const isFullySupportedLocale = (langCode: string): boolean =>
  TRANSCRIPTION_VENDOR_LANG_CODES.includes(langCode.toLowerCase());

/**
 * get current user's locale setting when available, default to `en`
 */
export const getUserLanguageCode = (): string => {
  const userLocale = user.get().locale;

  // we don't support the region for English here
  if (!userLocale || userLocale === 'en_US') {
    return 'en';
  }

  // e.g. zh_TW, pt_BR which we do support region here
  return userLocale.replace('_', '-');
};

// make style support rtl if language is rtl
// otherwise, there's no change
export const rtlStyle = <T extends {}>(styles: T, locale: string = _t.getLocale()): T => {
  if (isRightToLeft(locale)) {
    return rtlCssJS(styles);
  } else {
    // There's no need to change anything
    return styles;
  }
};

export const getLanguageDirection = (): 'rtl' | 'ltr' => {
  return isUserRightToLeft() ? 'rtl' : 'ltr';
};

export function isRenderingRightToLeft(): boolean {
  return Boolean(epic.get('RightToLeftLanguageSupport', 'RTLBuildEnabled') && isUserRightToLeft());
}

// a map of translated support page locales
export const supportPageLocale = {
  ar: 'ar',
};

export default {
  languageCodeCSVtoLanguages,
  languageCodeToName,
  latinizeText,
  isRightToLeft,
  courseLanguageTags,
  getIetfLanguageTag,
  getLanguageCode,
  getMomentLanguage,
  getFacebookLocaleString,
  getCmsLocaleString,
  toIetfLanguageTag,
  toLanguageCode,
  getMobileBadgeLanguageCode,
  supportedLanguageSubdomains,
  localeToRegionalHomePage,
  localesWithHomePages,
  isFullySupportedLocale,
  rtlStyle,
  getUserLanguageCode,
  getLanguageDirection,
  supportPageLocale,
};
