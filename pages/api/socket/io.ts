import type { NextApiResponseServerIo } from '@/@types/socket';
import { Server as HttpServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
	if (!res.socket.server.io) {
		const path = '/api/socket/io';
		const httpServer: HttpServer = res.socket.server;
		const io = new ServerIO(httpServer, {
			path: path,
			addTrailingSlash: false,
		});
		res.socket.server.io = io;
	}
	res.end();
};

export default ioHandler;