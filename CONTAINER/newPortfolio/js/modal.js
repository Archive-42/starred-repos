var yPosition;
var modalFooter, mfH3contentD, mfH3contentC, mfH3contentE;

var shareModal = document.getElementById("share-modal");

var shareButton = document.getElementById("share-button");
shareButton.onclick = () => {shareModal.style.display = "flex";};

var shareSpan = document.getElementsByClassName("share-close")[0];
shareSpan.onclick = () => {shareModal.style.display = "none";};

var modal = document.getElementById("modal");

var span = document.getElementById("close");
span.onclick = () => {closeModal();};

window.onclick = (event) => {if (event.target == shareModal) {shareModal.style.display = "none";}};
window.onclick = (event) => {if (event.target == modal) {closeModal()}};

const closeBtn = document.getElementById('close');
closeBtn.onclick = () => {closeModal()};

openModal = (projectModalName) => {
    var modal = document.getElementById("project-modal");
    modal.style.display = "flex";

    var modalContent = document.getElementById("modal-content");
    var modalHeader = document.getElementById("modal-header");
    var modalFooter = document.getElementById("modal-footer");

    modalContent.appendChild(modalFooter);

    var h2Holder = createHeaderElements('', modalHeader, 'div');

    h2Holder.id = 'modalH2Holder';

    // AQC, portfolio, swaap, blogbackend, nodeBE, cgol, nasaSearch, vbDatabase, javabe, ucCustomer, speechRecog, aQuack, webappFE
    if(projectModalName == 'vbDatabase'){
        modalFooter.classList.add('unfit-footer');
    }

    let generatedText = generateTextElements(projectModalName);
    
    h2content = createHeaderElements(generatedText[0], h2Holder, 'h2');    
    h3content = createHeaderElements(generatedText[1], h2Holder, 'h3');

    appendModalFooterElements(generatedText[2], generatedText[3], generatedText[4]);
    appendModalBodyElements(generatedText[5], generatedText[6], generatedText[7]);  

}

