define({
	app: {
		root: ( window.location.host === 'localhost' ) ? 'http://localhost:1337' : 'http://heroku-sails5.herokuapp.com/'
	},
	facebook: {
		appId	   : ( window.location.host === 'localhost' ) ? '131362800367499' : '647909491937242'
		cookie     : true,
		xfbml      : true
	},
	parse: {
		id: 'QVPeNvBhSGyv4Ana4vi3Xz5CIHxAnqZpigiykQc1',
		key: 'Wk1R1AFlII3AvGC7sMJCIpaBRthZDabRwc5SJOPx'
	},
	constants: {
		STATE: {
			'REGISTER' : 0,
			'LOGIN' : 1,
			'SPORTS' : 2,
			'LOCATIONS' : 3,
			'AVAILABILITY' : 4
		}
	}
});