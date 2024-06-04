import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}
	
	const { email } = req.body;
	
	if (!email) {
		return res.status(400).json({ message: 'Email is required' });
	}
	
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_SERVER,
		port: Number(process.env.SMTP_PORT),
		secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
		auth: {
			user: process.env.SMTP_LOGIN,
			pass: process.env.SMTP_PASSWORD,
		},
	});
	
	const mailOptions = {
		from: process.env.SMTP_FROM_ADDRESS,
		to: email,
		subject: 'Test Email',
		text: 'привет, это тест смтп',
	};
	
	try {
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Email sent successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to send email' });
	}
};

export default handler;
