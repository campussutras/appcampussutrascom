import "./style.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { PiArrowRight } from "react-icons/pi";

const AssessmentsData = () => {
  const [assess, setAssess] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAssessments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/v1/assessment/get-assessments"
        );
        // console.log(response.data.data);

        setAssess(response.data.data);
        setLoading(false);
        // console.log(assess);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAssessments();
  }, []);

  return (
    <section className="assessmentsData width100 flex alignCenter justifyStart flexColumn">
      <div className="assessDContainer width95 maxWidth">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Assessment</th>
              <th>Score</th>
              <th>Time</th>
              <th>Rating</th>
              <th>Date</th>
              <th>User</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {assess.map((assessment, index) => {
              const rating =
                assessment.score > 8
                  ? "Good"
                  : assessment.score > 5
                  ? "Average"
                  : "Poor";
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{assessment.name}</td>
                  <td>{assessment.score}/10</td>
                  <td>{assessment.timeTaken}</td>
                  <td>{rating}</td>
                  <td>{assessment.createdAt.split("T")[0]}</td>
                  <td>{assessment?.user.name}</td>
                  <td>
                    <a href={`/user/${assessment?.user.id}`}>
                      View{" "}
                      <PiArrowRight
                        style={{
                          marginBottom: "-0.18rem",
                          marginLeft: "0.5rem",
                        }}
                      />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AssessmentsData;