generateTextElements = (projectModalName) => {

    let h2Text, h3Text, techStackArray, featuresArray, pictureSRC, deployedLinkText, repoName, ccID;

    // AQC, portfolio, swaap, blogbackend, nodeBE, cgol, nasaSearch, vbDatabase, javabe, ucCustomer, speechRecog, aQuack, webappFE
    if(projectModalName == 'AQC'){

        h2Text = 'Company App:  Marketing Website';
        h3Text = "My court transcription company's new website using what I've learned at Lambda";

        deployedLinkText = 'https://www.aquoco.co/';
        repoName = 'newAQCWebsite';
        ccID = '043ebab30e06dbf85ed7';

        pictureSRC = 'AQC.webp';
        techStackArray = ['HTML', 'CSS', 'JavaScript', 'LESS', 'PHP'];
        featuresArray = ["Live solo project ranking 90th percentile in Google PageSpeed Insights & first-page results for 'seattle transcription' in Google", 'Ranks 100 for accessibility, best practices, & SEO, 90 in performance in Lighthouse', "Fourth iteration, utilizing what I've learned at Lambda", 'Animation', 'Mixins', 'Image carousel', 'Pure CSS gradients', 'Inside out underline to nav link hover', 'FAQ with expandable questions', 'Desktop, tablet, & mobile versions'];

    }
    
    else if(projectModalName == 'portfolio'){

        h2Text = 'Portfolio';
        h3Text = "Work of art featuring an Olympic National Park theme and lots of pure CSS animation";

        deployedLinkText = 'https://www.aquoco.co/erica-ingram/artsy/index.html';
        repoName = 'portfolio';
        ccID = '59600252b236458e449a';

        pictureSRC = 'portfolio.webp';
        techStackArray = ['HTML', 'CSS', 'JavaScript', 'GitHub Contributions Calendar'];
        featuresArray = ['Live solo project; works in all Chromium-based browsers', 'Olympic National Park theme', 'Pure heavy CSS animation scene (salmon, water, crab) w/ hand-drawn animals', 'Click the sun to toggle twinkling stars at night', 'Clouds in desktop version show park trivia', 'Each project on projects page has a hover overlay', 'Three pop-ups/modals originated from a sign on the beach', 'Inside out underline animation', 'GitHub contribution calendar', 'Desktop & mobile versions'];        

    }
    
    else if(projectModalName == 'swaap'){

        h2Text = 'Swaap';
        h3Text = "A contact trading app, a way for people to gather, collect and stay in contact with people that you meet, built remotely with continuous delivery by a seven-member crossfunctional team";

        deployedLinkText = 'https://www.swaap.co/';
        repoName = 'conference-contacts-fe';
        ccID = '68404cfcc6a6827234d1';

        pictureSRC = 'swaap.webp';
        techStackArray = ['React', 'Auth0', 'Reach Router', 'Apollo', 'Tailwind CSS'];
        featuresArray = ['Live team project', 'Give users ability to connect with each other through the app', 'Get and store contacts in a fast and simple way', 'Ability to message contacts', 'Find out where you met contacts', 'Desktop & mobile versions'];
        
    }
    
    else if(projectModalName == 'blogbackend'){

        h2Text = 'Blog Back End';
        h3Text = "API for a hypothetical blog contributed to by many authors with extensive query parameters and tagging functionality";

        deployedLinkText = 'https://blogbackend-eli.herokuapp.com/api';
        repoName = 'blogbackend';
        ccID = '1c7b5b2d9c8b7f4dbfa4';

        pictureSRC = 'blogbackend2.webp';
        techStackArray = ['Node.js', 'Express', 'Knex', 'bcrypt', 'Postman', 'PostgreSQL'];
        featuresArray = ['Live solo project', 'RESTful API with auth services for blog back end', '37 endpoints', 'Extensive query parameters', 'Top 20 most liked & read posts', 'Post tagging functionality', 'Cache functionality'];

    }
    
    else if(projectModalName == 'nodeBE'){

        h2Text = 'Company App:  Node Back End';
        h3Text = "Node back end for the online port of my company's VB database, used for transcript production and workflow management";

        deployedLinkText = 'https://transcript-webapp.herokuapp.com/api';
        repoName = 'webapp-backend';
        ccID = 'c1474fe518ccb398d184';

        pictureSRC = 'nodeBE2-thumb.webp';
        techStackArray = ['Node.js', 'Express', 'Knex', 'bcrypt', 'Postman', 'PostgreSQL'];
        featuresArray = ['Live solo project', 'RESTful API with auth services for transcript production system', '126 endpoints', 'CourtListener, Xero, PayPal, Wunderlist, & Office API support', 'Tested and documented via Postman'];
        
    }

    else if(projectModalName == 'cgol'){

        h2Text = "Conway's Game of Life";
        h3Text = "Conway's Game of Life developed for Computer Science, Unit 1 Build Week, capstone project of unit 1";

        deployedLinkText = 'https://cs-bw.now.sh/';
        repoName = 'cs-bw';
        ccID = '7f43b7af335091b3e81b';

        pictureSRC = 'cgol.webp';
        techStackArray = ['React', 'Node-Canvas', 'Styled Components'];
        featuresArray = ['Colors: #2958AA (blue), #4E8A63 (green), #642B73 (purple), #C6426E (pink)', "Follows Conway's rules", "Article about Conway's Game of Life", 'Four-day-long blog post detailing tasks completed each day.', 'Ability to select random, user-created, or preset patterns', 'Ability to choose speed & grid size'];

    }

    else if(projectModalName == 'nasaSearch'){
        
        h2Text = 'NASA Images Library Clone';
        h3Text = "A clone of images.NASA.gov, NASA's media library, improved over the original";

        deployedLinkText = 'https://nasasearchclone.now.sh/';
        repoName = 'nasaSearch';
        ccID = 'b21fbbb38f5918d60ada';

        pictureSRC = 'nasaSearch.webp';
        techStackArray = ['React', 'Redux', 'Styled Components', 'Video React', 'Cypress', 'Axios'];
        featuresArray = ["Search NASA's media library by media type", 'View 100 most popular or most recently uploaded media files', 'Filter search results by media type & year taken', 'List and thumbnail views of search results', 'File-specific info on single-file details page such as file size, format, captions file name, links to different sizes of media file, NASA ID, center, date created, link to center website, description', 'Share single media file on social media', 'See readme for comparison of original to clone'];
        
    }
    
    else if(projectModalName == 'vbDatabase'){
        h2Text = 'Company App:  Production Software';
        h3Text = "My court transcription company's VB database, used for transcript production and workflow management";

        deployedLinkText = '#';
        repoName = 'vbDatabase';
        ccID = '06260d9e8729d5d17f2a';

        pictureSRC = 'vbDatabase.webp';
        techStackArray = ['Visual Basic', 'MySQL', 'MS Access'];
        featuresArray = ['Integrates GTD principles into workflow', 'Generates & formats 25 to 30 different documents automatically via MS Office',"Manages schedule and production workflow", 'Auto-imports electronic communication', 'Automatically hyperlinks authority within transcripts via CourtListener API', 'Manipulates PDFs to auto-generate bookmarks and create different transcript versions', 'Tracks communication and document history of each transcript order', 'Manages and plays audio and reporter notes', 'Integrated with Office, Acrobat, and WinSCP libraries and several APIs such as CourtListener, PayPal, OneNote, and others', 'Speech recognition integrated via batch files & PocketSphinx'];
    }

    else if(projectModalName == 'javabe'){

        h2Text = 'Company App:  Java Back End';
        h3Text = "Java back end for the online port of my company's VB database, used for transcript production and workflow management";

        deployedLinkText = 'https://webapp-javabe.herokuapp.com/';
        repoName = 'webapp-javabe';
        ccID = 'c6f9b278e28a7b7d126c';

        pictureSRC = 'javabe.webp';
        techStackArray = ['Java & Java Spring', 'SQL & PostgreSQL', 'JUnit', 'SLF4J', 'OAuth2', 'Swagger', 'Maven'];
        featuresArray = ['Live in-progress solo project', 'RESTful API with auth services for transcript production system', '138 endpoints (400+ when complete)', 'CourtListener, Xero, PayPal, Wunderlist, & Office API support', 'Tested via Postman & JUnit', 'Documented via Postman & Swagger'];

    }

    else if(projectModalName == 'ucCustomer'){

        h2Text = 'Company App:  Use Case Diagrams';
        h3Text = "Customer & manager Use Case Diagrams for my court transcription company's upcoming software";

        deployedLinkText = '#';
        repoName = 'ucCustomer';
        ccID = '#';

        pictureSRC = 'ucCustomer.webp';
        techStackArray = ['Object Oriented Analysis & Design'];
        featuresArray = ['Customer & Manager Use Case Diagrams for Transcript Production Software'];

    }

    else if(projectModalName == 'speechRecog'){

        h2Text = 'Company App:  Speech Recognition';
        h3Text = "Speech recognition component of my company's VB database";

        deployedLinkText = 'https://github.com/evoingram/vbDatabase/tree/master/speech';
        repoName = 'vbDatabase';
        ccID = '06260d9e8729d5d17f2a';

        pictureSRC = 'speechRecog.webp';
        techStackArray = ['Audacity', 'Visual Basic', 'Batch Files', 'PocketSphinx'];
        featuresArray = ['Records & formats audio for training engine', 'Automatically formats & reads transcripts for training engine', 'Teaches itself from provided audio', 'Listens to & transcribes audio', 'Outputs transcript'];

    }
    
    else if(projectModalName == 'aQuack'){

        h2Text = 'Company App:  Chat Bot';
        h3Text = "Chat bot for my court transcription company";

        deployedLinkText = 'https://www.aquoco.co/testBot.html';
        repoName = 'cortanaBot';
        ccID = '64a21b3917698f04666e';

        pictureSRC = 'aQuack.webp';
        techStackArray = ['Node', 'Yo', 'BotBuilder'];
        featuresArray = ['Live solo project', 'Repeats user-entered information back to you'];

    }
    else if(projectModalName == 'webappFE'){

        h2Text = 'Company App:  Front End';
        h3Text = "Front end for the online port of my company's VB database, used for transcript production and workflow management";

        deployedLinkText = '#';
        repoName = 'webapp-frontend';
        ccID = '9e220220e7d71d3e13a8';

        pictureSRC = 'webappFE.webp';
        techStackArray = ['React', 'Redux', 'Styled Components', 'TypeScript', 'Cypress', 'Axios'];
        featuresArray = ['In-progress solo project', "Front end for the online port of my company's VB database, used for transcript production and workflow management"];
    }
    
    return [h2Text, h3Text, deployedLinkText, repoName, ccID, pictureSRC, techStackArray, featuresArray];

}

