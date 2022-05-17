import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';


const WeatherBox = () => {

  const [cityWeather, setCityWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    const cityName = city;
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=91285d50f3452fdecb3d6880dee8ff54&units=metric`)
   .then(res => {
     if(res.status === 200){

      return res.json()
      .then(data => {
   
       const weatherData = {
         city: data.name,
         temp: data.main.temp,
         icon: data.weather[0].icon,
         description: data.weather[0].main
       };
   
        setCityWeather(weatherData);   
        setPending(false);  
      });
     } else {
       setError(true);
     }
    })
  }, []);
 
  return (
    <section>
      <PickCity action={handleCityChange} />
      {(cityWeather && !pending && !error) && <WeatherSummary {...cityWeather}/>}
      {(pending && !error) && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;