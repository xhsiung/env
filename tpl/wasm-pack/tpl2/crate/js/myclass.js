export class MyClass{
    constructor(){
        this.conf= {};
    }

    set_conf(obj){
        //this.conf = obj;
        console.log("js set_conf")
        console.log( obj["ip"]) ;

    }

    get_conf(){
        return {"server":"192.168.1.1","port":8080};
    }
}
