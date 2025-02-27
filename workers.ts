import { spawn } from 'child_process'

const workers = ['shared/workers/user-follow-worker.ts']

workers.forEach(workerPath => {
	const worker = spawn('tsx', [workerPath], {
		stdio: 'inherit',
		shell: true
	})

	worker.on('close', code => {
		console.log(`${workerPath} завершился с кодом ${code}`)
	})

	worker.on('error', err => {
		console.error(`Ошибка при запуске ${workerPath}:`, err)
	})
})
