import "./style.css";
import { catalog, category } from "./Catalog";
import React from "react";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { PiArrowRight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Vibrate from "../../Utils/Vibrate";
const Assessments = () => {
  // State variables
  const [currentPage, setCurrentPage] = React.useState(1); // Start with page 1
  const [searchString, setSearchString] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const assessmentsPerPage = 9; // Items per page

  // Calculate total pages for pagination
  const totalPages = Math.ceil(catalog.length / assessmentsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Generate pagination numbers dynamically
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      // Display up to 5 pages, then add an ellipsis
      if (
        i <= 5 ||
        i === totalPages ||
        i === 1 ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pageNumbers.push(i);
      } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
        pageNumbers.push("...");
      }
    }
    return pageNumbers;
  };

  // Filter catalog based on search string and selected category
  const filteredCatalog = catalog.filter((item) => {
    // Filter assessments based on the search string and selected category
    const search = searchString.toLowerCase();
    const categoryFilter =
      selectedCategory === "All" || item.category === selectedCategory;
    return item.title.toLowerCase().includes(search) && categoryFilter;
  });

  // Generate pagination numbers
  const pageNumbers = generatePageNumbers();

  // Scroll to top on page change
  React.useEffect(() => {
    // Scroll to the top of the page when currentPage changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  return (
    <section className="assessments width100 flex alignCenter justifyCenter flexColumn">
      <Helmet>
        <title>Assessments - Campus Sutras</title>
        <meta
          name="description"
          content="Test your knowledge with Campus Sutras' assessments. Take quizzes and practice tests on various topics to gauge your understanding."
        />
      </Helmet>
      <div className="assessHeader width95 maxWidth">
        <div className="searchAssessBar flex alignCenter spaceBtw">
          <div className="searchInput">
            <input
              placeholder="Search Assessment"
              type="text"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <div className="searchCategory">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Category</option>
              {category.map((item) => {
                return (
                  <>
                    <option key={item.id} value={item.catName}>
                      {item.catName}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="assessContainer width95 maxWidth flex alignCenter justifyCenter flexColumn">
        <div className="allAssessmentsList width100 flex alignStart justifyStart">
          {filteredCatalog
            .slice(
              currentPage * assessmentsPerPage - assessmentsPerPage,
              currentPage * assessmentsPerPage
            )
            .map((item) => {
              return (
                <div className="assessmentCard flex spaceBtw" key={item.id}>
                  <div className="assessmentCardContent">
                    <h3>{item.title}</h3>
                    <div className="accTab flex">
                      <div className="accTabLeft">
                        <h4>Category</h4>
                      </div>
                      <div className="accTabRight">
                        <p>{item.category}</p>
                      </div>
                    </div>
                    <div className="accTab flex">
                      <div className="accTabLeft">
                        <h4>Format</h4>
                      </div>
                      <div className="accTabRight">
                        <p>{item.format}</p>
                      </div>
                    </div>
                    <div className="accTab flex marginNone">
                      <div className="accTabLeft">
                        <h4>Time</h4>
                      </div>
                      <div className="accTabRight">
                        <p>{item.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="assessmentCardLink">
                    <Link to={item.link} onClick={Vibrate}>
                      <PiArrowRight className="assessmentLinkIcon" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="pagination flex alignCenter justifyCenter">
          <button
            onClick={() => {
              Vibrate();
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
            className="arrowBtns"
          >
            <RiArrowLeftDoubleFill
              className="paginationIcons"
              style={{ marginBottom: "-0.18rem" }}
            />
          </button>
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => {
                Vibrate();
                handlePageChange(pageNumber as number);
              }}
              className={currentPage === pageNumber ? "active" : ""}
              disabled={pageNumber === "..."}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => {
              Vibrate();
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
            className="arrowBtns"
          >
            <RiArrowRightDoubleFill
              className="paginationIcons"
              style={{ marginBottom: "-0.18rem" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Assessments;
