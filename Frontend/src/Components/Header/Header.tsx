import "./header.styles.css";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

function Header() {

  //Scroll to top when title is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    <>
      <div className="header-container">
        <h1 className="title" onClick={scrollToTop}>
          SummarQuick
          <DoneAllOutlinedIcon
            fontSize="large"
            style={{
              marginTop: "8px",
              marginLeft: "5px",
              position: "absolute",
            }}
          />
        </h1>
      </div>
    </>
  );
}

export default Header;
