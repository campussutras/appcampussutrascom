import "./style.css";
import { useEffect, useState } from "react";

import axios from "axios";

const AssessmentsData = () => {
  const [assess, setAssess] = useState([]);
  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/assessment/get-assessments"
        );
        // console.log(response.data.data);

        setAssess(response.data.data);
        // console.log(assess);
      } catch (error) {
        console.log(error);
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
              <th>#</th>
              <th>Assessment</th>
              <th>Score</th>
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

                  <td>{assessment.score}</td>
                  <td>{rating}</td>
                  <td>{assessment.createdAt.split("T")[0]}</td>
                  <td>{assessment?.user.name}</td>
                  <td>
                    <a href={`/user/${assessment?.user.id}`}>View</a>
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
