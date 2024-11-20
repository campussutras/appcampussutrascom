import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../../Utils/Api";
import axios from "axios";
import { PiArrowRight } from "react-icons/pi";
import TableLoading from "../../Components/Local/Loading/TableLoading/TableLoading";
import { CSVLink } from "react-csv";
import { RiArrowDownLine } from "react-icons/ri";
import Vibrate from "../../Utils/Vibrate";

const AssessmentsData = () => {
  const [loading, setLoading] = useState(false);
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 users per page
  useEffect(() => {
    const getAssessments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api.getAssessments);

        setAssessments(response.data.data);

        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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

  const fileName = "Campus-Sutras-Assessments";

  const headers = [
    { label: "Name", key: "name" },
    { label: "Format", key: "format" },
    { label: "Duration", key: "duration" },
    { label: "Score", key: "score" },
    { label: "Date", key: "createdAt" },
    { label: "Name", key: "user.name" },
    { label: "Email", key: "user.email" },
    { label: "Phone", key: "user.phone" },
    { label: "Profile Type", key: "user.profileType" },
    { label: "Company", key: "user.company" },
    { label: "Institute", key: "user.institute" },
  ];

  return (
    <section className="assessmentsData width100 flex alignCenter justifyStart flexColumn">
      <div className="assessDContainer width95 maxWidth">
        <div className="assessHead flex alignCenter spaceBtw">
          <h1>All Assessments</h1>
          <div className="allAssessBtns flex gap05">
            <button>Total {assessments.length}</button>
            <button onClick={Vibrate}>
              <CSVLink
                headers={headers}
                data={assessments}
                filename={fileName}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {" "}
                {loading ? "Loading csv..." : "Download Excel"}
                <RiArrowDownLine style={{ marginBottom: "-0.16rem" }} />
              </CSVLink>
            </button>
          </div>
        </div>
        {currentAssessments.length > 0 ? (
          <>
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

              {currentAssessments.map((assess, index) => {
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
                      <td>{rating}</td>{" "}
                      <td>{assess.createdAt.split("T")[0]}</td>
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
          </>
        ) : (
          <TableLoading />
        )}
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
            onClick={() => {
              Vibrate();
              setCurrentPage(i + 1);
            }}
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
  );
};

export default AssessmentsData;
