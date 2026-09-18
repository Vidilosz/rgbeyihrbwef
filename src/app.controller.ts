import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import fs from 'fs';
import { Criminal } from './Criminal.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('piros-kek')
  @Render('red-blue')
  getRedBlue() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let bgColor = randomNumber > 50 ? 'red' : 'blue';
    return {
      bgColor
    }
  }

  @Get('wanted')
  @Render('wanted')
  getWanted() {
    const criminal = JSON.parse(fs.readFileSync('wanted.json', {encoding: 'utf-8'})) as Criminal;
    return { criminal };
  }

  @Get('search')
  @Render('search')
  searchCrime(@Query('keresett') keresett: string) {
    if (!keresett){
      return {
        talalatok:[]
      }
    }

    const criminal = JSON.parse(
    fs.readFileSync('wanted.json', {encoding: 'utf-8'})
    ) as Criminal;

    return{
      talalatok: criminal.crimes.filter
      (c => c.toLocaleLowerCase().includes(keresett.toLocaleLowerCase()))
    }
  }

}
