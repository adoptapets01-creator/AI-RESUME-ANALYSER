function checkStrengths(text, foundSkills, atsChecks) {

    const strengths = [];


    if (foundSkills.length >= 5) {
        strengths.push(
            "Good technical skill coverage"
        );
    }


    if (atsChecks.projects) {
        strengths.push(
            "Projects are included"
        );
    }


    if (atsChecks.experience) {
        strengths.push(
            "Experience section is available"
        );
    }


    if (atsChecks.github) {
        strengths.push(
            "GitHub profile mentioned"
        );
    }


    if (atsChecks.linkedin) {
        strengths.push(
            "LinkedIn profile mentioned"
        );
    }


    return strengths;

}


module.exports = checkStrengths;