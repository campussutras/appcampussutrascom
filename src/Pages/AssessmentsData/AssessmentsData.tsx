import "./style.css";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
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
  //   const data = [
  //     {
  //       Index: 1,
  //       Assessment: "TypeScript",
  //       Duration: "10 Min",
  //       Score: "09/10",
  //       Rating: "Good",
  //       Format: "MCQ",
  //       Date: "2024-03-19",
  //       Time: "11:19:58 AM",
  //     },
  //   ];
  const columns = useMemo(
    () => [
      {
        accessorKey: "Index", //access nested data with dot notation
        header: "Index",
        size: 150,
      },
      {
        accessorKey: "Assessment",
        header: "Assessment",
        size: 150,
      },
      {
        accessorKey: "Duration", //normal accessorKey
        header: "Duration",
        size: 200,
      },
      {
        accessorKey: "Score",
        header: "Score",
        size: 150,
      },
      {
        accessorKey: "Rating",
        header: "Rating",
        size: 150,
      },
      {
        accessorKey: "Format",
        header: "Format",
        size: 150,
      },
      {
        accessorKey: "Date",
        header: "Date",
        size: 150,
      },
      {
        accessorKey: "Time",
        header: "Time",
        size: 150,
      },
      {
        accessorKey: "User",
        header: "User",
        size: 150,
      },
      {
        accessorKey: "View",
        header: "View",
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: assess.map((assessment, index) => ({
      Index: index,
      Assessment: assessment?.name,
      Duration: assessment?.duration,
      Score: assessment?.score,
      Rating: "Good",
      Format: assessment?.format,
      Date: assessment?.createdAt,
      Time: assessment?.createdAt,
      User: assessment?.user.name,
      View: <a href={`/user/${assessment.user?.id}`}>Profile</a>,
    })),
  });
  return (
    <section className="assessmentsData width100 flex alignCenter justifyCenter flexColumn">
      <div className="assessDHeader width95 maxWidth">assess Header</div>
      <div className="assessDContainer width95 maxWidth">
        <MaterialReactTable table={table} />
      </div>
    </section>
  );
};

export default AssessmentsData;
