require('export-tester')(
	{
		sign: 'f2c',
		pack: 'func2code',
		// req: ['ts'],
	},
	{
		import() {
			console.log(f2c);
		}
	}
).then(() => process.exit(0));
