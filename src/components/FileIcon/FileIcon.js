import React from "react";
import propTypes from "prop-types";

import "./FileIcon.css";

const FileIcon = ({ imageURL, className }) => {
  const baseClass = "FileIcon";

  return (
    <span className={`${baseClass} ${className}`}>
      {imageURL && (
        <img className={`${baseClass}__img`} src={imageURL} alt={`icon`} />
      )}
    </span>
  );
};

FileIcon.propTypes = {
  imageURL: propTypes.string,
  className: propTypes.string
};

export default FileIcon;