createHeaderElements = (childElementText, parentElement, elementCreated) => {
    var childElement = document.createElement(elementCreated);
    if (childElementText !== ''){
        childElement.textContent = childElementText;
    }
    parentElement.appendChild(childElement);
    return childElement;
}

appendModalBodyElements = (pictureNameExtension, techStackArray, featuresArray) => {
    
    var modalBody = document.getElementById("modal-body");
    var mbH3content = createElementsAddClasses('h3', '', [], modalBody);
    var pictureTSDiv = createElementsAddClasses('div', '', ['picture-ts'], mbH3content);
    var pictureDiv = createElementsAddClasses('div', '', ['main-body', 'picturets-picture', 'picturets'], pictureTSDiv);

    var techStackDiv = createElementsAddClasses('Tech Stack', '', techStackArray, pictureTSDiv);
    var featuresDiv = createElementsAddClasses('Features', '', featuresArray, mbH3content);

    var picture = createElementsAddClasses('img', pictureNameExtension, [], pictureDiv);


    if(pictureNameExtension.includes('speechRecog')){
        transformPicture(picture, 'scale(0.7)', '-8%', '-6%');
    }
    else if(pictureNameExtension.includes('nasaSearch')){
        transformPicture(picture, 'scale(0.9)', '-6%', '');
    }
    else if(pictureNameExtension.includes('nodeBE')){
        transformPicture(picture, 'scale(0.7)', '-6%', '-6%');
    }
    else if(pictureNameExtension.includes('AQC.webp')){
        transformPicture(picture, 'scale(0.9)', '-6%', '');
    }

}

