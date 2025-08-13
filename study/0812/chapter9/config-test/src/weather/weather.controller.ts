import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService) {}

    @Get()
    async getWeather() {
      const apiUrl = this.configService.get('WEATHER_API_URL');
  
      // 날씨 API 호출
      return await this.callWeatherApi(apiUrl);
    }
  
    async callWeatherApi(apiUrl: string): Promise<string> {
      console.log('날씨 정보 가져오는 중...');
      console.log(apiUrl);
      const result = await axios.get(apiUrl)
      const weather = result.data
      const mains = weather.weather.map((el) => el.main)
      return mains.join(" and ");
    }
}
