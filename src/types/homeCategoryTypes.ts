import { Deal } from "./dealTypes";

export interface HomeData {
    id:number;
    grid:HomeCategory[];
    shopByCategories:HomeCategory[];
    deals:Deal[];
    dealCategories:HomeCategory[];
    electricCategories:HomeCategory[];
}

export interface HomeCategory{
    id?:number;
    categoryId:string;
    section?:string;
    name?:string;
    image:string;
    parentCategoryId?:string
}