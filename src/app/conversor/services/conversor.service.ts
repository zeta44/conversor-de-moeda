import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { conversaoResponse, Conversao } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class ConversorService {

  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";

  constructor(
    private http: HttpClient,
  ) { }

    /**
     * Realizar a concatenação (chamada) para API de Conversão de moedas BASE_URL.
     * 
     */
    converter(conversao:Conversao):Observable<any>{
      let params = `&base=${conversao.moedaDe}&simbols=${conversao.moedaPara}`;
      return this.http.get(this.BASE_URL + params)
    }
    /**
     * Retornar a cotação para um dado de resposta(response)
     * @param conversaoResponse 
     * @param versao 
     * @returns 
     */
    cotacaoPara(conversaoResponse:conversaoResponse, conversao: Conversao):number{
      if (conversaoResponse === undefined) {
        return 0;
      }

      return conversaoResponse.rates[conversao.moedaPara]
    }


    cotacaoDe(conversaoResponse: conversaoResponse, conversao: Conversao):string {
      if (conversaoResponse === undefined) {
        return '0';
      }

      return (1/conversaoResponse.rates[conversao.moedaPara]).toFixed(4)
    }

    dataCotacao(conversaoResponse: conversaoResponse):string{
      if (conversaoResponse === undefined) {
        return '';
      }
      
      return conversaoResponse.date;
    }


}
