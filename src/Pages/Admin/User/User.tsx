import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { api } from "../../../Utils/Api";

// Define the user interface for better type safety
interface UserInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileType: string;
  institute?: string;
  company?: string;
  position?: string;
  localAddress?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    assessments: number;
  };
}
const User = () => {
  const { id } = useParams(); // Extract user ID from the URL

  // State to store user data
  const [user, setUser] = useState<Partial<UserInterface>>({});

  // Fetch user data on component mount or when `id` changes
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${api.user}/${id}`, {
          withCredentials: true,
        });

        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [id]);

  // Helper function to handle fallback display text
  const renderField = (field: any, fallback: string = "Not Updated Yet") =>
    field ? field : fallback;
  return (
    <section className="adminUser width100 flex alignCenter justifyCenter flexColumn">
      <div className="adminUContainer width95 maxWidth">
        <div className="aUserBread">
          <a href="/">
            Return <RiArrowGoBackLine style={{ marginBottom: "-0.15rem" }} />
          </a>
        </div>

        {/* User Name or Loading Indicator */}
        <h1>{renderField(user.name, "Loading...")}</h1>

        {/* User Information Display */}
        <div className="adminUInfo">
          {[
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
            {
              label: "Assessments",
              value: user._count?.assessments || "Loading...",
            },
            { label: "Profile", value: user.profileType },
            { label: "Address", value: user.localAddress },
            { label: "City", value: user.city },
            { label: "Zip", value: user.zip },
            { label: "State", value: user.state },
            { label: "Country", value: user.country },
            {
              label: "Verified",
              value: user.isVerified ? "Verified" : "Not Verified",
            },
            { label: "Admin", value: user.isAdmin ? "Admin" : "Not Admin" },
            {
              label: "Since",
              value: user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Loading...",
            },
          ].map(({ label, value }) => (
            <div
              className="userInfoTab flex alignStart justifyStart"
              key={label}
            >
              <div className="userInfoLeft">
                <h3>{label}</h3>
              </div>
              <div className="userInfoRight">
                <p>{renderField(value)}</p>
              </div>
            </div>
          ))}
        </div>
        {user && user._count && user._count.assessments > 0 ? (
          <>
            <div className="adminUAssessInfo">
              <a href={`/user-assessments/${user.id}`}>User's Assessments</a>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default User;
