import React, { useState } from "react";
import PropTypes from "prop-types";
import Popover from "react-popover";

function AnswerOption(props) {
	const [isWrong, setIsWrong] = useState(false)
	const style  = props.answered && props.isTrue ? { background: "rgb(75, 181, 67)", color: "white"  } : isWrong ?{ background: "#B33A3A", color: "white" } : { }
  return (
    <li className="answerOption" style={style}>
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={props.answer && props.isTrue}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={(event) => {
          if (!props.isTrue) {
            setIsWrong(true);
          }
          props.onAnswerSelected(props.isTrue, props.postAnswer, props.wikiLink, event);
        }}
      />
      <Popover
        isOpen={props.answer && props.isTrue && false}
        preferPlace="left"
        body={[
          <div
            style={{
              background: "white",
              width: "fit-content",
              padding: "2px",
              borderRadius: "20px",
            }}
          >
            <a key="a" onClick={props.openLearnMore} className="link">
              read more
            </a>
          </div>,
          <div
            key="b"
            style={{
              width: "500px",
              padding: "10px",
              borderRadius: "20px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "black",
            }}
          >
            <span
              style={{
                lineHeight: 1.8,
                background: "white",
              }}
            >
              {props.postAnswer}
            </span>
          </div>,
        ]}
      >
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </Popover>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.bool.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
	onAnswerSelected: PropTypes.func.isRequired,
	isTrue: PropTypes.bool.isRequired
};

export default AnswerOption;
