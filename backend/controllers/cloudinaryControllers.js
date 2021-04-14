import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload = async (req, res) => {
  const response = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  })
  res.json({
    public_id: response.public_id,
    url: response.secure_url,
  })
}

export const remove = (req, res) => {
  let image_id = req.body.public_id

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error })
    res.send('aight')
  })
}
