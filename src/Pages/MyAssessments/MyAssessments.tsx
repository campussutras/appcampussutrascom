import { RiArrowGoBackLine } from "react-icons/ri";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../Utils/Api";
const MyAssessments = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(api.myAssessment, {
          withCredentials: true,
        });
        setAssessments(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAssessments();
  }, []);
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
                    assess.score > 8
                      ? "Good"
                      : assess.score > 5
                      ? "Average"
                      : "Poor";
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{assess.name}</td>
                      <td>{assess.duration}</td>
                      <td>{assess.score}</td>
                      <td>{rating}</td>
                      <td>{assess.format}</td>
                      <td>{assess.createdAt.split("T")[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAssessments;
