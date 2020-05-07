class Prisoner {
  constructor(algorithm) {
    this.score = 0
    this.history = []
    this.algorithm = algorithm
    this.cooperates = algorithms[algorithm].turn
  }

  averageScore() {
    if (this.history.length === 0) {
      return this.score
    }
    return this.score / this.history.length
  }
}

class PrisonersDilemma {
  constructor(options) {
    this.prisoner1 = new Prisoner(options.algorithm1)
    this.prisoner2 = new Prisoner(options.algorithm2)

    // T > R > P > S
    // T + S < 2R
    this.R = options.R || 3
    this.P = options.P || 1
    this.S = options.S || 0
    this.T = options.T || 5

    if (options.iterate !== undefined) {
      for (let i = 0; i < options.iterate; i++) {
        this.next()
      }
    }
  }

  next() {
    let cooperates1 = this.prisoner1.cooperates(this.prisoner1.history, this.prisoner2.history)
    let cooperates2 = this.prisoner2.cooperates(this.prisoner2.history, this.prisoner1.history)

    this.prisoner1.history.push(cooperates1)
    this.prisoner2.history.push(cooperates2)

    if (cooperates1 && cooperates2) {
      this.prisoner1.score += this.R
      this.prisoner2.score += this.R
    } else if (!cooperates1 && !cooperates2) {
      this.prisoner1.score += this.P
      this.prisoner2.score += this.P
    } else {
      this.prisoner1.score += cooperates1 ? this.S : this.T
      this.prisoner2.score += cooperates2 ? this.S : this.T
    }
  }
}
