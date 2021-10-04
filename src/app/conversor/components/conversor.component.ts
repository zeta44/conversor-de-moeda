import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversorService, MoedaService } from '../services';
import { Conversao, conversaoResponse, Moeda } from '../models';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {
  moedas: Moeda[];
  conversao: Conversao;
  possuiErro: boolean;
  conversaoResponse: conversaoResponse;

  @ViewChild("conversaoForm", {static:true}) conversaoForm: NgForm

  constructor(
    private moedaService: MoedaService, 
    private conversorService: ConversorService
    ) { }

  ngOnInit(): void {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }
  /**
   * Efetua a chamada a conversão dos valores
   */
  init(): void {
    this.conversao = new Conversao('USD', 'BRL', null);
    this.possuiErro = false
  }

  converter():void{
    if (this.conversaoForm.valid) {
      this.conversorService.converter(this.conversao).subscribe(
        response => this.conversaoResponse = response,
        error => this.possuiErro = true
      )
    }
  }







}
