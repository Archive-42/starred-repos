/* In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another".

Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.

Return the sentence after the replacement.


Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
*/

var replaceWords = function(dictionary, sentence) {
    const dict = new Set(dictionary);
    const words = sentence.split(' ');

    for (let i = 0; i < words.length; i++) {
        for (let j = 1; j < words[i].length; j++) {
            if (dict.has(words[i].substring(0, j)))
                words[i] = words[i].substring(0, j);
        }
    }

    return words.join(' ')
};
