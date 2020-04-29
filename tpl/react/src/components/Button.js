import React,{useState , useEffect }  from 'react'

function Butotn( props ){
	//count=0 , setCount(0);
	const [count, setCount] = useState( 0 );

	//mount
	useEffect( () => {
		console.log("Count", count);		
		//ummount
		return() =>{
		};
	})

	//view
	return(
		<>			
			Count: { count }
			<button onClick={ () => setCount( count +1 )}>Click me</button>
		</>
	)
}

export default Butotn;
