import { FontPickerItem } from './FontPickerItem';

export interface FontName {
    name: string;
    family: string;
    localizedName?: string;
}

// When localized name is missing, use the name
export function getLocalizedFontName(fontName: FontName): string {
    return fontName.localizedName ? fontName.localizedName : fontName.name;
}

export const FONT_NAME_LIST: FontName[] = [
    { name: 'Arial', family: 'Arial,Helvetica,sans-serif' },
    { name: 'Arial Black', family: "'Arial Black',Arial,sans-serif" },
    { name: 'Calibri', family: 'Calibri,Helvetica,sans-serif' },
    { name: 'Calibri Light', family: "'Calibri Light','Helvetica Light',sans-serif" },
    { name: 'Cambria', family: 'Cambria,Georgia,serif' },
    { name: 'Candara', family: 'Candara,Optima,sans-serif' },
    { name: 'Century Gothic', family: "'Century Gothic',sans-serif" },
    { name: 'Comic Sans MS', family: "'Comic Sans MS',Chalkboard,cursive" },
    { name: 'Consolas', family: 'Consolas,Courier,monospace' },
    { name: 'Constantia', family: "Constantia,'Hoefler Text',serif" },
    { name: 'Corbel', family: 'Corbel,Skia,sans-serif' },
    { name: 'Courier New', family: "'Courier New',monospace" },
    {
        name: 'Franklin Gothic Book',
        family: "'Franklin Gothic Book','Avenir Next Condensed',sans-serif",
    },
    {
        name: 'Franklin Gothic Demi',
        family: "'Franklin Gothic Demi','Avenir Next Condensed Demi Bold',sans-serif",
    },
    {
        name: 'Franklin Gothic Medium',
        family: "'Franklin Gothic Medium','Avenir Next Condensed Medium',sans-serif",
    },
    { name: 'Garamond', family: 'Garamond,Georgia,serif' },
    { name: 'Georgia', family: 'Georgia,serif' },
    { name: 'Impact', family: 'Impact,Charcoal,sans-serif' },
    { name: 'Lucida Console', family: "'Lucida Console',Monaco,monospace" },
    { name: 'Lucida Handwriting', family: "'Lucida Handwriting','Apple Chancery',cursive" },
    { name: 'Lucida Sans Unicode', family: "'Lucida Sans Unicode','Lucida Grande',sans-serif" },
    { name: 'Palatino Linotype', family: "'Palatino Linotype','Book Antiqua',Palatino,serif" },
    { name: 'Segoe UI', family: "'Segoe UI','Helvetica Neue',sans-serif" },
    { name: 'Sitka Heading', family: "'Sitka Heading',Cochin,serif" },
    { name: 'Sitka Text', family: "'Sitka Text',Cochin,serif" },
    { name: 'Tahoma', family: 'Tahoma,Geneva,sans-serif' },
    { name: 'Times', family: "Times,'Times New Roman',serif" },
    { name: 'Times New Roman', family: "'Times New Roman',Times,serif" },
    { name: 'Trebuchet MS', family: "'Trebuchet MS',Trebuchet,sans-serif" },
    { name: 'TW Cen MT', family: "'TW Cen MT','Century Gothic',sans-serif" },
    { name: 'Verdana', family: 'Verdana,Geneva,sans-serif' },
    { name: '-', family: '-' }, //divider between fonts for different scripts (order is by style)
    {
        name: 'Microsoft YaHei',
        family: "'Microsoft YaHei','????????????',STHeiti,sans-serif",
        localizedName: '????????????',
    }, //chineseS Microsoft recommended font
    { name: 'SimHei', family: "SimHei,'??????',STHeiti,sans-serif", localizedName: '??????' }, //chineseS
    {
        name: 'NSimSun',
        family: "NSimSun,'?????????',SimSun,'??????',SimSun-ExtB,'??????-ExtB',STSong,serif",
        localizedName: '?????????',
    }, //chineseS
    { name: 'FangSong', family: "FangSong,'??????',STFangsong,serif", localizedName: '??????' }, //chineseS
    { name: 'SimLi', family: "SimLi,'??????','Baoli SC',serif", localizedName: '??????' }, //chineseS
    { name: 'KaiTi', family: "KaiTi,'??????',STKaiti,serif", localizedName: '??????' }, //chineseS
    { name: '-', family: '-' }, //divider between fonts for different scripts (order is by style)
    {
        name: 'Microsoft JhengHei',
        family: "'Microsoft JhengHei','???????????????','Apple LiGothic',sans-serif",
        localizedName: '???????????????',
    }, //chineseT Microsoft recommended font
    {
        name: 'PMingLiU',
        family: "PMingLiU,'????????????',PMingLiU-ExtB,'????????????-ExtB','Apple LiSung',serif",
        localizedName: '????????????',
    }, //chineseT
    { name: 'DFKai-SB', family: "DFKai-SB,'?????????','BiauKai',serif", localizedName: '?????????' }, //chineseT
    { name: '-', family: '-' }, //divider between fonts for different scripts (order is alphabetical by foundry)
    {
        name: 'Meiryo',
        family: "Meiryo,'????????????','Hiragino Sans',sans-serif",
        localizedName: '????????????',
    }, //japanese
    {
        name: 'MS PGothic',
        family:
            "'MS PGothic','?????? ???????????????','MS Gothic','?????? ????????????','Hiragino Kaku Gothic ProN',sans-serif",
        localizedName: '?????? ???????????????',
    }, //japanese
    {
        name: 'MS PMincho',
        family: "'MS PMincho','?????? ?????????','MS Mincho','?????? ??????','Hiragino Mincho ProN',serif",
        localizedName: '?????? ?????????',
    }, //japanese
    {
        name: 'Yu Gothic',
        family: "'Yu Gothic','???????????????','YuGothic',sans-serif",
        localizedName: '???????????????',
    }, //japanese
    { name: 'Yu Mincho', family: "'Yu Mincho','?????????','YuMincho',serif", localizedName: '?????????' }, //japanese
    { name: '-', family: '-' }, //divider between fonts for different scripts (order is for legacy reasons)
    {
        name: 'Malgun Gothic',
        family: "'Malgun Gothic','?????? ??????',AppleGothic,sans-serif",
        localizedName: '?????? ??????',
    }, //korean Microsoft recommended font
    { name: 'Gulim', family: "Gulim,'??????','Nanum Gothic',sans-serif", localizedName: '??????' }, //korean
    { name: 'Dotum', family: "Dotum,'??????',AppleGothic,sans-serif", localizedName: '??????' }, //korean
    { name: 'Batang', family: "Batang,'??????',AppleMyungjo,serif", localizedName: '??????' }, //korean
    { name: 'BatangChe', family: "BatangChe,'?????????',AppleMyungjo,serif", localizedName: '?????????' }, //korean
    { name: 'Gungsuh', family: "Gungsuh,'??????',GungSeo,serif", localizedName: '??????' }, //korean
    { name: '-', family: '-' }, //divider between fonts for different scripts (order is alphabetical)
    { name: 'Leelawadee UI', family: "'Leelawadee UI',Thonburi,sans-serif" }, //thai Microsoft recommended font
    { name: 'Angsana New', family: "'Angsana New','Leelawadee UI',Sathu,serif" }, //thai
    { name: 'Cordia New', family: "'Cordia New','Leelawadee UI',Silom,sans-serif" }, //thai
    { name: 'DaunPenh', family: "DaunPenh,'Leelawadee UI','Khmer MN',sans-serif" }, //khmer
    { name: '-', family: '-' }, //divider between fonts for different scripts (order is alphabetical)
    { name: 'Nirmala UI', family: "'Nirmala UI',sans-serif" }, //indic Microsoft recommended font
    { name: 'Gautami', family: "Gautami,'Nirmala UI','Telugu MN',sans-serif" }, //indic
    { name: 'Iskoola Pota', family: "'Iskoola Pota','Nirmala UI','Sinhala MN',sans-serif" }, //indic
    { name: 'Kalinga', family: "Kalinga,'Nirmala UI','Oriya MN',sans-serif" }, //indic
    { name: 'Kartika', family: "Kartika,'Nirmala UI','Malayalam MN',sans-serif" }, //indic
    { name: 'Latha', family: "Latha,'Nirmala UI','Tamil MN',sans-serif" }, //indic
    { name: 'Mangal', family: "Mangal,'Nirmala UI','Devanagari Sangam MN',sans-serif" }, //indic
    { name: 'Raavi', family: "Raavi,'Nirmala UI','Gurmukhi MN',sans-serif" }, //indic
    { name: 'Shruti', family: "Shruti,'Nirmala UI','Gujarati Sangam MN',sans-serif" }, //indic
    { name: 'Tunga', family: "Tunga,'Nirmala UI','Kannada MN',sans-serif" }, //indic
    { name: 'Vrinda', family: "Vrinda,'Nirmala UI','Bangla MN',sans-serif" }, //indic
    { name: '-', family: '-' }, //divider between fonts for different scripts
    { name: 'Nyala', family: 'Nyala,Kefa,sans-serif' }, //other-ethiopic
    { name: 'Sylfaen', family: 'Sylfaen,Mshtakan,Menlo,serif' }, //other-armenian-georgian
];

export const FONT_NAME_MENU_ITEMS: FontPickerItem[] = FONT_NAME_LIST.map(font => ({
    selectValue: font.name,
    displayValue: getLocalizedFontName(font),
    submitValue: font.family,
}));

// Given a short font string (can be the name or localized name), return font family
export function getFontFamily(font: string): string {
    let targetFont: string = font.toUpperCase();
    for (let i: number = 0; i < FONT_NAME_LIST.length; i++) {
        let fn: FontName = FONT_NAME_LIST[i];
        if (
            fn.name.toUpperCase() == targetFont ||
            (fn.localizedName && fn.localizedName.toUpperCase() == targetFont)
        ) {
            return fn.family;
        }
    }

    return null;
}
