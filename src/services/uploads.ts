import { Endpoint, S3 } from 'aws-sdk'

const endpoint = new Endpoint(`${process.env.ENDPOINT_S3}`)

const s3 = new S3({
	endpoint,
	credentials: {
		accessKeyId: `${process.env.KEY_ID}`,
		secretAccessKey: `${process.env.APP_KEY}`
	}
})

export const uploadFile = async (path: string, buffer: Buffer, mimetype: string) => {
	const arquivo = await s3.upload({
		Bucket: `${process.env.BUCKET}`,
		Key: path,
		Body: buffer,
		ContentType: mimetype
	}).promise()

	return arquivo.Location
}