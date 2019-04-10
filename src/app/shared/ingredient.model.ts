export class Ingredient {
  constructor(public name: string, public amount: number) {}

  clone(): Ingredient {

    const clone = new Ingredient(this.name.trim(), this.amount);

    return clone;
  }

}
