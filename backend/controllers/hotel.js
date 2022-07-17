import Hotel from '../models/Hotel.js'

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body)

  try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
  } catch (err) {
    next(err)
  }
}
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedHotel)
  } catch (err) {
    next(err)
  }
}
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json('Hotel has been deleted.')
  } catch (err) {
    next(err)
  }
}
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (err) {
    next(err)
  }
}

// fectch hotels from params when a query is true
// const hotels = await Hotel.find(req.query)
// http://localhost:8080/api/hotels?featured=true

// fetch hotels from params when a query is true an limited to X
//  const hotels = await Hotel.find(req.query).limit(req.query.limit)
// http://localhost:8080/api/hotels?featured=true&limit=2

// fetch min and max price
// http://localhost:8080/api/hotels?&min=10&max=51

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query
  // {...others} are items in the params before the min and max prices
  console.log({ ...others })
  try {
    // const hotels = await Hotel.find(req.query).limit(req.query.limit)
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit)
    res.status(200).json(hotels)
  } catch (err) {
    next(err)
  }
}

// http://localhost:8080/api/hotels/countbycity?cities=lagos,madrid,london,berlin
export const countByCity = async (req, res, next) => {
  // split cities from params and make it an array
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city })
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

// http://localhost:8080/api/hotels/countbytype
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
    const resortCount = await Hotel.countDocuments({ type: 'resort' })
    const villaCount = await Hotel.countDocuments({ type: 'villa' })
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' })

    res.status(200).json([
      { type: 'hotels', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ])
  } catch (err) {
    next(err)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}
