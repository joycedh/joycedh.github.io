// Random Image Generator

var imageFiles =  [
    "f_01", "f_02", "f_03", "f_04", "f_05", "f_06", "f_07", "f_08",
    "f_09", "f_10", "c_01", "c_02", "c_03", "c_04", "c_05", "c_06",
    "c_07", "c_08", "a_01", "a_02", "a_03", "a_04", "a_05", "a_06",
    "a_07", "a_08", "a_09", "a_10", "a_11", "a_12", "a_13", "a_14",
    "a_15", "a_16", "a_17", "a_18", "a_19", "a_20", "a_21", "a_22",
    "a_23", "a_24", "a_25", "a_26", "af_01", "af_02", "af_03", "af_04", 
    "af_05", "af_06", "af_07", "af_08", "af_09", "af_10", "af_11",
    "af_12", "af_13", "af_14"]


var Captions = [
    "While Stained in History, Trump Will Emerge From Trial Triumphant and Unshackled",
    "Trump Names Mike Pence to Lead Coronavirus Response", "Trump Acquitted of Two Impeachment Charges in Near Party-Line Vote",
    "Trump Claims End of 'American Decline' While Avoiding Mention of Impeachment", "How the Iowa Caucuses Became an Epic Fiasco for Democrats",
    "Russia Is Said to Be Interfering to Aid Sanders in Democratic Primaries", "Muddled Democratic Race Hurtles to New Hampshire",
    "Harvey Weinstein Is Found Guilty of Sex Crimes in #MeToo Watershed", "Bernie Sanders Wins Nevada Caucuses, Strengthening His Primary Lead",
    "'Like Europe in Medieval Times': Virus Slows China's Economy", "Harvey Weinstein Is Found Guilty of Sex Crimes in #MeToo Watershed",
    "Trump Acquitted of Two Impeachment Charges in Near Party-Line Vote", "Muddled Democratic Race Hurtles to New Hampshire",
    "How the Iowa Caucuses Became an Epic Fiasco for Democrats", "Bloomberg’s Billions: How the Candidate Built an Empire of Influence",
    "Huawei Is Winning the Argument in Europe, as the U.S. Fumbles to Develop Alternatives", "Trump Fires Impeachment Witnesses Gordon Sondland and Alexander Vindman in Post-Acquittal Purge",
    "Bernie Sanders Scores Narrow Victory in New Hampshire Primary", "Republicans Block Impeachment Witnesses, Clearing Path for Trump Acquittal",
    "While Stained in History, Trump Will Emerge From Trial Triumphant and Unshackled", "SARS Stung the Global Economy. The Coronavirus Is a Greater Menace.",
    "Delays Mar Iowa Caucuses as Democrats Start Nominating Process", "Trump Claims End of 'American Decline' While Avoiding Mention of Impeachment",
    "Trump Acquitted of Two Impeachment Charges in Near Party-Line Vote", "Muddled Democratic Race Hurtles to New Hampshire", 
    "Trump Fires Impeachment Witnesses Gordon Sondland and Alexander Vindman in Post-Acquittal Purge", "How the Iowa Caucuses Became an Epic Fiasco for Democrats",
    "'Like Europe in Medieval Times': Virus Slows China's Economy", "Bernie Sanders Scores Narrow Victory in New Hampshire Primary",
    "Centrist Democrats Want to Stop Sanders. They're Not Sure Who Can.", "Barr Says Attacks From Trump Make Work 'Impossible'",
    "William Barr Moves to Take the Reins of Politically Charged Cases", "Bloomberg’s Billions: How the Candidate Built an Empire of Influence",
    "Coronavirus Infection Found After Cruise Ship Passengers Disperse", "Huawei Is Winning the Argument in Europe, as the U.S. Fumbles to Develop Alternatives",
    "Trump Grants Clemency to Blagojevich, Milken and Kerik", "Warren Leads an Onslaught of Attacks, Zeroing In on Bloomberg", 
    "Lawmakers Are Warned That Russia Is Meddling to Re-elect Trump", "Russia Is Said to Be Interfering to Aid Sanders in Democratic Primaries",
    "Bernie Sanders Wins Nevada Caucuses, Strengthening His Primary Lead", "Europe Confronts Coronavirus as Italy Battles an Eruption of Cases",
    "Harvey Weinstein Is Found Guilty of Sex Crimes in #MeToo Watershed", "C.D.C. Officials Warn of Coronavirus Outbreaks in the U.S.",
    "Trump Names Mike Pence to Lead Coronavirus Response", "Republicans Block Impeachment Witnesses, Clearing Path for Trump Acquittal",
    "Delays Mar Iowa Caucuses as Democrats Start Nominating Process", "Trump Claims End of 'American Decline' While Avoiding Mention of Impeachment",
    "Muddled Democratic Race Hurtles to New Hampshire", "'Like Europe in Medieval Times': Virus Slows China's Economy", 
    "Barr Says Attacks From Trump Make Work 'Impossible'", "William Barr Moves to Take the Reins of Politically Charged Cases",
    "Coronavirus Infection Found After Cruise Ship Passengers Disperse", "Huawei Is Winning the Argument in Europe, as the U.S. Fumbles to Develop Alternatives",
    "Russia Is Said to Be Interfering to Aid Sanders in Democratic Primaries", "Bernie Sanders Wins Nevada Caucuses, Strengthening His Primary Lead",
    "Europe Confronts Coronavirus as Italy Battles an Eruption of Cases", "Harvey Weinstein Is Found Guilty of Sex Crimes in #MeToo Watershed",
    "Trump Names Mike Pence to Lead Coronavirus Response"
]

var imageNumber = 0

function getRandomImage() { 
    var number = Math.floor(Math.random()*imageFiles.length);
    imageNumber = number;

    var imageDiv = document.getElementById("image-div");

    var img = document.createElement("img");
    var source = "images/" + imageFiles[number] + ".png";
    img.src = source;
    console.log(img.src)
    imageDiv.appendChild(img);

    const imageTitle = document.createElement('h2');
    var caption = `\"${Captions[number]}\"`;
    imageTitle.textContent = caption;
    imageDiv.appendChild(imageTitle);
}

getRandomImage();

// -------------------------------------------------

// Saving output from the HTML form to Google Sheets

const scriptURL = 'https://script.google.com/macros/s/AKfycbw7zrx9zvH8_wiG5R8TAnOWDTGnXonhFaxnpr-hjiKp-ASFC3E/exec'
const form = document.forms['responses']

form.addEventListener('submit', e => {
    e.preventDefault()
    var formData = new FormData(form);
    formData.append('image', imageNumber);
    fetch(scriptURL, { method: 'POST', body: formData})
    .then(response =>  { console.log('Success!', response); window.location.href="thanks.html";} )
    .catch(error => console.error('Error!', error.message))
})


// -------------------------------------------------

// redundant code I might use in the future

// var Images = new Array();

// function makeArray() {
//     const firstPartUrl = "http://nicolejeanette.me/avatars/av/";
//     for(i = 0 ; i<6 ; i++) {
//         const fullUrl = firstPartUrl + randomImage[i];
//         Images[i] = fullUrl;
//     }
// }
// makeArray();

// var Titles = new Array();

// function writeArray() {
//     const firstPart = 'image_';
//     for(i=0; i<6; i++){
//         const wholeTitle = '"' + firstPart + i + '"';
//         Titles[i] = wholeTitle;
//     }
// }
// writeArray();