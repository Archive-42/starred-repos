function extract() {
    var candidates = removeStopwords(preprocess());
    x = candidates.length;
    var text = candidates.join(" ");
    var bag = new Set(text.split(" "));
    bag = Array.from(bag);
    bag = bag.slice(1);
    var m = bag.length;

    var freq = [];
    var degree = new Array(m).fill(0);
    for (var i = 0; i < m; i++) {
        freq.push(countInstances(text, " "+bag[i]+" "));
        for (var c = 0; c < x; c++) {
            if (candidates[c].includes(" "+bag[i]+" ")) {
                degree[i] += countInstances(candidates[c], " ") - 1;
            }
        }
    }
    var word_scores = [];
    for (var i = 0; i < m; i++) {
        word_scores.push(degree[i] / freq[i]);
    }
    var candidate_scores = new Array(x).fill(0);
    for (var c = 0; c < x; c++) {
        var candi = candidates[c].slice(1, -1).split(" ");
        for (var i = 0; i < candi.length; i++) {
            var wi = bag.indexOf(candi[i]);
            candidate_scores[c] += word_scores[wi];
        }
    }
    var combination = [];
    for (var i = 1; i < x; i++) {
        combination.push(
            {score: candidate_scores[i], kw: candidates[i].slice(1, -1)}
        );
    }
    combination.sort(function(a, b) {
    return ((a.score > b.score) ? -1 : ((a.score == b.score) ? 0 : 1));
    });

    var temp = [];
    for (var i = 0; i < Math.floor(x/4); i++) {
        temp.push(combination[i].kw);
    }

    var combination = [];
    for (var i = 0; i < Math.floor(x/5); i++) {
        if (combination.includes(temp[i]) == false) {
            combination.push(temp[i]);
        }
    }
    x = combination.length;
    kw_list = '<b>KEYWORDS:</b><br><br>'
    kw_list += '<div class="row"><div class="column">'
    for (var i = 0; i < Math.floor(x/2); i++) {
        kw_list += "<p>"+combination[i] + "</p>";
    }
    kw_list += "</div>";
    kw_list += '<div class="column">'
    for (var i = Math.floor(x/2); i < x; i++) {
        kw_list += "<p>"+combination[i] + "</p>";
    }
    kw_list += "</div>";
    kw_list+= "</div>";

    document.getElementById("kw").innerHTML = kw_list;
}


var fox_stoplist = ['a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'b', 'back', 'backed', 'backing', 'backs', 'be', 'because', 'become', 'becomes', 'became', 'been', 'before', 'began', 'behind', 'being', 'beings', 'best', 'better', 'between', 'big', 'both', 'but', 'by', 'c', 'came', 'can', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'd', 'did', 'differ', 'different', 'differently', 'do', 'does', 'done', 'down', 'downed', 'downing', 'downs', 'during', 'e', 'each', 'early', 'either', 'end', 'ended', 'ending', 'ends', 'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'f', 'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'g', 'gave', 'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'go', 'going', 'good', 'goods', 'got', 'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'h', 'had', 'has', 'have', 'having', 'he', 'her', 'herself', 'here', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how', 'however', 'i', 'if', 'important', 'in', 'interest', 'interested', 'interesting', 'interests', 'into', 'is', 'it', 'its', 'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'l', 'large', 'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'm', 'made', 'make', 'making', 'man', 'many', 'may', 'me', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'my', 'myself', 'n', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'newer', 'newest', 'next', 'no', 'non', 'not', 'nobody', 'noone', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'o', 'of', 'off', 'often', 'old', 'older', 'oldest', 'on', 'once', 'one', 'only', 'open', 'opened', 'opening', 'opens', 'or', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'our', 'out', 'over', 'p', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents', 'problem', 'problems', 'put', 'puts', 'q', 'quite', 'r', 'rather', 'really', 'right', 'room', 'rooms', 's', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'sees', 'seem', 'seemed', 'seeming', 'seems', 'several', 'shall', 'she', 'should', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'so', 'some', 'somebody', 'someone', 'something', 'somewhere', 'state', 'states', 'still', 'such', 'sure', 't', 'take', 'taken', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'to', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'u', 'under', 'until', 'up', 'upon', 'us', 'use', 'uses', 'used', 'v', 'very', 'w', 'want', 'wanted', 'wanting', 'wants', 'was', 'way', 'ways', 'we', 'well', 'wells', 'went', 'were', 'what', 'when', 'where', 'whether', 'which', 'while', 'who', 'whole', 'whose', 'why', 'will', 'with', 'within', 'without', 'work', 'worked', 'working', 'works', 'would', 'y', 'year', 'years', 'yet', 'you', 'young', 'younger', 'youngest', 'your', 'yours'];

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function preprocess() {
    var delimiters = ["(", ")", "[", "]", "{", "}", ".", ",", ":", ";", "!", "#", "$", "&", "?", " - ", "_", "+", "<", ">", '“', '”', '–', "…", ' / ', "|", '’', "'"];
    var str = document.getElementById("textbox").value.toLowerCase();
    str = " " + str + " ";
    str = splitMulti(str, delimiters).join(" wwttff ");
    return str;
}

function removeStopwords(str) {
    n = fox_stoplist.length;
    str = str.replaceAll("n't", " not");
    str = str.replaceAll("n’t", " not");
    str = str.replaceAll("'ve", " have");
    str = str.replaceAll('’ve', " have");
    str = str.replaceAll('t’s', "t is");
    str = str.replaceAll("t's", "t is");
    str = str.replaceAll("’ll", " will");
    str = str.replaceAll("'ll", " will");
    str = str.replaceAll('\n', " wwttff ");
    for (var i = 0; i < n; i++) {
        str = str.replaceAll(" "+fox_stoplist[i]+" ", " wwttff ");
    }
    str = str.replace(/\s+/g, ' ');
    //str = str.replaceAll("wwttff", "+");
    str = str.split("wwttff");

    n = str.length;
    var candidates = [];
    for (var i = 0; i < n; i++) {
        if (str[i].length >= 4) {
            candidates.push(str[i]);
        }
    }
    return candidates;
}


function countInstances(string, word) {
   return string.split(word).length - 1;
}

function splitMulti(str, tokens){
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(var i = 1; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
}