appendModalFooterElements = (deployedHREF, repoName, codeClimateID) => {
    
    modalFooter = document.getElementById("modal-footer");

    mfH3contentE = appendFooterContentTop();
    mfH3contentD = appendFooterContentTop();
    mfH3contentC = appendFooterContentTop();
    
    var deployedLink = createFooterLink();
    var deployedImg = createFooterImg();

    var codeGitHubLink = createFooterLink();
    var codeGitHubImg = createFooterImg();

    var codeClimateLink = createFooterLink();
    var codeClimateImg = createFooterImg();

    if (repoName === 'speechRecog' || repoName === 'webapp-frontend' || repoName === 'vbDatabase'){
        deployedLink.href = '#';
        deployedImg.style.display = 'none';    
    }
    if (repoName === 'speechRecog' || repoName === 'webapp-frontend'){
        deployedImg.src = 'https://img.shields.io/badge/NOT%20Deployed-informational?style=flat&logoColor=white&color=7a28cc&cacheSeconds=2592000';
    }
    else if (repoName === 'vbDatabase') {
        deployedImg.src = 'https://img.shields.io/badge/Deployed%20OFFLINE-informational?style=flat&logoColor=white&color=7a28cc&cacheSeconds=2592000';
    
    }
    else if (repoName === 'ucCustomer') {
        deployedLink.href = 'https://github.com/evoingram/webapp-backend/blob/master/docs/use%20case.jpg';
        deployedImg.src = 'https://img.shields.io/badge/Customer%20Use%20Case-informational?style=flat&logoColor=white&color=7a28cc&cacheSeconds=2592000';
    }
    else {
        deployedLink.href = deployedHREF;
        deployedImg.src = 'https://img.shields.io/badge/Deployed%20Project-informational?style=flat&logoColor=white&color=7a28cc&cacheSeconds=2592000';
        deployedImg.style.display = 'flex';
    }

    if (repoName !== 'vbDatabase'){
        if(modalFooter.classList.contains('unfit-footer')){
            modalFooter.classList.remove('unfit-footer');
        }
    }

    if (repoName === 'ucCustomer') {
        codeGitHubLink.href = 'https://github.com/evoingram/webapp-backend/blob/master/docs/manager%20UCD.jpg';
        codeGitHubImg.src = 'https://img.shields.io/badge/Manager%20Use%20Case-informational?style=flat&logo=GitHub&logoColor=white&color=7a28cc&cacheSeconds=2592000';  

        codeClimateLink.href = '';
        codeClimateImg.src = '';  
        codeClimateImg.style.display = 'none';
    }
    else {
        codeGitHubLink.href = 'https://github.com/evoingram/' + repoName;
        codeGitHubImg.src = 'https://img.shields.io/badge/%20-Code%20On%20GitHub-informational?style=flat&logo=GitHub&logoColor=white&color=7a28cc&cacheSeconds=2592000';

        codeClimateLink.href = 'https://codeclimate.com/github/evoingram/' + repoName + '/maintainability';
        codeClimateImg.src = 'https://api.codeclimate.com/v1/badges/' + codeClimateID + '/maintainability'; 
        codeClimateImg.style.display = 'flex';
    
    }
    
    mfH3contentD = appendFooterContentBottom(mfH3contentD, deployedLink, deployedImg);
    mfH3contentC = appendFooterContentBottom(mfH3contentC, codeGitHubLink, codeGitHubImg);
    mfH3contentE = appendFooterContentBottom(mfH3contentE, codeClimateLink, codeClimateImg);

}

