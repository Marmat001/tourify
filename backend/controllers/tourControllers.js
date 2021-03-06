import Tour from '../models/tourModel'
import slugify from 'slugify'

export const add = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title)
    res.json(await new Tour(req.body).save())
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

export const getAllTours = async (req, res) => {
  const tours = await Tour.find({})
    .limit(parseInt(req.params.amount))
    .populate('continent')
    .populate('country')
    .sort([['createdAt', 'desc']])
    .exec()

  res.json(tours)
}

export const remove = async (req, res) => {
  try {
    res.json(await Tour.findOneAndRemove({ slug: req.params.slug }).exec())
  } catch (error) {
    console.log(error)
    return res.status(400).send('Removal of tour unsuccessful')
  }
}

export const getTourInfo = async (req, res) => {
  res.json(
    await Tour.findOne({ slug: req.params.slug })
      .populate('continent')
      .populate('country')
      .exec()
  )
}

export const update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }

    res.json(
      await Tour.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        new: true,
      }).exec()
    )
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error.message,
    })
  }
}

export const show = async (req, res) => {
  const { sort, page, order } = req.body

  const pageInUse = page || 1
  const amountPerPage = 3

  try {
    res.json(
      await Tour.find({})
        .skip((pageInUse - 1) * amountPerPage)
        .populate('continent')
        .populate('country')
        .sort([[sort, order]])
        .limit(amountPerPage)
        .exec()
    )
  } catch (error) {
    console.log(error)
  }
}

export const allTours = async (req, res) => {
  res.json(await Tour.find({}).estimatedDocumentCount().exec())
}

export const showRelated = async (req, res) => {
  const tour = await Tour.findById(req.params.tourId).exec()

  const relatedTours = await Tour.find({
    _id: { $ne: tour._id },
    continent: tour.continent,
  })
    .limit(3)
    .populate('continent')
    .populate('country')
    .exec()
  res.json(relatedTours)
}

const handleSearch = async (req, res, query) => {
  const tours = await Tour.find({ $text: { $search: query } })
    .populate('continent', '_id name')
    .populate('country', '_id name')
    .exec()

  res.json(tours)
}

const handleContinent = async (req, res, continent) => {
  const tours = await Tour.find({ continent })
    .populate('continent', '_id name')
    .populate('country', '_id name')
    .exec()

  res.json(tours)
}

const handlePrice = async (req, res, price) => {
  const tours = await Tour.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  })
    .populate('continent', '_id name')
    .populate('country', '_id name')
    .exec()

  res.json(tours)
}

const handleCountry = async (req, res, country) => {
  const tours = await Tour.find({ country })
    .populate('continent', '_id name')
    .populate('country', '_id name')
    .exec()

  res.json(tours)
}

export const filterSearch = async (req, res) => {
  const { query, price, continent, country } = req.body

  if (query) {
    await handleSearch(req, res, query)
  }

  if (continent) {
    await handleContinent(req, res, continent)
  }

  if (price !== undefined) {
    await handlePrice(req, res, price)
  }

  if (country) {
    await handleCountry(req, res, country)
  }
}
