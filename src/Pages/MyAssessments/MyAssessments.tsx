import { RiArrowGoBackLine } from "react-icons/ri";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../Utils/Api";
import Loading from "./loading";
import Vibrate from "../../Utils/Vibrate";
const MyAssessments = () => {
  interface Assessment {
    name: string;
    duration: string; // Or string depending on format
    score: string;
    format: string;
    createdAt: string;
  }
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 users per page

  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(api.myAssessment, {
          withCredentials: true,
        });
        setAssessments(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAssessments();
  }, []);

  const totalPages = Math.ceil(assessments.length / itemsPerPage);

  // Calculate the users to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAssessments = assessments.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <>
      <section className="myAssessments width100 flex alignCenter justifyCenter flexColumn">
        <div className="myAssessContainer width95 maxWidth">
          <div className="myAssessBread marginBottom1">
            <a href="/profile">
              Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
            </a>
          </div>

          <div className="myAssessInfo">
            {assessments.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Duration</th>
                      <th>Score</th>
                      <th>Rating</th>
                      <th>Format</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAssessments.map((assess, index) => {
                      const rating =
                        parseInt(assess.score) > 8
                          ? "Good"
                          : parseInt(assess.score) > 5
                          ? "Average"
                          : "Poor";
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{assess.name}</td>
                          <td>{assess.duration}</td>
                          <td>{assess.score}</td>
                          <td>{rating}</td>{" "}
                          {/* Assuming calculateRating function */}
                          <td>{assess.format}</td>
                          <td>{assess.createdAt.split("T")[0]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              <Loading /> // Display loading component when no data
            )}
          </div>
        </div>
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              Vibrate();
              setCurrentPage((prev) => prev - 1);
            }}
            className="pArrowBtn"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pNumberBtn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              Vibrate();
              setCurrentPage((prev) => prev + 1);
            }}
            className="pArrowBtn"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default MyAssessments;
