import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';

@Component({
  selector: 'app-form-colaborador',
  templateUrl: './form-colaborador.component.html',
  styleUrls: ['./form-colaborador.component.scss'],
})
export class FormColaboradorComponent  implements OnInit {

  colaboradores: any[] = [];    
  campoEquipe: boolean = false;

  formulario = this._fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],    
    celular: ['', Validators.required],
    descricao: ['', Validators.required],
    endereco: ['', Validators.required],
    idade: ['', Validators.required],
    sexo: ['', Validators.required],  
    equipe: [false],
    nomeEquipe: ['']
  });

  readonly celularMascara: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/ ,/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(
    private _fb: FormBuilder,    
  ) {}

  ngOnInit() {

    this.formulario.get('equipe')?.valueChanges
        .subscribe((data) => {          
          if(data) {
            this.campoEquipe = true;
            this.formulario.get('nomeEquipe')?.setValidators(Validators.required);
            this.formulario.get('nomeEquipe')?.updateValueAndValidity();
          } else {
            this.campoEquipe = false;
            this.formulario.get('nomeEquipe')?.clearValidators();
            this.formulario.get('nomeEquipe')?.updateValueAndValidity();
          }              
        });
  }

  salvarColaborador(): void {
    let colaborador = this.formulario.getRawValue();        

    this.colaboradores.push(colaborador);
    
    sessionStorage.setItem('colaboradores',  JSON.stringify(this.colaboradores));
    this.limparForm();
  }

  limparForm(): void {
    this.formulario.reset();
  }
  
  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}
