import { Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import { uploadFile } from '../services/uploads'

export class UserController {
	async create(req: Request, res: Response){
		const { name, email } = req.body
		const { originalname, buffer, mimetype } = req.file as {
			originalname: string,
			buffer: Buffer,
			mimetype: string
		}

		try {
			const cover = await uploadFile(
				`users/${originalname}`, 
				buffer,
				mimetype
			)

			const newUser = userRepository.create({ name, email, cover })
			await userRepository.save(newUser)

			return res.status(201).json(newUser)
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	}

	async get(req: Request, res: Response){
		try {
			const users = await userRepository.find()
			return res.json(users)
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	}
}