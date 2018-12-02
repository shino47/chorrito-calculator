export default class {

  static _getIsrMarginales(annualIncome, limit, divideInMonths=true) {
    const exceed = annualIncome - limit;
    const isr = exceed * 0.15;
    return divideInMonths ? isr / 13 : isr;
  }

  static _getIsrYeye(annualIncome, limit, divideInMonths=true) {
    const base = 5850;
    const exceed = annualIncome - limit;
    const isr = base + (exceed * 0.25);
    return divideInMonths ? isr / 13 : isr;
  }

  static getIsr(annualIncome, divideInMonths=true) {
    const limit = 11000;
    const limit2 = 50000;
    if (annualIncome < limit) {
      return 0;
    }
    else if (annualIncome > limit && annualIncome < limit2) {
      return this._getIsrMarginales(annualIncome, limit, divideInMonths);
    }
    else {
      return this._getIsrYeye(annualIncome, limit2, divideInMonths);
    }
  }

  static getSeguroSocial(salary) {
    return salary * 0.0975;
  }

  static getSeguroEducativo(salary) {
    return salary * 0.0125;
  }

  static getTimeRatio(months) {
    const min = 24;
    const ratio = months / min;
    return Math.min(ratio, 1);
  }

  static getDecimoBruto(salary) {
    return salary / 3;
  }

  static getDecimoIsr(salary) {
    const annualIncome = salary * 13;
    return this.getIsr(annualIncome) / 3;
  }

  static getDecimoSeguroSocial(salary) {
    const income = this.getDecimoBruto(salary);
    return this.getSeguroSocial(income);
  }

  static getDecimo(salary) {
    const income = this.getDecimoBruto(salary);
    const isr = this.getDecimoIsr(salary);
    const ss = this.getDecimoSeguroSocial(salary);
    return (income - ss - isr);
  }

  static getAguinaldoRatio() {
    return 2 / 3;
  };

  static getAguinaldoBase(salary) {
    return salary * this.getAguinaldoRatio();
  }

  static getAguinaldoBruto(salary, months) {
    const base = this.getAguinaldoBase(salary);
    const timeRatio = this.getTimeRatio(months);
    return base * timeRatio;
  }

  static getAguinaldoIsr(salary, months) {
    const annualIncome = salary * 13;
    const income = this.getAguinaldoBruto(salary, months);
    const isr1 = this.getIsr(annualIncome, false);
    const isr2 = this.getIsr(income + annualIncome, false);
    return Math.abs(isr2 - isr1);
  }

  static getAguinaldo(salary, months) {
    const income = this.getAguinaldoBruto(salary, months);
    const isr = this.getAguinaldoIsr(salary, months);
    return Math.max((income - isr), 0);
  }

  static getChorritoBase(salary, factor) {
    return salary * factor;
  }

  static getChorritoBruto(salary, factor, months) {
    const base = this.getChorritoBase(salary, factor);
    const timeRatio = this.getTimeRatio(months);
    return base * timeRatio;
  }

  static getChorritoIsr(salary, factor, months) {
    const annualIncome = salary * 13;
    const aguinaldo = this.getAguinaldo(salary, months);
    const income = this.getChorritoBruto(salary, factor, months);
    const isr1 = this.getIsr(annualIncome + aguinaldo, false);
    const isr2 = this.getIsr(income + annualIncome + aguinaldo, false);
    return Math.abs(isr2 - isr1);
  }

  static getChorrito(salary, factor, months) {
    const income = this.getChorritoBruto(salary, factor, months);
    const isr = this.getChorritoIsr(salary, factor, months);
    return Math.max((income - isr), 0);
  }
}
