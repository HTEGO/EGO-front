export default class YouthListParser {

  static specialities = ["Sin especialidad","Técnico","Rápido","Potente","Imprevisible","Cabezeador","regainer"];

  static translatespecialty(specialty){
    return this.specialities[specialty];
  }

  static especialitiesExtra(){
    const especialities = this.specialities.map( (name, id) => {
      return {
        id,
        name
      }
    })

    return [
      {
        id: -3,
        name: "Sin especificar"
      },
      {
        id: -2,
        name: 'Ninguna'
      },
      {
        id: -1,
        name: 'Cualquiera'
      },
      ...especialities
    ]
  }

  static parse(playerList=[]){
    return playerList.map( (player) =>{
      return this._parsePlayer(player);
    });
  }

  static parseYouthList(list,playerList=[]){
    return playerList.map((player) => {
      return this._parsePlayerResume(player,list);
    })
  }

  static parseBlackList(players=[]){
    return players.map((player) => {
      return this._parsePlayerResume(player,player.list);
    })
  }

  static _parsePlayerResume(player,list){
    return {
      list,
      id: player.id,
      name: `${player.first_name} ${player.last_name}`,
      age: `${player.age},${player.days}`,
      specialty: this.translatespecialty(player.specialty),
      stars: player.stars
    }
  }

  static _parsePlayer(player){
      let position = '';
      let positionId = '';
      switch(player.position){
        case 100:
          position = 'Portero';
          positionId = 1;
          break;
        case 101:
        case 105:
          position = 'Lateral';
          positionId = 2;
          break;
        case 102:
        case 103:
        case 104:
          position = 'Defensa';
          positionId = 3;
          break;
        case 106:
        case 110:
          position = "Extremo"
          positionId = 4;
          break;
        case 107:
        case 108:
        case 109:
          position = 'Mediocentro';
          positionId = 5;
          break;
        case 111:
        case 112:
        case 113:
          position = 'Delantero';
          positionId = 6;
          break;
        default:
          position = 'Posición desconocida';
      }

      var order = '';
      switch(player.order){
        case 0:
          order = "Normal";
        break;
        case 1:
          order = "Ofensivo";
        break;
        case 2:
          order = "Defensivo";
        break;
        case 3:
          order = "Hacia el medio";
        break;
        case 4:
          order = "Hacía el lateral";
          break;
        default:
          order = "Orden desconocida";
      }

      player.position = position;
      player.order = order;
      player.positionId = positionId;
      player.blacklistId = positionId + 6;
      player.specialty = this.translatespecialty(player.specialty);
      return player;
  }
};
