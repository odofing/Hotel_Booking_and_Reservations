import './Header.css'
import { useNavigate } from 'react-router-dom'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import React, { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { SearchContext } from '../../Context/searchContext'

const Header = ({ type }) => {
  const navigate = useNavigate()
  const [openDate, setOpenDate] = useState(false)
  const [destination, setDestination] = useState('')
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const { dispatch } = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } })
    navigate('/hotels', { state: { destination, dates, options } })
  
  }
  return (
    <>
      <div className='header'>
        <div
          className={
            type === 'list' ? 'headerContainer listMode' : 'headerContainer'
          }
        >
          <div className='headerList'>
            <div className='headerListItem active'>
              <i class='fa-solid fa-bed'>
                {' '}
                <span>Stays</span>{' '}
              </i>
            </div>

            <div className='headerListItem'>
              <i class='fa-solid fa-jet-fighter-up'>
                {' '}
                <span>Flights</span>
              </i>
            </div>
            <div className='headerListItem'>
              <i class='fa-solid fa-car'>
                {' '}
                <span>Car Rentals</span>{' '}
              </i>
            </div>
            <div className='headerListItem'>
              <i class='fa-solid fa-bed'>
                {' '}
                <span>Attractions</span>{' '}
              </i>
            </div>
            <div className='headerListItem'>
              <i class='fa-solid fa-car'>
                {' '}
                <span>Airport Taxi</span>{' '}
              </i>
            </div>
          </div>
          {type !== 'list' && (
            <>
              <h1 className='headerTitle'>
                Lorem ipsum dolor sit amet consectetur.
              </h1>
              <p className='headerDesc'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                tempore laboriosam beatae exercitationem non minima.
              </p>
              <button className='headerBtn'>Sign in / Register</button>
              <div className='headerSearch'>
                <div className='headerSearchItem'>
                  <i className='fa-solid fa-bed icon'></i>
                  <input
                    type='text'
                    className='headerSearchInput'
                    placeholder='where are you going'
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className='headerSearchItem'>
                  <i className='fa-solid fa-calendar-plus icon'></i>
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className='headerSearchText'
                  >{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                    dates[0].endDate,
                    'MM/dd/yyyy'
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className='date'
                    />
                  )}
                </div>
                <div className='headerSearchItem'>
                  <i className='fa-solid fa-person icon'></i>
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className='headerSearchText'
                  >
                    {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                  </span>

                  {openOptions && (
                    <div className='options'>
                      <div className='optionItem'>
                        <span className='optionText'>Adult</span>
                        <div className='optionCounter'>
                          <button
                            disabled={options.adult <= 1}
                            className='optionCounterButton'
                            onClick={() => handleOption('adult', 'd')}
                          >
                            -
                          </button>
                          <span className='optionCounterNumber'>
                            {options.adult}
                          </span>
                          <button
                            className='optionCounterButton'
                            onClick={() => handleOption('adult', 'i')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='optionItem'>
                        <span className='optionText'>Children</span>
                        <div className='optionCounter'>
                          <button
                            disabled={options.children <= 0}
                            className='optionCounterButton'
                            onClick={() => handleOption('children', 'd')}
                          >
                            -
                          </button>
                          <span className='optionCounterNumber'>
                            {options.children}
                          </span>
                          <button
                            className='optionCounterButton'
                            onClick={() => handleOption('children', 'i')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className='optionItem'>
                        <span className='optionText'>Room</span>
                        <div className='optionCounter'>
                          <button
                            disabled={options.room <= 1}
                            className='optionCounterButton'
                            onClick={() => handleOption('room', 'd')}
                          >
                            -
                          </button>
                          <span className='optionCounterNumber'>
                            {options.room}
                          </span>
                          <button
                            className='optionCounterButton'
                            onClick={() => handleOption('room', 'i')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className='headerBtn' onClick={handleSearch}>
                  Search
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
