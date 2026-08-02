const resumeKeywords = [
    "skills",
    "experience",
    "education",
    "projects",
    "work experience",
    "technical skills",
    "professional experience",
    "career objective",
    "summary",
    "internship",
    "developer",
    "engineer",
    "software",
    "linkedin",
    "github"
];


const nonResumeKeywords = [
    "income certificate",
    "certificate of income",
    "government of",
    "revenue department",
    "annual income",
    "issued by",
    "this is to certify",
    "address proof"
];


function isResume(text) {

    const resumeText = text.toLowerCase();


    let resumeScore = 0;
    let nonResumeScore = 0;


    resumeKeywords.forEach((keyword) => {

        if (resumeText.includes(keyword)) {
            resumeScore++;
        }

    });


    nonResumeKeywords.forEach((keyword) => {

        if (resumeText.includes(keyword)) {
            nonResumeScore++;
        }

    });



    console.log("Resume Score:", resumeScore);
    console.log("Non Resume Score:", nonResumeScore);



    if (nonResumeScore >= 2) {
        return false;
    }


    return resumeScore >= 3;

}


module.exports = isResume;