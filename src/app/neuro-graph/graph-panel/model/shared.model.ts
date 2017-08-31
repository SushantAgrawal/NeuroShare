export class RootGraphContainerState {
    public canvasDimension: CanvasDimension;
    public xDomain: XDomain;
    public xScale: any;
}

export class CanvasDimension {
    height: number;
    width: number;
    offsetHeight: number;
    offsetWidth: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
}

export class XDomain {
    defaultMinValue: Date;
    defaultMaxValue: Date;
    currentMinValue: Date;
    currentMaxValue: Date;
}

export enum ZoomOption {
    ThreeYears,
    TwoYears,
    OneYear,
    SixMonths,
    ThreeMonths,
    OneMonth
}