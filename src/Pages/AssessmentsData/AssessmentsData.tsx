import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../Utils/Api";
import axios from "axios";
import { PiArrowRight } from "react-icons/pi";
import TableLoading from "../../Components/Local/Loading/TableLoading/TableLoading";

const AssessmentsData = () => {
  interface Assessment {
    id: string;
    name: string;
    duration: string;
    score: string;
    format: string;
    createdAt: string;
    user: {
      name: string;
      id: string;
    };
  }
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  useEffect(() => {
    const getAssessments = async () => {
      try {
        const response = await axios.get(api.getAssessments);

        setAssessments(response.data.data);
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
        {assessments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Assessment</th>
                <th>Score</th>
                <th>Rating</th>
                <th>Date</th>
                <th>User</th>
                <th>Profile</th>
              </tr>
            </thead>

            {assessments.map((assess, index) => {
              const rating =
                parseInt(assess.score) > 8
                  ? "Good"
                  : parseInt(assess.score) > 5
                  ? "Average"
                  : "Poor";
              return (
                <tbody key={assess.id || index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{assess.name}</td>
                    <td>{assess.score}/10</td>
                    <td>{rating}</td> <td>{assess.createdAt.split("T")[0]}</td>
                    <td>{assess?.user.name}</td>
                    <td className="aProfileBtn">
                      <a href={`/user/${assess?.user.id}`}>
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
                </tbody>
              );
            })}
          </table>
        ) : (
          <TableLoading />
        )}
      </div>
    </section>
  );
};

export default AssessmentsData;
