const rust = import('./crate/pkg');   //可以不用指定專案名

rust
  .then(m => {
	  let example = m.fromjs();
	  //console.log(example);
	  example.field1["mobile"]="0938";
	  example.field2.push(123);
          let my = m.myclass();
          let conf = m.tojs(my ,example );

	  console.log("-->getConf");
	  console.log( conf );
  })
  .catch(console.error);

