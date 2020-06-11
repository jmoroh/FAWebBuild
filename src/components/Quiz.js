import React, {useState} from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import Question from "../components/Question";
import QuestionCount from "../components/QuestionCount";
import AnswerOption from "../components/AnswerOption";


function Quiz(props) {

  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.content}
				isTrue={key.type}
				postAnswer={props.postAnswer}
				answered={props.learnMoreLink != '' ? true : false}
        wikiLink={props.wikiLink}
        answer={props.answer}
        questionId={props.questionId}
				onAnswerSelected={props.onAnswerSelected}
				openLearnMore={props.openLearnMore}
      />
    );
  }

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={400}
      transitionLeaveTimeout={100}
      transitionAppear
      transitionAppearTimeout={500}
    >
				
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
			
						<ul className="answerOptions">

						{props.answerOptions.map(renderAnswerOptions)}
						</ul>

						{	props.learnMoreLink !== '' &&
					
					<div
						className='quizzBox'
						style={{	background: props.rightAnswer? '#4bb543': '#B33A3A'}}
					>
						<QuestionCount counter={props.questionId} total={props.questionTotal} />
						<Question content={props.question} />
						<div className="answerExplanationContainer">
						{/* <div className={`correctAnswer ${props.rightAnswer?'correct': 'wrong'}`}>
						{props.rightAnswer ? "Correct ": "Incorrect"}
						</div> */}
							<div className='answerExplanation'>
							{props.postAnswer}

							</div>
					<a key="a" className="learnMoreLink" style={{color:'white'}} onClick={props.openLearnMore} >
						Learn more
					</a>
					</div>
					</div>
				}
				
      </div>
		
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default Quiz;
