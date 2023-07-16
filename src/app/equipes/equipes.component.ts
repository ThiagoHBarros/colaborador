import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/models/Colaborador';
import { CargosEnumsExibicao, EquipesEnum, EquipesEnumExibicao } from 'src/models/Enums';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.scss'],
})
export class EquipesComponent  implements OnInit {

  colaboradores?: Colaborador[];
  colaboradoresAgileTech?: Colaborador[];
  colaboradoresBrainTrust?: Colaborador[];
  colaboradoresInovaTech?: Colaborador[];
  colaboradoresPowerSolutions?: Colaborador[];
  colaboradoresSemEquipe?: Colaborador[];

  equipeEnumExibicao: EquipesEnumExibicao[] = [
    EquipesEnumExibicao.AgileTech,
    EquipesEnumExibicao.BrainTrust,
    EquipesEnumExibicao.InovaTech,
    EquipesEnumExibicao.PowerSolutions
  ];
  
  cargosEnumExibicao: CargosEnumsExibicao[] = [
    CargosEnumsExibicao.AdministradorRedes, 
    CargosEnumsExibicao.DesenvolvedorSoftware, 
    CargosEnumsExibicao.EngenheiroSoftware, 
    CargosEnumsExibicao.GerenteProjeto
  ]
  
  constructor() { }

  ngOnInit() {
    this.verificarEquipes();
  }

  verificarEquipes(): void {
    this.colaboradores = JSON.parse(sessionStorage.getItem('colaboradores') || '');
    this.colaboradoresAgileTech = this.ordernarColaboradores(this.colaboradores?.filter(x => x.nomeEquipe == EquipesEnum.AgileTech && x.equipe == true) || []);
    this.colaboradoresBrainTrust = this.ordernarColaboradores(this.colaboradores?.filter(x => x.nomeEquipe == EquipesEnum.BrainTrust) || []);
    this.colaboradoresInovaTech = this.ordernarColaboradores(this.colaboradores?.filter(x => x.nomeEquipe == EquipesEnum.InovaTech) || []);
    this.colaboradoresPowerSolutions = this.ordernarColaboradores(this.colaboradores?.filter(x => x.nomeEquipe == EquipesEnum.PowerSolutions) || []);
    this.colaboradoresSemEquipe = this.ordernarColaboradores(this.colaboradores?.filter(x => x.equipe == false) || []);
  }

  ordernarColaboradores(colaboradores: Colaborador[]): Colaborador[]  {
    return colaboradores.sort((a,b) => {
      let nome1 = a.nome || '';
      let nome2 = b.nome || '';

      if (nome1 < nome2) {
        return -1;
      }

      if (nome1> nome2) {
        return 1;
      }

      return 0;
    });
  }


}
