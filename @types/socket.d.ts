import { Server as HttpServer } from 'http';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIo = NextApiResponse & {
	socket: {
		server: HttpServer & {
			io?: SocketIOServer;
		};
	};
};