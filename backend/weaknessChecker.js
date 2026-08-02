function checkWeaknesses(text, atsChecks, missingSkills) {

    const weaknesses = [];

    const resume = text.toLowerCase();


    if (!atsChecks.phone) {
        weaknesses.push(
            "Add phone number to improve contact details"
        );
    }


    if (!atsChecks.linkedin) {
        weaknesses.push(
            "Add LinkedIn profile"
        );
    }


    if (!atsChecks.github) {
        weaknesses.push(
            "Add GitHub profile to showcase projects"
        );
    }


    if (!atsChecks.projects) {
        weaknesses.push(
            "Include projects with descriptions"
        );
    }


    if (!atsChecks.experience) {
        weaknesses.push(
            "Add experience or internship details"
        );
    }


    if (missingSkills.length > 3) {
        weaknesses.push(
            "Improve skill coverage for the selected role"
        );
    }


    if (!resume.includes("achievement") &&
        !resume.includes("result")) {

        weaknesses.push(
            "Add measurable achievements and results"
        );
    }


    return weaknesses.slice(0,5);

}


module.exports = checkWeaknesses;