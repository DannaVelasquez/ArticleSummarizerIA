import "./header.styles.css";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

function Header() {
  return (
    <>
      <div className="header-container">
        <h1 className="title">
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
