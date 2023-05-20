import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Night from '../assets/jonathan-barreto-EkjHd-r_jF0-unsplash.jpg'
import Day from '../assets/engin-akyurt-3ihnKT5apmg-unsplash.jpg'
import { BsFillCloudRainHeavyFill, BsThermometerHalf } from 'react-icons/bs'
import { GiWindsock } from 'react-icons/gi'
import { WiHumidity } from 'react-icons/wi'
import {FaRegEye} from 'react-icons/fa'



const Home = () => {
    const [currenWeather, setCurrentWeather] = useState([])
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
        })
    }, [currenWeather])

    useEffect(() => {
        axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
            params: { q: `${lat},${long}` },
            headers: {
                'X-RapidAPI-Key': '675c9df9aamshd8a3990661c4a6bp1d53c2jsnfb676da3a728',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then((response) => {
            setCurrentWeather(response.data)
        })
    }, [lat, long])

    console.log(currenWeather)

    return (
        <>
            <div className='absolute w-[100vw] h-[100vh] flex flex-col items-center justify-start z-20'>
                <input type="text" placeholder='serach...' className='w-[80%] max-w-[550px] h-[35px] border-solid border-[2px] border-blue-700 rounded-[20px] mt-4 text-center' />
                <h2 className={`${currenWeather?.current?.is_day === 0 ? 'text-white' : 'text-black'} text-[25px] md:text-[28px] mt-3 text-center`}><b>{currenWeather?.location?.country} - {currenWeather?.location?.name}</b></h2>
                <div className='w-[85%] max-w-[450px] h-[270px] flex flex-col items-center justify-start gap-3 backdrop-blur-sm bg-white/30 mt-4 rounded-[25px]'>
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
                        <div className='flex items-center justify-center gap-1'>
                            <BsFillCloudRainHeavyFill size={30} />
                            <p className='text-[19px] md:text-[22px]'><b>{currenWeather?.current?.precip_mm}mm</b></p>
                        </div>
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
            </div>
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