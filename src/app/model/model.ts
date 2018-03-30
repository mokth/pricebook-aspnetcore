export class Prod{
    public prodid:number;
    public code:string;
    public codename:string;
    public prodgroup:string;
    public lastuser:string;
    public modifieddate:Date;
    public status:number;
    constructor(){
    }
}

export class PriceID{
    public prcid:number;
    public prcname:string;
  
    constructor(){
    }
}

// export class PriceDetails{
//     public uid:number;
//     public prcid:string;
//     public prcdate:Date;
//     public prodid:number;
//     public unitprice:number;
//     public lastuser:string;
//     public modifieddate:number; 
  
//     constructor(){
//     }
// }

export class ItemEntry {
    no:number;
    prodid:number;
    code:string;  //item code
    name: string;  // item name
    price:number;  

}

export class PriceDetail{
    public code:string;
    public codename:string;
    public lastuser:string;
    public modifieddate:Date;
    public prcdate:string;
    public prcid:string;
    public prodid:number;
    public uid:number;
    public unitprice:number;
    constructor(){
    }
}

export class PriceSet{
    public prcid:string;
    public prcdate:string;
    public lastuser:string;
    public items:PriceDetail[];
    public status:string;
    constructor(){
    }
}


export class PrcSet{
    public prcid:string;
    public prcname:string;  
    constructor(){
    }
}
