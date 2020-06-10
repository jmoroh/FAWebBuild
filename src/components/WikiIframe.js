import React from 'react'
class WikiIframe extends React.Component {
	constructor(props){
		super(props)
	}
	render() {
		const {ref, url} = this.props
		return (
		<div className='wikiContainer' ref={ref}>
		<iframe className='wikiIframe' title='wiki-iframe' src={url}>
		</iframe>
		</div>
		)
	}


}

export default WikiIframe