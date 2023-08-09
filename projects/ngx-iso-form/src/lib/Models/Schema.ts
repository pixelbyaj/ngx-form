export interface SchemaElement {
    id: string;
    name: string;
    dataType: string;
    minOccurs: string;
    maxOccurs: string;
    minLength: string;
    maxLength: string;
    pattern: string;
    fractionDigits: string;
    totalDigits: string;
    minInclusive: string;
    maxInclusive: string;
    values: string[];
    isCurrency: boolean;
    xpath: string;
    elements: SchemaElement[];
    children: SchemaElement[];
}

export interface SchemaModel extends SchemaElement{
    uniqueId?:string;
    hidden?: boolean;
    value?:string;
    multi?:string;
    isFormControls?:boolean;
}