createElementsAddClasses = (elementToAdd, pictureNameExtension, classesToAdd, parentElement) => {

    var standardDiv;
    if (elementToAdd === 'Tech Stack') {
        standardDiv = createBodyList(classesToAdd, 'Tech Stack');
    }
    else if (elementToAdd === 'Features'){
        standardDiv = createBodyList(classesToAdd, 'Features');
    }
    else {
        standardDiv = document.createElement(elementToAdd);
    }

    if(classesToAdd.length > 0 && elementToAdd !== 'Tech Stack' && elementToAdd !== 'Features'){
        for(let x = 0; x < classesToAdd.length; x++){
            standardDiv.classList.add(classesToAdd[x]);
        }
    }

    if(pictureNameExtension !== ''){
        standardDiv.src = 'img/projects/projectpicture-' + pictureNameExtension;
    }
    parentElement.appendChild(standardDiv);

    return standardDiv;

}

createBodyList = (textArray, h2Heading) => {
    var listDiv = document.createElement('div');
    listDiv.classList.add('main-body');
    if(h2Heading === 'Tech Stack'){
        listDiv.classList.add('picturets-techstack');
    }
    var listH2 = document.createElement('h2');
    listH2.textContent = h2Heading;
    var listTextDiv = document.createElement('div');
    var listUl = document.createElement('ul');
    
    createList(textArray, listUl);  

    listDiv.appendChild(listH2);
    listDiv.appendChild(listTextDiv);
    listTextDiv.appendChild(listUl);

    return listDiv;
}

createList = (listTextArray, listToCreate) => {
    let listItem;
    for(let x = 0; x < listTextArray.length; x++){
        listItem = document.createElement('li');
        listItem.textContent = listTextArray[x];
        listToCreate.appendChild(listItem);
    }  
}

transformPicture = (picture, transformAmount, marginBAmount, marginTAmount) => {
    picture.style.transform = transformAmount;
    picture.style.marginBottom = marginBAmount;
    if(marginTAmount !== ''){
        picture.style.marginTop = marginTAmount;

    }
}

appendFooterContentTop = () => {
    let mfH3content = document.createElement('div');
    mfH3content.className = 'mfH3content';
    modalFooter.appendChild(mfH3content);
    return mfH3content;
}

appendFooterContentBottom = (mfH3content, link, img) => {
    mfH3content.appendChild(link);
    link.appendChild(img);
    return mfH3content;
}

createFooterLink = () => {
    const link = document.createElement('a');
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    return link;
}

createFooterImg = () => {
    const img = document.createElement('img');
    return img;
}

closeModal = () => {
    var modal = document.getElementById("project-modal");

    resetInnerHTML('modal-header');
    resetInnerHTML('modal-body');
    resetInnerHTML('modal-footer');

    modal.style.display = "none";
}

resetInnerHTML = (elementName) => {
    let modalSection = document.getElementById(elementName);
    modalSection.innerHTML = "";
}

document.addEventListener("click", (event) => { 
    if(!event) {event = window.event};
    var modal = document.getElementById("project-modal");
    var rect = event.target.getBoundingClientRect();
    if(window.screen.width <= 850){
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        yPosition = rect.top + scrollTop; 
        if(modal.style.display !== 'none'){
            modal.style.position = 'absolute';
            modal.style.top = yPosition + 'px';
        }
    }
    else{
        modal.style.position = 'fixed';
        modal.style.top = '0px';
    }
});