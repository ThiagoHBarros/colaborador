import { CargosEnums, EquipesEnum } from "./Enums";

export class Colaborador {
    nome?: string;
    email?: string;
    celular?: string;
    descricao?: string;
    endereco?: string; 
    idade?: string;
    sexo?: string;
    equipe?: boolean;
    nomeEquipe?: EquipesEnum;
    imagem?: string;
    cargo?: CargosEnums;
}