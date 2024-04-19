import axios from "axios";
import { useEffect, useState } from "react";

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
      <div className="usersAssessHead width95 maxWidth">
        <h1>User's Assessment</h1>
      </div>
      <div className="usersAssessContainer width95 maxWidth">
        {assessments.map((assess, index) => {
          return (
            <>
              <h1>{assess.name}</h1>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default GetAssessments;
