window.addEventListener('event', function(data){
    console.log(data.detail);
});

const rust = import('./crate/pkg');   //可以不用指定專案名
rust
  .then(m => {
	  //m.greet('World!');
  })
  .catch(console.error);

