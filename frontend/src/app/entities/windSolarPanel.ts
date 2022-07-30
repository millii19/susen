export interface WindSolarPanel {
    WindProjectValues: [
        amount: number,
        amountUnit: string,
        breakEvenPoint: number,
        co2saved: number,
        production: number,
        type: string,
        subType: string
    ],
    SolarProjectValues: [
        amount: number,
        amountUnit: string,
        breakEvenPoint: number,
        co2saved: number,
        production: number,
        type: string,
        subType: string
    ]
}