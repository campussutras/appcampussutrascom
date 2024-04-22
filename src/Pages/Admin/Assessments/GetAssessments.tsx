import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

import { useParams } from "react-router-dom";
const GetAssessments = () => {
  const { id } = useParams();

  const [assessments, setAssessments] = useState([]);
  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/assessment/user-assessments/${id}`
        );
        setAssessments(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAssessments();
  }, []);
  return (
    <section className="usersAssessment width100 flex alignCenter justifyCenter flexColumn">
      {/* <div className="usersAssessContainer width95 maxWidth">
        {assessments.map((assess, index) => {
          return (
            <>
              <h1>{assess.name}</h1>
            </>
          );
        })}
      </div> */}
      <div className="usersAssessContainer width95 maxWidth">
        <div className="usersAssessBread marginBottom1">
          <a href="/assessments-data">
            Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
          </a>
        </div>
        <div className="userAssessInfo">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Score</th>
                <th>Format</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assess, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{assess.name}</td>
                    <td>{assess.duration}</td>
                    <td>{assess.score}</td>
                    <td>{assess.format}</td>
                    <td>{assess.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default GetAssessments;
