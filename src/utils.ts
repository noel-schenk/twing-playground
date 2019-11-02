import path = require('path');

export module utils{
    export function getRootPath(pathJoin?:string){
        if(pathJoin !== undefined){
            return path.join(path.resolve("."),pathJoin);
        }else{
            return path.resolve(".");
        }
    }
    export function roundDown(n:number){
        return Math.floor(n * 100) / 100;
    }
    export function roundAdd(n:number, times:number){
        return ((n*100)*times)/100;
    }
    export function map<T>(a:Array<T>,f:(a:T,i:number,arr:Array<T>)=>T):any[]{
        let aMod = <any>a;
        for(let i=0;i<a.length;i++){
            aMod[i] = f(a[i],i,a);
        }
        return aMod;
    }
    export function random(min:number, max:number){
        return Math.floor(Math.random() * (max - min  + 1) + min);
    }
}