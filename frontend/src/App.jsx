import "./App.css";
import { useState, useRef } from "react";
import Toast from "./Toast";

function App() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: ""
  });

  const resultRef = useRef(null);
  const fileInputRef = useRef(null);
  const getScoreColor = (score) => {

  if (score >= 80) {
    return "#22c55e";
  }

  if (score >= 50) {
    return "#eab308";
  }

  return "#ef4444";

};


  const showToast = (message, type) => {

    setToast({
      message,
      type
    });


    setTimeout(() => {

      setToast({
        message: "",
        type: ""
      });

    }, 3000);

  };



  const uploadResume = async () => {


    if (!file) {

      showToast(
        "Please select a PDF first",
        "error"
      );
    
    

      return;

    }

    if (!role) {

  showToast(
    "Please select a job role",
    "error"
  );

  return;

}


    setLoading(true);


    const formData = new FormData();

    formData.append("resume", file);
    formData.append("role", role);



    try {


      const response = await fetch(
        "http://localhost:5000/upload",
        {
          method: "POST",
          body: formData
        }
      );


      const data = await response.json();
   

      setTimeout(() => {


        setLoading(false);



        // Backend error handling

        if (!response.ok) {


          showToast(
            data.error || "Invalid resume",
            "error"
          );

          return;

        }



        // Success

        setResult(data.analysis);


        showToast(
          "Resume analyzed successfully",
          "success"
        );



        setTimeout(() => {

          resultRef.current?.scrollIntoView({
            behavior: "smooth"
          });

        },300);



      },1500);



    } catch(error) {


      setLoading(false);


      showToast(
        "Server error. Please try again",
        "error"
      );


    }


  };



  return (

    <div className="container">


      <Toast
        message={toast.message}
        type={toast.type}
      />



      <section className="hero">


        <h1>
          AI Resume Analyzer
        </h1>


        <p>
          Analyze your resume instantly.
          Get score, missing skills and improvement suggestions.
        </p>



        <div className="upload-box">

          <select
  value={role}
  onChange={(e)=>setRole(e.target.value)}
>

  <option value="">
    Select Job Role
  </option>

  <option value="Frontend Developer">
    Frontend Developer
  </option>

  <option value="Backend Developer">
    Backend Developer
  </option>

  <option value="Full Stack Developer">
    Full Stack Developer
  </option>

  <option value="Data Analyst">
    Data Analyst
  </option>

  <option value="Java Developer">
    Java Developer
  </option>

  <option value="DevOps Engineer">
    DevOps Engineer
  </option>

</select>


          <input

            ref={fileInputRef}

            type="file"

            accept=".pdf"

            onChange={(e)=>setFile(e.target.files[0])}

          />



          <button onClick={uploadResume}>

            Analyze Resume

          </button>



        </div>




        {loading && (

          <div className="loading-box">

            🤖 AI is analyzing your resume

            <span className="dots">
              ...
            </span>


          </div>

        )}



      </section>





      <section className="features">


        <h2>
          How It Works
        </h2>



        <div className="cards">



          <div className="feature-card">

            📄

            <h3>
              Upload
            </h3>

            <p>
              Upload your resume PDF
            </p>

          </div>




          <div className="feature-card">

            🤖

            <h3>
              Analyze
            </h3>

            <p>
              AI checks your skills
            </p>

          </div>




          <div className="feature-card">

            📊

            <h3>
              Improve
            </h3>

            <p>
              Get suggestions
            </p>

          </div>



        </div>


      </section>





      {result && (


        <section 
          ref={resultRef} 
          className="result"
        >


          <h2>
            Resume Analysis Result
          </h2>




          <div className="score-card">

  <h3>
    Resume Score
  </h3>


  <div
    className="score-circle"
   style={{
  "--score": `${result.atsScore}%`,
  "--color": getScoreColor(result.atsScore)
}}
  >

    <span>
      {result.score}%
    </span>

  </div>

</div>

          <div className="score-card">

  <h3>
    ATS Compatibility
  </h3>


  <div
    className="score-circle"
   style={{
  "--score": `${result.atsScore}%`,
  "--color": getScoreColor(result.atsScore)
}}
  >

    <span>
      {result.atsScore}%
    </span>

  </div>

</div>

<div className="result-card">

  <h3>
    📋 ATS Check
  </h3>


  <p>
    Email: {result.atsChecks.email ? "✅" : "❌"}
  </p>


  <p>
    Phone: {result.atsChecks.phone ? "✅" : "❌"}
  </p>


  <p>
    Education: {result.atsChecks.education ? "✅" : "❌"}
  </p>


  <p>
    Experience: {result.atsChecks.experience ? "✅" : "❌"}
  </p>


  <p>
    Skills Section: {result.atsChecks.skills ? "✅" : "❌"}
  </p>


  <p>
    Projects: {result.atsChecks.projects ? "✅" : "❌"}
  </p>


  <p>
    LinkedIn: {result.atsChecks.linkedin ? "✅" : "❌"}
  </p>


  <p>
    GitHub: {result.atsChecks.github ? "✅" : "❌"}
  </p>


</div>


<div className="result-card">

  <h3>
    💪 Resume Strengths
  </h3>

  <ul className="strength-list">

    {result.strengths?.map((item, index) => (
      <li key={index}>
        ✅ {item}
      </li>
    ))}

  </ul>

</div>

<div className="result-card">

  <h3>
    ⚠ Areas to Improve
  </h3>


  <ul className="weakness-list">

    {result.weaknesses?.map((item, index) => (
      <li key={index}>
        ⚠️ {item}
      </li>
    ))}

  </ul>


</div>


          <div className="result-card">


            <h3>
              ✅ Skills Found
            </h3>


            <p>
              {result.foundSkills.join(", ")}
            </p>


          </div>





          <div className="result-card">


            <h3>
              ❌ Missing Skills
            </h3>


            <p>
              {result.missingSkills.join(", ")}
            </p>


          </div>





         <div className="result-card">

  <h3>
    💡 Recommendation
  </h3>

  <p>
    {result.recommendation}
  </p>

  <ul className="recommendation-list">
  {result.suggestions?.map((skill, index) => (
    <li key={index}>{skill}</li>
  ))}
</ul>

</div>





          <button

            onClick={() => {


              setResult(null);

              setFile(null);


              if(fileInputRef.current){

                fileInputRef.current.value = "";

              }


            }}

          >

            Analyze Another Resume

          </button>



        </section>


      )}



    </div>

  );

}


export default App;