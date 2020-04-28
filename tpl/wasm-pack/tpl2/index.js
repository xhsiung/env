window.addEventListener('event', function(data){
    console.log(data.detail);
});

const rust = import('./crate/pkg');   //可以不用指定專案名
rust
  .then(m => {
	  //pub struct Conf( HashMap<String,String> );
	  //key,val all are string
	  let conf =  {"ip":"192.168.1.11","port":"123"}
	  let myclass = m.MMyClass.new( conf );

	  myclass.set_conf( {"ip":"1.1.1.1","port":"444"} );

	  let myconf = myclass.get_conf();
	  console.log( myconf );
  })
  .catch(console.error);
