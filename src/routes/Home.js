import React, { Component } from "react";
import quizQuestions from "../api/quizQuestions";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import WikiIframe from '../components/WikiIframe'
import AdSense from 'react-adsense'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      nextButton: false,
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {},
			result: "",
			wikiLink: "",
			activeWikiLink: "",
			learnMoreContent: '',
			learnMoreLink: '',
			validAnswers: 0,
			questionsAnswered: 0,
			rightAnswer: false,
			allQuestions: []
    };

		
    this.wikiEl = React.createRef()
    this.setNextQuestion = this.setNextQuestion.bind(this);
		this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
		this.openLearnMore = this.openLearnMore.bind(this)
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map((question) =>
      this.shuffleArray(question.answers)
		);
		const allShuffledQuestions = this.shuffleArray(quizQuestions)
    this.setState({
			allQuestions: allShuffledQuestions,
      question: allShuffledQuestions[0].question,
      postAnswer: allShuffledQuestions[0].postAnswer,
      wikiLink: allShuffledQuestions[0].wikiLink,
      answerOptions: shuffledAnswerOptions[0],
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(correct, answer, answerLink, event) {
    this.setUserAnswer(event.currentTarget.value);
		const {validAnswers} = this.state
		const updatedValidAnswers = correct ? Number(validAnswers + 1) : validAnswers
		this.setState( {
			...this.state, 
			learnMoreContent: answer,
			learnMoreLink: answerLink,
			rightAnswer: correct,
			validAnswers: updatedValidAnswers,
		})

    if (this.state.questionId < this.state.allQuestions.length) {
      this.setState({ nextButton: true });
    } else {
      setTimeout(() => this.setResults(this.getResults()), 8000);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1,
      },
      answer: answer,
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      nextButton: false,
      question: this.state.allQuestions[counter].question,
      answerOptions: this.state.allQuestions[counter].answers,
      postAnswer: this.state.allQuestions[counter].postAnswer,
      wikiLink: this.state.allQuestions[counter].wikiLink,
			answer: '',
			learnMoreContent: '',
			learnMoreLink: '',
			questionsAnswered: this.state.questionsAnswered + 1

    });
	}
	
	openLearnMore () {
		
		this.setState({...this.state, activeWikiLink: this.state.wikiLink})

		console.log(this.wikiEl.current)
		window.setTimeout(()=> {
			this.wikiEl.current.scrollIntoView({ alignToTop: true, behavior: "smooth" })
		}, 100)
	}

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(
      (key) => answersCount[key] === maxAnswerCount
    );
  }

  setResults(result) {
    this.setState({ result: "completed" });
  }

  renderQuiz() {
    return (
      <div className='topContainer'>
				<div className='leftColumn'>
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          postAnswer={this.state.postAnswer}
          wikiLink={this.state.wikiLink}
          questionTotal={this.state.allQuestions.length}
					onAnswerSelected={this.handleAnswerSelected}
					openLearnMore={this.openLearnMore}
					learnMoreContent={this.state.learnMoreContent}
					learnMoreLink={this.state.learnMoreLink}
					rightAnswer={this.state.rightAnswer}
        />
				</div>

				<div className='rightColumn'>
       
				{/* {this.state.questionsAnswered > 0  && */}
						<div className="validAnswersContainer">
							<div className='pointsCounter'>
							
							You have now donated {this.state.questionsAnswered * 10} Aid Points to charities fighting for social justice
							</div>
							{/* <div className='subtitle'>
								Each point is a little donation towards Black Lives Matter
							</div> */}
						</div>
						{/* {this.state.nextButton ? ( */}
          <button onClick={this.setNextQuestion} className="next-button">
            Next Question
          </button>
        {/* ) : null} */}
				{/* } */}
				</div>

      </div>
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
			<div className='quiz-app-container'>
					{this.state.result ? this.renderResult() : this.renderQuiz()}
					<div>
						<div className="wikiframe-container" ref={this.wikiEl}>
						{this.state.activeWikiLink && 
						<WikiIframe 
						url={this.state.activeWikiLink}/>
						}
						</div>

						<div className='ad-sense-container'>
						<AdSense.Google
							client='ca-pub-7292810486004926'
							slot='7806394673'
						/>
						</div>
					</div>
			</div> 
		) 
	}
}

export default Home;
