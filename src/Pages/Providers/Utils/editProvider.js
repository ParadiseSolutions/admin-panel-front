import { useState } from "react";
import { Collapse } from "reactstrap";
import classnames from "classnames";

const EditProvider = () => {
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [col3, setcol3] = useState(false);

  function togglecol1() {
    setcol1(!col1);
    setcol2(false);
    setcol3(false);
  }

  function togglecol2() {
    setcol1(false);
    setcol2(!col2);
    setcol3(false);
  }

  function togglecol3() {
    setcol1(false);
    setcol2(false);
    setcol3(!col3);
  }

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col1,
            })}
            type="button"
            onClick={togglecol1}
            style={{
              cursor: "pointer",
              backgroundColor: "#F6851F",
              text: "white",
            }}
          >
            <p style={{ text: "white" }}>General Information</p>
          </button>
        </h2>
        <Collapse id="collapseOne" className="accordion-collapse" isOpen={col1}>
          <div className="accordion-body">
            <strong>This is the first item&apos;s accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It&apos;s also worth noting that
            just about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </div>
        </Collapse>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col2,
            })}
            type="button"
            style={{ cursor: "pointer" }}
          >
            Contacts
          </button>
        </h2>
        <Collapse id="collapseTwo" className="accordion-collapse" isOpen={col2}>
          <div className="accordion-body"></div>
        </Collapse>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: !col3,
            })}
            type="button"
            style={{ cursor: "pointer" }}
          >
            Social Media Profiles
          </button>
        </h2>
        <Collapse
          id="collapseThree"
          className="accordion-collapse"
          isOpen={col3}
        >
          <div className="accordion-body"></div>
        </Collapse>
      </div>
    </div>
  );
};

export default EditProvider;
