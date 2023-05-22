import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Night from '../assets/jonathan-barreto-EkjHd-r_jF0-unsplash.jpg'
import Day from '../assets/engin-akyurt-3ihnKT5apmg-unsplash.jpg'
import { BsCloudRainHeavyFill, BsFillCloudRainHeavyFill, BsGraphUp, BsSnow, BsThermometerHalf, BsThermometerSnow, BsThermometerSun } from 'react-icons/bs'
import { GiWindsock } from 'react-icons/gi'
import { WiHumidity } from 'react-icons/wi'
import { FaRegEye, FaThermometerHalf, FaWind } from 'react-icons/fa'
import { TbCurrentLocation, TbCurrentLocationOff } from 'react-icons/tb'
import { AiFillCloud, AiOutlineCompass } from 'react-icons/ai'
import { TiWeatherWindy } from 'react-icons/ti'



const Home = () => {
    const [currenWeather, setCurrentWeather] = useState([])
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [dayly, setDayly] = useState([])
    const [inputValue, setValue] = useState('')

    const handleValue = (event) => {
        setValue(event.target.inputValue)
    }

    const coords = `${lat},${long}`

    const snowCodes = [1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258]

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        })
        axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
            params: { q: `${coords}` },
            headers: {
                'X-RapidAPI-Key': '675c9df9aamshd8a3990661c4a6bp1d53c2jsnfb676da3a728',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then((response) => {
            setCurrentWeather(response.data)
        })
    }, [coords, lat, long])


    useEffect(() => {
        axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
            params: {
                q: `${coords}`,
                days: '3'
            },
            headers: {
                'X-RapidAPI-Key': '675c9df9aamshd8a3990661c4a6bp1d53c2jsnfb676da3a728',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then((response) => {
            setDayly(response.data)
        })
    }, [coords])

    const Search = (e) => {
        if (e.key === 'Enter') {
            axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
                params: { q: `${inputValue}` },
                headers: {
                    'X-RapidAPI-Key': '675c9df9aamshd8a3990661c4a6bp1d53c2jsnfb676da3a728',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            }).then((response) => {
                setCurrentWeather(response.data)
            })
            setValue('')
        }
    }

    

    const refresh = () => window.location.reload(true)

    console.log(currenWeather)

    return (
        <>

            {coords === 'null,null' || currenWeather?.location?.name === 'Null' ?
                <div className='absolute w-[100vw] h-[100vh] flex flex-col items-center justify-start z-20'>
                    <input type="text" placeholder='serach...' value={inputValue} onKeyPress={Search} onChange={handleValue} className='w-[80%] max-w-[550px] h-[35px] border-solid border-[2px] border-blue-700 rounded-[20px] mt-4 text-center' />
                    <h2 className={`text-white text-[25px] md:text-[28px] mt-3 text-center`}><b>- -</b></h2>
                    <div className='flex items-center justify-center cursor-pointer'>
                        <TbCurrentLocation onClick={refresh} size={25} color='white' />
                    </div>
                    <div className='w-[85%] text-[18px] md:text-[22px] text-center max-w-[450px] h-[270px] flex flex-col items-center justify-start gap-3 p-2 backdrop-blur-sm bg-white/50 mt-4 rounded-[25px]'>
                        <p><b>No data</b></p>
                        <TbCurrentLocationOff size={40} />
                        <p>1. Your geolocation is switched off</p>
                        <p>2. Your browser doesnot support our geolocation tecnology</p>
                        <p><b>you can search manualy for any town</b></p>
                    </div>
                </div>
                :
                <div className='absolute w-[100vw] h-[100vh] flex flex-col items-center justify-start z-20 overflow-auto'>
                    <input type="text" placeholder='serach...' value={inputValue} onKeyPress={Search} onChange={handleValue} className='w-[80%] max-w-[550px] h-[35px] border-solid border-[2px] border-blue-700 rounded-[20px] mt-4 text-center' />
                    <h2 className={`text-white text-[25px] md:text-[28px] mt-3 text-center`}><b>{currenWeather?.location?.country} - {currenWeather?.location?.name}</b></h2>
                    <div className='flex items-center justify-center cursor-pointer'>
                        <TbCurrentLocation onClick={refresh} size={25} color='white' />
                    </div>
                    <div className='w-[85%] max-w-[450px] h-[270px] flex flex-col items-center justify-start gap-3 backdrop-blur-sm bg-white/50 mt-4 rounded-[25px]'>
                        <div className='w-[90%] flex items-center justify-center'>
                            <div className='w-[100px] h-[100px] flex items-center justify-center overflow-hidden'>
                                <img src={currenWeather?.current?.condition?.icon} alt="/" className='h-[100%] object-cover' />
                            </div>
                            <p className='text-[20px] md:text-[25px]'><b>{currenWeather?.current?.condition?.text}</b></p>
                        </div>
                        <div className='w-[90%] flex items-center justify-center gap-6'>
                            <div className='flex items-center justify-center'>
                                <BsThermometerHalf size={30} />
                                <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.temp_c}ºC</b></p>
                            </div>
                            {
                                snowCodes.includes(currenWeather?.current?.condition?.code) ?
                                    <div className='flex items-center justify-center gap-1'>
                                        <BsSnow size={30} />
                                        <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.precip_mm}mm</b></p>
                                    </div>
                                    :
                                    <div className='flex items-center justify-center gap-1'>
                                        <BsFillCloudRainHeavyFill size={30} />
                                        <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.precip_mm}mm</b></p>
                                    </div>
                            }
                            <div className='flex items-center justify-center gap-1'>
                                <GiWindsock size={30} />
                                <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.wind_kph}kph</b></p>
                            </div>
                        </div>
                        <div className='w-[100%] flex items-center justify-center gap-8'>
                            <div className='flex items-center justify-center gap-1'>
                                <WiHumidity size={35} />
                                <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.humidity}%</b></p>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <FaRegEye size={35} />
                                <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.vis_km}km</b></p>
                            </div>
                        </div>
                        <div className='w-[100%] flex flex-col justify-center items-center gap-1'>
                            <p>Last update:</p>
                            <p><b>{currenWeather?.current?.last_updated}</b></p>
                        </div>
                    </div>
                    <div className='w-[100%] h-[100%] min-h-[300px] flex flex-col items-center justify-center gap-3 p-2 overflow-auto'>
                        {
                            dayly?.forecast?.forecastday?.map((elem) => (
                                <div className='w-[90%] max-w-[400px] flex items-center justify-start p-2 rounded-[25px] bg-gradient-to-r from-cyan-500 to-blue-500'>
                                    <img src={elem.day?.condition?.icon} alt="/" className='h-[50px]' />
                                    <div className='w-[100%] flex items-center justify-center gap-4'>
                                        <div className='flex items-center justify-center gap-1 text-white md:text-[18px]'>
                                            <FaThermometerHalf size={25} color='white' />
                                            <p><b>{elem.day?.avgtemp_c}</b>ºC</p>
                                        </div>
                                        {
                                            snowCodes.includes(elem.day?.condition?.code) ?
                                                <div className='flex items-center justify-center gap-1 text-white md:text-[18px]'>
                                                    <BsSnow size={25} color='white' />
                                                    <p><b>{elem.day?.daily_chance_of_snow}</b>%</p>
                                                </div>
                                                :
                                                <div className='flex items-center justify-center gap-1 text-white md:text-[18px]'>
                                                    <BsCloudRainHeavyFill size={25} color='white' />
                                                    <p><b>{elem.day?.daily_chance_of_rain}</b>%</p>
                                                </div>
                                        }
                                        <div className='flex items-center justify-center gap-1 text-white md:text-[18px]'>
                                            <FaWind size={25} color='white' />
                                            <p><b>{elem.day?.maxwind_kph}</b>kph</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-[100%] max-w-[500px] flex flex-col items-center justify-center gap-4 p-3'>
                        {
                            currenWeather?.current &&
                            <>
                                <div className='w-[100%] flex items-center justify-center gap-6'>
                                    <div className='w-[40%] h-[130px] flex flex-col items-center justify-center backdrop-blur-sm bg-white/50 rounded-[25px]'>
                                        <p>cloud cover</p>
                                        <AiFillCloud size={45} />
                                        <p className='text-[23px] md:text-[25px]'><b>{currenWeather?.current?.cloud}%</b></p>
                                    </div>
                                    <div className='w-[40%] h-[130px] flex flex-col items-center justify-center backdrop-blur-sm bg-white/50 rounded-[25px]'>
                                        <p className='text-[28px] md:text-[30px]'><b>UV</b></p>
                                        <p className='text-[22px] md:text-[24px]'><b>{currenWeather?.current?.uv}</b></p>
                                    </div>
                                </div>

                                <div className='w-[100%] flex items-center justify-center gap-6'>
                                    <div className='w-[40%] h-[130px] flex flex-col items-center justify-center backdrop-blur-sm bg-white/50 rounded-[25px]'>
                                        <p>wind direction</p>
                                        <AiOutlineCompass size={45} />
                                        <p className='text-[22px] md:text-[24px]'><b>{currenWeather?.current?.wind_dir}</b></p>
                                    </div>
                                    <div className='w-[40%] h-[130px] flex flex-col items-center justify-center backdrop-blur-sm bg-white/50 rounded-[25px]'>
                                        <p>pressure</p>
                                        <TiWeatherWindy size={45} />
                                        <p className='text-[22px] md:text-[24px]'><b>{currenWeather?.current?.pressure_mb}</b>mb</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>}
            <div className='relative w-[100vw] h-[100vh] flex items-center justify-center'>
                {
                    currenWeather?.current?.is_day === 0 ?
                        <img src={Night} alt="night" className='w-[100%] h-[100%] object-cover' />
                        :
                        <img src={Day} alt="day" className='w-[100%] h-[100%] object-cover' />
                }
            </div>
        </>
    )
}

export default Home