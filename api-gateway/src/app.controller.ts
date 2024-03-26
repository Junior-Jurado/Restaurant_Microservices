import { 
  Controller,
   Get,
   Header,
   HttpCode, 
   HttpStatus, 
   Patch, 
   Post, 
   Query, 
   Res } from "@nestjs/common";
import { Response, query } from "express";

@Controller()
export class AppController {
  elementos = ['coche', 'moto', 'bicicleta']
  
  @Get()
  getAll() {
    return {
      message: 'Petición exitosa',
      data: this.elementos
    }
  }

  @Post()
  create() {
    this.elementos.push('Un nuevo elemento');
    return this.elementos;
  }

  @Post('http-code')
  @HttpCode(HttpStatus.NO_CONTENT)
  httpCode1() {
    this.elementos.push('Avión');
    return;
  }

  @Patch('http-code')
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  httpCode2() {
    this.elementos[0] = 'Helicoptero';
    console.log('Se ha editado el elemento');
    return `Edited: ${this.elementos[0]}`;
  }

  @Get('header')
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('mi-propiedad-header', 'valor de la propiedad')
  responseWithDecoratorHeader() {
    return 'OK, mira los headers!';
  }

  @Get('library-specific')
  librarySpecific(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .header('mi-propiedad-header-2', 'soy el amo en este momento? sos la perra')
      .jsonp('Todo ok con la libreria especifica');
  }

  @Get('combined-response')
  combineResponseStrategies(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.NOT_MODIFIED);
    res.header('mi-propiedad-header-3', 'el valor de la propiedad 3');
    return res.json('Respuesta combinada, mirar en headers para verificar'); 
  }

  @Get('getProduct')
  getProduct(@Query() query: any) {
    console.log(query);
    return query;
  }

  @Get('getUser')
  getUser(
    @Query('id') _cedula: string,
    @Query('name') nombre: string,
    @Query() query: any
    ) {
      const cedula = parseInt(_cedula)
      const metadata = {cedula, nombre};
      console.log(query);
      
      return {
        message: 'Array of users',
        data : [],
        metadata: metadata
      };
  }



}