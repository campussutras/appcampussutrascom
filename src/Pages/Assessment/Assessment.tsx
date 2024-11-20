import React from "react";
import "./style.css";
import { RiArrowRightLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import {
  BsFillEmojiFrownFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { FcClock } from "react-icons/fc";
import { assessments } from "./mcqs";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../../Utils/Api";
import Vibrate from "../../Utils/Vibrate";

const Assessment = () => {
  const { assessmentName } = useParams();
  const [showInstructions, setShowInstructions] = React.useState(true); // this useState is for assessment instructions
  const [showMcqs, setShowMcqs] = React.useState(false);
  const [userAnswers, setUserAnswers] = React.useState(new Array(10).fill(""));
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0); // Track the currently displayed question
  const [score, setScore] = React.useState(0); // setting the score count
  const [showResult, setShowResult] = React.useState(false); // for showing the result section
  const offInstructions = () => {
    // function to show and hide the instruction
    setShowInstructions(false);
    setShowMcqs(true);
  };

  const handleOptionChange = (event: any, questionIndex: any) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = event.target.value;
    setUserAnswers(newUserAnswers);
  };

  const totalTime = 600; // 10 minutes in seconds
  const [timeRemaining, setTimeRemaining] = React.useState(totalTime);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const currentAssessment = assessments.find(
    (assessment) => assessment.slug === assessmentName
  );

  const calculateScore = () => {
    let newScore = 0;
    const currentAssessment = assessments.find(
      (assessment) => assessment.slug === assessmentName
    );
    currentAssessment?.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctOption) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResult(true);
    setShowMcqs(false);
    sendAssessData(newScore);
    Vibrate();
  };

  const sendAssessData = async (result: number) => {
    try {
      const assessment = assessments.find(
        (assessment) => assessment.slug === assessmentName
      );

      if (!assessment) {
        // Handle case where assessment is not found (e.g., log error, throw exception)
        console.error("Assessment with slug", assessmentName, "not found.");
        return; // Or throw an error if desired behavior is to interrupt execution
      }
      console.log(result);

      const res = await axios.post(
        api.saveAssessment,
        {
          name: assessment.title, // Use 'name' for the property in the body
          duration: "10 Minutes",
          score: result.toString(),
          format: "MCQ",
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleTimerCompletion = () => {
    Vibrate();
    calculateScore();
    setShowResult(true);
    setShowMcqs(false);
  };

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  React.useEffect(() => {
    if (timeRemaining <= 0) {
      handleTimerCompletion();
    }
  }, [timeRemaining]);

  const nextQuestion = () => {
    Vibrate();
    if (
      currentAssessment &&
      currentQuestionIndex < currentAssessment.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    Vibrate();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      {showInstructions && (
        <main className="instructions width100 flex alignCenter justifyCenter flexColumn">
          <section className="instHeader flex alignCenter justifyStart width95 maxWidth gap05">
            <Link to="/">Home</Link>
            <Link to="/assessments">Exit</Link>
          </section>
          <section className="instContainer width95 flexColumn maxWidth">
            <h2>Assessment Instructions</h2>
            <h3>1. Instructions for the Assessment:</h3>
            <p>
              Welcome to our MCQ Assessment! This assessment consists of 10
              multiple-choice questions. Read each question carefully and select
              the most appropriate answer.
            </p>
            <h3>2. Time Limit:</h3>
            <p>
              You have a time limit of 10 Minutes to complete the assessment.
              The timer will begin once you start the assessment, so make sure
              to manage your time effectively.
            </p>
            <h3>3. Randomized Order:</h3>
            <p>
              The order of questions and answer options is randomized for each
              user, ensuring a fair and unbiased assessment experience.
            </p>
            <h3>4. Single Answer Selection:</h3>
            <p>
              Each question has only one correct answer. Choose the best option
              that you believe is correct.
            </p>
            <h3>5. Question Navigation:</h3>
            <p>
              You can navigate between questions using the "Next" and "Previous"
              buttons. Review your answers before submitting.
            </p>
            <h3>6. Submit at Any Time:</h3>
            <p>
              You can submit your answers before the time limit expires. If you
              have completed all the questions, click the "Submit" button to end
              the assessment.
            </p>
            <h3>7. Feedback and Results:</h3>
            <p>
              Once you submit your answers, you will receive immediate feedback
              on your performance. You can view your score, the correct answers,
              and the explanations for each question.
            </p>
            <h3>8. Review Your Answers:</h3>
            <p>
              After submitting the assessment, you can review your answers and
              see which questions you answered correctly and incorrectly.
            </p>
            <h3>9. Retake the Assessment:</h3>
            <p>
              You have the option to retake the assessment if you wish to
              improve your score. However, the questions will be randomized
              again.
            </p>
            <h3>10. Share Your Results:</h3>
            <p>
              If you are proud of your score, feel free to share it on social
              media to challenge your friends or colleagues to take the
              assessment too!
            </p>
            <h3>11. Certification:</h3>
            <p>
              Achieve a high score to earn a certificate of achievement.
              Certificates will be provided to users who score above a certain
              threshold.
            </p>
            <h3>12. Have Fun and Learn:</h3>
            <p>
              Remember, assessments are a great way to test your knowledge and
              learn from your mistakes. Treat it as a fun learning experience
              and challenge yourself to do your best!
            </p>
          </section>
          <section className="hideBtnBox flex alignCenter justifyCenter width95 maxWidth">
            <button onClick={offInstructions}>
              Start <RiArrowRightLine style={{ marginBottom: "-0.18rem" }} />
            </button>
          </section>
        </main>
      )}
      {showMcqs ? (
        <>
          {currentAssessment ? (
            <>
              <section className="assessmentQuestions width100 flex alignCenter justifyCenter flexColumn">
                <div className="assessQuesContainer width95 maxWidth">
                  <h1>{currentAssessment.title}</h1>
                  <div className="pageWarning">
                    <p className="marginBottom1 pWarningHeading">
                      Instructions:
                    </p>
                    <ul>
                      <li>You have 10 minutes to complete the assessment.</li>
                      <li>
                        Do not refresh the page while doing the assessment.
                      </li>
                      <li>Attempt all the questions.</li>
                      <li>
                        After 10 minutes, the assessment will automatically
                        submit.
                      </li>
                    </ul>
                    <p>
                      Time Remaining:{" "}
                      <span>
                        <FcClock style={{ marginBottom: "-0.18rem" }} />{" "}
                        {formatTime(timeRemaining)}
                      </span>{" "}
                      Min
                    </p>
                  </div>
                  <div className="questionBox">
                    <h2>
                      {
                        currentAssessment.questions[currentQuestionIndex]
                          .question
                      }
                    </h2>
                    {currentAssessment.questions[
                      currentQuestionIndex
                    ].options.map((opt, optIndex) => (
                      <React.Fragment key={optIndex}>
                        <input
                          type="radio"
                          name={`question_${currentQuestionIndex}`}
                          value={opt}
                          checked={userAnswers[currentQuestionIndex] === opt}
                          onChange={(event) =>
                            handleOptionChange(event, currentQuestionIndex)
                          }
                          onClick={Vibrate}
                        />{" "}
                        <span>{opt}</span>
                        <br />
                      </React.Fragment>
                    ))}
                  </div>

                  {/* "Previous" and "Next" buttons */}
                  <div className="question-navigation width100 flex alignCenter justifyStart gap05">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextQuestion}
                      disabled={
                        currentQuestionIndex ===
                        currentAssessment.questions.length - 1
                      }
                    >
                      Next
                    </button>
                    {/* Render the "Submit" button only when on the last question */}
                    {currentQuestionIndex ===
                      currentAssessment.questions.length - 1 && (
                      <button onClick={calculateScore}>Submit</button>
                    )}
                  </div>
                </div>
              </section>
            </>
          ) : null}
        </>
      ) : null}
      {showResult && (
        <>
          <section className="assessResult width100 flex alignCenter justifyCenter flexColumn">
            <div
              className={`resultContainer width95 maxWidth flex alignCenter justifyCenter flexColumn ${
                score <= 4 ? "border-red" : ""
              } ${score > 4 ? "border-yellow" : ""} ${
                score > 8 ? "border-green" : ""
              }`}
            >
              <h1>Assessment Result</h1>
              {showResult && score !== null && (
                <>
                  {score > 8 ? (
                    <div className="emoji-green">
                      <BsFillEmojiSmileFill />
                    </div>
                  ) : null}
                  {score > 4 && score < 8 ? (
                    <div className="emoji-orange">
                      <BsFillEmojiNeutralFill />
                    </div>
                  ) : null}
                  {score <= 4 ? (
                    <div className="emoji-red">
                      <BsFillEmojiFrownFill />
                    </div>
                  ) : null}
                  <h2 className="score">Your Score: {score}/10</h2>
                  <div className="progressBar flex alignCenter justifyCenter">
                    <progress id="file" value={score} max="10"></progress>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Assessment;
