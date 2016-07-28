class Pokemon {
  constructor (attributes) {
    this.id = attributes.id

    this.name = attributes.name
    this.level = 5

    this.hp = 15 + Math.floor(Math.random() * 6)
    this.attack = 8 + Math.floor(Math.random() * 6)
    this.defense = 8 + Math.floor(Math.random() * 6)
    this.specialAttack = 8 + Math.floor(Math.random() * 6)
    this.specialDefense = 8 + Math.floor(Math.random() * 6)
    this.speed = 8 + Math.floor(Math.random() * 6)

    this.currentHp = this.hp
  }

  isAlive () {
    return this.currentHp > 0
  }

  className () {
    return this.name.replace(/\W+/g, '-').toLowerCase()
  }
}

module.exports = Pokemon
