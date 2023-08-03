export interface SchemaElement {
    id: string;
    uniqueId?:string;
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
    value?:string;
    multi?:string;
    elements: SchemaElement[];
    children: SchemaElement[]
}