import { spawn } from 'child_process'

const workers = [
	'shared/workers/postViewCounterWorker.ts',
	'shared/workers/postLikeWorker.ts',
	'shared/workers/commentLikeWorker.ts'
]

workers.forEach(workerPath => {
	const worker = spawn('ts-node', [workerPath], {
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
