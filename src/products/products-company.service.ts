import { PfxHttpMethodEnum, PfxHttpService } from 'profaxnojs/axios';

import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ProductsResponseDto } from './dto/products-response-dto';
import { ProductsCompanyDto } from './dto/products-company.dto';
import { ProductsEnum } from './enum/products.enum';

@Injectable()
export class ProductsCompanyService {
  private readonly logger = new Logger(ProductsCompanyService.name);

  private siproadHost: string = null;
  private siproadApiKey: string = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly pfxHttpService: PfxHttpService
  ) { 
    this.siproadHost = this.configService.get('siproadHost');
    this.siproadApiKey = this.configService.get('siproadApiKey');
  }

  updateCompany(dto: ProductsCompanyDto): Promise<ProductsResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.PATCH;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_COMPANY_UPDATE);
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = dto;

    // * send request
    return this.pfxHttpService.request<ProductsResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`updateCompany: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`updateCompany: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`updateCompany: ${error}`);
      throw error;
    })
  }

  deleteCompany(id: string): Promise<ProductsResponseDto>{
    const start = performance.now();

    // * generate request values
    const method  = PfxHttpMethodEnum.DELETE;
    const path    = this.siproadHost.concat(ProductsEnum.PATH_COMPANY_DELETE).concat(`/${id}`);;
    const headers = { "x-api-key": this.siproadApiKey };
    const body    = {};

    // * send request
    return this.pfxHttpService.request<ProductsResponseDto>(method, path, headers, body)
    .then(response => {

      if ( !(
        response.internalCode == HttpStatus.OK || 
        response.internalCode == HttpStatus.CREATED || 
        response.internalCode == HttpStatus.BAD_REQUEST || 
        response.internalCode == HttpStatus.NOT_FOUND) )
        throw new Error(`deleteCompany: Error, response=${JSON.stringify(response)}`);

      const end = performance.now();
      this.logger.log(`deleteCompany: OK, runtime=${(end - start) / 1000} seconds`);
      return response;
    })
    .catch(error => {
      this.logger.error(`deleteCompany: ${error}`);
      throw error;
    })
  }

}
