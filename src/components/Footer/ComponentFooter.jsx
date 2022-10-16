import React from "react";
import { Link } from "react-router-dom";

const ComponentFooter = ({ header, tabContent, className }) => {
  return (
    <div className={`contact__container ${className && className}`}>
      <div>
        <div className="elementor-column-populated">
          <div className="heading-primary-wrap">
            <h2
              style={{ textAlign: "left" }}
              className="heading-primary elementor-heading-title"
            >
              {header}
            </h2>
          </div>
          <div className="contact__list">
            <div className="maxcoach-list">
              {tabContent.map((content, i) => (
                <div key={i} className="item">
                  <div className="list-header">
                    <div className="text-wrap">
                      <Link to={content.link} target="_blank"  title="">
                        <div className="text">{content.content}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentFooter;
