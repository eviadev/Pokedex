class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.type = data.types[0].type.name;
    this.weight = data.weight;
    this.height = data.height;
    this.abilities = data.abilities[0].ability.name;
    this.stats = data.stats.base_stat;
    console.log(this.stats);
  }
}

export default Pokemon;