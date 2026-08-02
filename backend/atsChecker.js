function checkATS(text) {

    const resume = text.toLowerCase();

    let score = 100;

    const checks = {
        email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(text),

        phone: /(\+?\d{1,3}[- ]?)?\d{10}/.test(text),

        education: resume.includes("education"),

        experience: resume.includes("experience"),

        skills: resume.includes("skills"),

        projects: resume.includes("project"),

        linkedin: resume.includes("linkedin"),

        github: resume.includes("github")
    };

    if (!checks.email) score -= 15;
    if (!checks.phone) score -= 15;
    if (!checks.education) score -= 10;
    if (!checks.experience) score -= 15;
    if (!checks.skills) score -= 10;
    if (!checks.projects) score -= 10;
    if (!checks.linkedin) score -= 10;
    if (!checks.github) score -= 5;

    if (score < 0) score = 0;

    return {
        atsScore: score,
        checks
    };
}

module.exports = checkATS;