const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const skills = require("./skills");
const roleSkills = require("./roleSkills");
const checkATS = require("./atsChecker");
const checkStrengths = require("./strengthChecker");
const checkWeaknesses = require("./weaknessChecker");
const isResume = require("./resumeValidator");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });    

const PORT = process.env.PORT || 5000;


   function analyzeResume(text, role) {
    const resumeText = text.toLowerCase();

    const skills = roleSkills[role] || [];
    const foundSkills = [];
    const missingSkills = [];


    skills.forEach((skill) => {
        if (resumeText.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }
    });

    const score = Math.round(
        (foundSkills.length / skills.length) * 100
    );

    const ats = checkATS(text);
    const strengths = checkStrengths(
    text,
    foundSkills,
    ats.checks
);

const weaknesses = checkWeaknesses(
    text,
    ats.checks,
    missingSkills
);

   return {
    score,
    atsScore: ats.atsScore,
atsChecks: ats.checks,
strengths,
weaknesses,
    foundSkills,
    missingSkills,

    recommendation:
        `To strengthen your ${role} resume, consider adding:`,

    suggestions: missingSkills.slice(0, 5)
};
}

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend is Running 🚀");
});

app.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const dataBuffer = require("fs").readFileSync(req.file.path);

const parser = new PDFParse({ data: dataBuffer });

const data = await parser.getText();


const validResume = isResume(data.text);


if (!validResume) {

    return res.status(400).json({

        message: "Invalid resume",
        error: "Please upload a valid resume PDF"

    });

}


const analysis = analyzeResume(
    data.text,
    req.body.role
);

res.json({
    message: "Resume analyzed successfully",
    analysis
});

    } catch (error) {
        res.status(500).json({
            message: "Error reading resume",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});