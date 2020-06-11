
const csv = require('csvtojson')
const path = require('path')
const fs = require('fs')

const quizFilePath = path.join(__dirname, 'static', 'quizQuestions.csv')


csv()
	.fromFile(quizFilePath)
	.then((rawJSON)=>{
		console.log(rawJSON[0])
		const finalQuiz = []
		rawJSON.forEach(row => {
			// const topic = row.Topic
			const answers = [
				{content: row['1b'][' MC Answer 1 (Correct)'], type: true},
				{content: row['1b'][' MC Answer 2'], type: false},
				{content: row['1b'][' MC Answer 3'], type: false},
			].sort((a, b) => a.content > b.content)
			const postAnswer = row['2'][' Post-Answer Blurb (selection of 2-3 sentences of Wikipedia Intro)']
			const wikiLink = row['3'][' Wikipedia Link']
			const question = row['1a'][' MC Question']
			const answer = {
				question,
				answers,
				postAnswer,
				wikiLink
			}
			finalQuiz.push(answer)
		})		 
		// console.log(finalQuiz)
		fs.writeFileSync(path.join(__dirname, 'static','quizQuestions.json'), JSON.stringify(finalQuiz))
	})
// ,1b. MC Answer 1,1b. MC Answer 2,1b. MC Answer 3,2. Post-Answer Blurb (selection of 2-3 sentences of Wikipedia Intro),3. Wikipedia Link