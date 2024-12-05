import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { api } from "../../../Utils/Api";
import { useParams } from "react-router-dom";
import TableLoading from "../../../Components/Local/Loading/TableLoading/TableLoading";
const GetAssessments = () => {
  // Define the Assessment interface for type safety
  interface Assessment {
    name: string;
    duration: string; // Or string depending on format
    score: string;
    format: string;
    createdAt: string;
  }

  // Extract the `id` parameter from the URL
  const { id } = useParams();

  // State to store assessments data
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  // Fetch assessments data on component mount
  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(`${api.getUserAssessments}/${id}`, {
          withCredentials: true,
        });
        setAssessments(response.data.data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };
    getAssessments();
  }, [id]);

  // Calculate rating based on score
  const calculateRating = (score: string) => {
    const parsedScore = parseInt(score);
    if (parsedScore >= 8) return "Good";
    if (parsedScore >= 5) return "Average";
    return "Poor";
  };
  return (
    <section className="usersAssessment width100 flex alignCenter justifyCenter flexColumn">
      <div className="usersAssessContainer width95 maxWidth">
        {/* Navigation back to assessments list */}
        <div className="usersAssessBread marginBottom1">
          <a href="/assessments-data">
            Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
          </a>
        </div>
        <div className="userAssessInfo">
          {/* Render table if assessments data is available */}
          {assessments.length > 0 ? (
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
                {assessments.map((assess, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{assess.name}</td>
                      <td>{assess.duration}</td>
                      <td>{assess.score}</td>
                      <td>{calculateRating(assess.score)}</td>{" "}
                      <td>{assess.format}</td>
                      <td>{assess.createdAt.split("T")[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <TableLoading /> // Render loading component if no data is available
          )}
        </div>
      </div>
    </section>
  );
};

export default GetAssessments;
