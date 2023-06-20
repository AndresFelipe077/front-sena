export interface ExtendModalContent {
    fieldName?: string;
    placeholder?: string;
    type?:string;
    class?: string;
    UPCondition?: boolean;
    data?: Array<any>;
}

export interface ExtendModalFiller{
    fieldName: string;  
    placeholder?: string;
    type?:string;
    class?: string;
    formControlName?: string;
    ngModel?: string;
    uppercase?: boolean;
    data?: Array<{ data: string, dataId: number }>;
    dataPlacer?: string | number;
}
