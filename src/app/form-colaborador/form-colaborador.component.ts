import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { Colaborador } from 'src/models/Colaborador';
import { CargosEnums, CargosEnumsExibicao, EquipesEnum, EquipesEnumExibicao } from 'src/models/Enums';

@Component({
  selector: 'app-form-colaborador',
  templateUrl: './form-colaborador.component.html',
  styleUrls: ['./form-colaborador.component.scss'],
})
export class FormColaboradorComponent implements OnInit {

  tituloHeader = 'Cadastrar Colaborador'
  editando: boolean = false;
  idColaborador = undefined;
  colaboradores: any[] = [];
  campoEquipe: boolean = false;
  cargoSelecionado = CargosEnums;
  rota = '';  

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
    cargo: [0, Validators.required],
    id: [''],
  });

  constructor (
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,    
  )
  {
    this.activatedRoute.params.subscribe(params => this.idColaborador = params['id']);
  }

  ngOnInit() {    

    if(this.idColaborador) {
      this.tituloHeader = 'Editar Colaborador'
      this.editando = true;
      this.rota = '../../colaboradores'
      this.preencherForm();
    }

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

  salvarColaborador(): void {
    this.definirImagemColaborador();  
    this.verificarSessionStorage();      

    let colaborador;    
    colaborador = this.formulario.getRawValue();
    colaborador.id = this.gerarIdColaborador();      
    this.colaboradores.push(colaborador);

    sessionStorage.setItem('colaboradores', JSON.stringify(this.colaboradores));
    this.limparForm();
  }

  editarColaborador(): void {        
    let colaborador = this.formulario.getRawValue();
    let colaboradoresSessionStorage = JSON.parse(sessionStorage.getItem('colaboradores') || '')
    let index = colaboradoresSessionStorage.findIndex((x: Colaborador) => x.id == this.idColaborador);
  
    colaboradoresSessionStorage[index] = colaborador;
    
    sessionStorage.removeItem('colaboradores');
    sessionStorage.setItem('colaboradores', JSON.stringify(colaboradoresSessionStorage));            
    this.router.navigateByUrl(`/home/colaboradores`);
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

  preencherForm(): void {
    this.colaboradores = JSON.parse(sessionStorage.getItem('colaboradores') || '');     
    let colaboradorEditar = this.colaboradores.find(x => x.id == this.idColaborador);    
    this.formulario.setValue(colaboradorEditar);
    this.cargoSelecionado = colaboradorEditar.cargo;

    if(colaboradorEditar.equipe) {
      this.campoEquipe = true
    }      
  }

  limparForm(): void {
    this.formulario.reset();
    this.formulario.get('equipe')?.setValue(false);
    this.formulario.get('nomeEquipe')?.setValue('');        
  }
  
  gerarIdColaborador(): string {  
    return  Math.floor(Math.random() * Date.now()).toString();
  }

  verificarSessionStorage(): void {        
    if (sessionStorage.getItem('colaboradores') != null) {
      let colaboradoresSessionStorage = JSON.parse(sessionStorage.getItem('colaboradores') || '');      
      this.colaboradores.concat(colaboradoresSessionStorage);
    }        
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
  
  readonly celularMascara: MaskitoOptions = {
    mask: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };
}
