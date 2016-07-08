module.exports = {
	debug: {
		domain: 'http://localhost:8080/',
		cdn: 'http://localhost:8080/',
		env: 'debug',
		port: 8080,
		releaseDir: 'release_debug/'
	},
	test: {
		domain: '',
		cdn: '',
		env: 'test',
		port: 80,
		releaseDir: 'release_test/'
	},
	production: {}
}