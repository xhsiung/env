
export class MyClass{
    constructor(){
        this.conf= {};
    }

    setConf(obj){
        this.conf = obj;
    }

    getConf(){
        return {"server":"192.168.1.1","port":8080};
    }

    showConf(){
        console.log("showConf");
        console.log( this.conf );
    }

}