export interface WindSolarPanel {
    WindProjectValues: WindProject,
    SolarProjectValues: SolarProject
}

export interface WindProject {
  amount: number,
  amountUnit: string,
  breakEvenPoint: number,
  co2saved: number[],
  production: number[],
  revenue: number[],
  savings: number[],
  type: string,
  subType: string
}

export interface SolarProject {
  amount: number,
  amountUnit: string,
  breakEvenPoint: number,
  co2saved: number[],
  production: number[],
  revenue: number[],
  savings: number[],
  type: string,
  subType: string
}
