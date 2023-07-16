import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/models/Colaborador';
import { CargosEnumsExibicao, EquipesEnumExibicao } from 'src/models/Enums';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
})
export class ColaboradoresComponent  implements OnInit {

  colaboradores?: Colaborador[];
  semColaboradoes: boolean = false;

  cargosEnumExibicao: CargosEnumsExibicao[] = [
    CargosEnumsExibicao.AdministradorRedes, 
    CargosEnumsExibicao.DesenvolvedorSoftware, 
    CargosEnumsExibicao.EngenheiroSoftware, 
    CargosEnumsExibicao.GerenteProjeto
  ]

  equipeEnumExibicao: EquipesEnumExibicao[] = [
    EquipesEnumExibicao.AgileTech,
    EquipesEnumExibicao.BrainTrust,
    EquipesEnumExibicao.InovaTech,
    EquipesEnumExibicao.PowerSolutions
  ];

  constructor() { }

  ngOnInit() {        
    if (sessionStorage.getItem('colaboradores') != null) {
      this.colaboradores = JSON.parse(sessionStorage.getItem('colaboradores') || '');      
      this.ordernarColaboradores();
    } else {
      this.colaboradores = [];
      this.semColaboradoes = true;
    }        
  }

  ordernarColaboradores(): void {
    this.colaboradores?.sort((a,b) => {
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
