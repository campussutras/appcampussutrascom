import { RiArrowGoBackLine } from "react-icons/ri";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../Utils/Api";
import Loading from "./loading";
const MyAssessments = () => {
  interface Assessment {
    name: string;
    duration: string; // Or string depending on format
    score: string;
    format: string;
    createdAt: string;
  }
  const [assessments, setAssessments] = useState<Assessment[]>([]);

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
  return (
    <>
      <section className="myAssessments width100 flex alignCenter justifyCenter flexColumn">
        <div className="myAssessContainer width95 maxWidth">
          <div className="myAssessBread marginBottom1">
            <a href="/profile">
              Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
            </a>
          </div>
          {/* <div className="myAssessInfo">
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

              {assessments.length > 0 ? (
                assessments.map((assess, index) => {
                  const rating =
                    parseInt(assess.score) > 8
                      ? "Good"
                      : parseInt(assess.score) > 5
                      ? "Average"
                      : "Poor";
                  return (
                    // <Suspense fallback={<Loading />}>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{assess.name}</td>
                        <td>{assess.duration}</td>
                        <td>{assess.score}</td>
                        <td>{rating}</td>
                        <td>{assess.format}</td>
                        <td>{assess.createdAt.split("T")[0]}</td>
                      </tr>
                    </tbody>
                    // </Suspense>
                  );
                })
              ) : (
                <Loading />
              )}
            </table>
          </div> */}
          <div className="myAssessInfo">
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
              <Loading /> // Display loading component when no data
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAssessments;
