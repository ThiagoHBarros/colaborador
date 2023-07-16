import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { CargosEnums, CargosEnumsExibicao, EquipesEnum, EquipesEnumExibicao } from 'src/models/Enums';

@Component({
  selector: 'app-form-colaborador',
  templateUrl: './form-colaborador.component.html',
  styleUrls: ['./form-colaborador.component.scss'],
})
export class FormColaboradorComponent implements OnInit {

  colaboradores: any[] = [];
  campoEquipe: boolean = false;
  cargoSelecionado = CargosEnums;  

  cargosEnumOpcoes: CargosEnums[] = [
    CargosEnums.AdministradorRedes,
    CargosEnums.DesenvolvedorSoftware, 
    CargosEnums.EngenheiroSoftware, 
    CargosEnums.GerenteProjeto
  ];  
  
  cargosEnumExibicao: CargosEnumsExibicao[] = [
    CargosEnumsExibicao.AdministradorRedes, 
    CargosEnumsExibicao.DesenvolvedorSoftware, 
    CargosEnumsExibicao.EngenheiroSoftware, 
    CargosEnumsExibicao.GerenteProjeto
  ]

  equipeEnum: EquipesEnum[] = [
    EquipesEnum.AgileTech,
    EquipesEnum.BrainTrust,
    EquipesEnum.InovaTech,
    EquipesEnum.PowerSolutions
  ];

  equipeEnumExibicao: EquipesEnumExibicao[] = [
    EquipesEnumExibicao.AgileTech,
    EquipesEnumExibicao.BrainTrust,
    EquipesEnumExibicao.InovaTech,
    EquipesEnumExibicao.PowerSolutions
  ];

  imagemM: string[] = [
    "../../assets/avatar/homem1.png",
    "../../assets/avatar/homem2.png",
    "../../assets/avatar/homem3.png",
    "../../assets/avatar/homem4.png",
  ]

  imagemF: string[] = [
    "../../assets/avatar/mulher1.png",
    "../../assets/avatar/mulher2.png",
    "../../assets/avatar/mulher3.png",
    "../../assets/avatar/mulher4.png",
  ]


  formulario = this._fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    celular: ['', Validators.required],
    descricao: ['', Validators.required],
    endereco: ['', Validators.required],
    idade: ['', Validators.required],
    sexo: ['', Validators.required],
    equipe: [false],
    nomeEquipe: [''],
    imagem: [''],
    cargo: ['', Validators.required]
  });

  readonly celularMascara: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.formulario.get('equipe')?.valueChanges
      .subscribe((data) => {
        if (data) {
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

  definirImagemColaborador(): void {
    const sexo = this.formulario.get('sexo')?.value;
    const imagemM = this.imagemM[Math.floor(Math.random() * this.imagemM.length)];
    const imagemF = this.imagemF[Math.floor(Math.random() * this.imagemF.length)];

    if (sexo == 'F') {
      this.formulario.get('imagem')?.setValue(imagemF);
    } else {
      this.formulario.get('imagem')?.setValue(imagemM);
    }
  }

  salvarColaborador(): void {
    this.definirImagemColaborador();

    let colaborador;    
    colaborador = this.formulario.getRawValue();
    this.colaboradores.push(colaborador);

    sessionStorage.setItem('colaboradores', JSON.stringify(this.colaboradores));
    this.limparForm();
  }

  limparForm(): void {
    this.formulario.reset();
    this.formulario.get('equipe')?.setValue(false);
    this.formulario.get('nomeEquipe')?.setValue('');        
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}
