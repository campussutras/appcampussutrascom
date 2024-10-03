import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { api } from "../../../Utils/Api";
import { useParams } from "react-router-dom";
import TableLoading from "../../../Components/Local/Loading/TableLoading/TableLoading";
const GetAssessments = () => {
  interface Assessment {
    name: string;
    duration: string; // Or string depending on format
    score: string;
    format: string;
    createdAt: string;
  }
  const { id } = useParams();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(`${api.getUserAssessments}/${id}`);
        setAssessments(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAssessments();
  }, []);
  return (
    <section className="usersAssessment width100 flex alignCenter justifyCenter flexColumn">
      <div className="usersAssessContainer width95 maxWidth">
        <div className="usersAssessBread marginBottom1">
          <a href="/assessments-data">
            Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
          </a>
        </div>
        <div className="userAssessInfo">
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
          ) : (
            <TableLoading /> // Display loading component when no data
          )}
        </div>
      </div>
    </section>
  );
};

export default GetAssessments;
