<template>
<div>
	{{ mypros}}
	{{  xmsg}}
</div>
</template>

<script>
export default {
	name: "My",
	props:["mypros"]
	,
	data(){
		return{
			xmsg:"alex"
		}
		
	}

}
</script>
