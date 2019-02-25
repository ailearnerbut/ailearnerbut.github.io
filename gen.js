var cvs = document.getElementById("cvs");
var ctx = cvs.getContext('2d');
var width =700;
var height =700;
cvs.width = width;
cvs.height = height;
ctx.strokeRect(0,0,width,height);
var g = document.getElementById('generations');
var itar = document.getElementById('itarations');
var button = document.getElementById('button');
var imp = document.getElementById('improve');
function mainStroke(color){
for(let i=0;i<3;i++){
	ctx.strokeStyle=color;
	ctx.strokeRect(i*width/3,0,width/3,height)
}
ctx.strokeRect(0,height/2,width,1)
}
mainStroke("white");

////drawing variables
var num=0;
var edge;
//the most important variables and arrays
var mobs = [];
var parents = [];
var yng =[];
var min;
var fems=0;
var males=0;
var error=0;
var maxMale=0;
var maxFem=0;
//just making better variables
var start=1;
var it =0;
var gens =0;
var stSum = 0;
var finSum = 0;
var avg;
var newAvg;
var clearInt=0;

var ct = function(arr){console.table(arr)};

var mob = function(int, str, im, h, sex){
	this.int = int;
	this.str = str;
	this.im = im;
	this.h = h;
	this.sex = sex;
	this.sum = int + str + im;
	this.draw = function(color, arr, shift){
		wi=Math.sqrt(width/3*height/2/2/arr.length);
		for(let i=0;i<height/wi/2;i++){
			for(let j=0;j<width/wi/3-1;j++){
				if(num<arr.length){
				num++;
				ctx.fillStyle=color;
				ctx.fillRect(edge+1+j*wi,1+shift+i*wi,wi,wi);
				ctx.strokeStyle="white";
				ctx.strokeRect(edge+1+j*wi,1+shift+i*wi,wi,wi)
			}
		}
		}

	}
}

function random(arg){
	return Math.round(Math.random()*arg)
};

function set(){
	if(start==1){
	if(population!=0){
	for(let i = 0; i<population; i++){
	mobs.push(new mob(random(10),random(10),random(10),random(2), random(1)));
}
	for(let i=0;i<mobs.length;i++){
		stSum=stSum+mobs[i].sum;
	}
	min = mobs[0].sum;
	avg = stSum/mobs.length;
	start=0;
}
}
}

ct(mobs);

var boys=[];
var girls=[];

function devisionDraw(arr){
	if(arr==mobs){
		edge=0
	};
	if(arr==parents){
		edge=width/3
				};
	if(arr==yng){
		edge=width/3*2
	};
	ctx.clearRect(edge,0,width/3,height);
	for(let i=0;i<arr.length;i++){
		if(arr[i].sex==0){
			girls.push(arr[i])
		}
		if(arr[i].sex==1){
			boys.push(arr[i])
		}
	}
	for(let i=0;i<boys.length;i++){
		num=0;
		boys[i].draw("#49467d",boys,height/2)
	}
	for(let i=0;i<girls.length;i++){
		num=0;
		girls[i].draw("#d18282",girls,1)
	}
	girls.splice(0,girls.length);
	boys.splice(0,boys.length)
}

function findAMan(){
	for(let i=0;i<mobs.length;i++){
		if(mobs[i].sex==1){
			maxMale=mobs[i];
			return
		}
	}
}
function findAWoman(){
	for(let i=0;i<mobs.length;i++){
		if(mobs[i].sex==0){
			maxFem=mobs[i];
			return
		}
	}	
}

function count(){
	for(let i=0;i<mobs.length;i++){
		if(mobs[i].sex==0){
			fems++
		}
		if(mobs[i].sex==1){
			males++
		}
	}
}


function date(){
	edge=width/3;
	fems=0;
	males=0;
	count();
	if(males==0||fems==0){
		gens++;
		g.innerHTML=gens;
		error=1;
		return
	}
	else{
	for(let i=0; i<mobs.length;i++){
		if(maxMale.sum<mobs[i].sum&&mobs[i].sex==1){
			maxMale=mobs[i];
		}
		if(maxFem.sum<mobs[i].sum&&mobs[i].sex==0){
			maxFem=mobs[i];
		}
		
	}
	for(let i=0;i<mobs.length;i++){
		if(mobs[i].int<=0||mobs[i].str<=0||mobs[i].im<=0){
			mobs.splice[i,1]
		}
	}
	parents.splice(0,2);
	parents.push(maxMale);
	parents.push(maxFem);
	////drawHere///////
		devisionDraw(parents)
	//
	mainStroke("white");
	mobs.splice(mobs.indexOf(maxMale),1);
	mobs.splice(mobs.indexOf(maxFem),1);
	}
}

function mutate(a){
	let chanse= random(100);
	let mutation = 1+random(a);

	if(chanse>=100-gMoot){
		return mutation;
	}
	if(chanse<=bMoot){
		return mutation*-1	
	}
	else{
		return 0;
	}
}
function epedemic(a,b){
	let chanse= Math.random()*100;
	if(chanse<epChanse){
		alert("Epedemy is coming");

		//find the most immuneless

		function find(){
			for(let j=0;j<Math.ceil(mobs.length/100*epPower);j++){
				let ill=mobs[0];
				for(let i=0;i<mobs.length;i++){
					if(mobs[i].im<ill.im){
						ill=mobs[i]
					}
				}
				mobs.splice(mobs.indexOf(ill),1)
			};
			for(let j=0;j<Math.ceil(yng.length/100*epPower);j++){
				ill=yng[0];
				for(let i=0;i<yng.length;i++){
					if(yng[i].im<ill.im){
						ill=yng[i]
					}
				}
				yng.splice(yng.indexOf(ill),1)
			}
		}

		find();


/*		function findMin(){
			if(mobs.length<yng.length){
				return random(Math.ceil(mobs.length/100*epPower))
			}
			else{
				return random(Math.ceil(yng.length/100*epPower))
			}
		};
		for(let i=0;i<findMin();i++){
			mobs.splice(random(mobs.length-1),1);
			yng.splice(random(yng.length-1),1)
		}
		*/
	}

}		

function newGen(){
	edge=width/3*2;
	if(error==0){
	console.log("PARENTS");
	ct(parents);
	var childNum=1+random(childs-1);
	for(let i=0;i<childNum;i++){
	yng.push(new mob(parents[random(1)].int+mutate(4),parents[random(1)].str+mutate(4),parents[random(1)].im+mutate(4),parents[random(1)].h+mutate(1),random(1)));
	};
	for(let i=0;i<yng.length;i++){
		if(yng[i].int<0||yng[i].str<0||yng[i].im<0||yng[i].h<0){
			yng.splice(i,1)
		}
		else{
			devisionDraw(yng);
		}
	};
	it++;
	itar.innerHTML=it;
	console.log("YOUNG");
	ct(yng);
	console.log("MOBS");
	ct(mobs);

	devisionDraw(mobs)

	}
	else{
		mobs.splice(0,mobs.length);
		for(let i=0;i<yng.length;i++){
			mobs.push(yng[i])
		};
		devisionDraw(mobs)
		mainStroke("white");
		fems=0;
		males=0;
		count();
		if((fems==0||males==0)&&population!=0){
			for(let i=0;i<mobs.length;i++){
				finSum=finSum+mobs[i].sum
			}
			newAvg=finSum/mobs.length;
			mobs.splice(0,mobs.length);
			if(isNaN(newAvg-avg)==true){
				improve.innerHTML="You population did not even save itself!"
			}
			else{
				if(newAvg-avg>0){
					improve.innerHTML="Thats's all! You improved your population on " + ((newAvg-avg).toFixed(2))
				}
				if(newAvg-avg<0){
					improve.innerHTML="Thats's all! You got has just worsed your population on " + -1*((newAvg-avg).toFixed(2))
				}
			}
			ctx.clearRect(0,0,width,height);
			mainStroke("white");
			console.clear();
			itar.innerHTML=it;
			g.innerHTML=gens;
			console.log("NEXT TRY");
			start=1;
			clearInt=1;
			ctx.clearRect(0,0,width/3,height);
		};
		yng.splice(0,yng.length);
		parents.splice(0,parents.length);
		error=0;
		console.log("MOBS");
		ct(mobs);
	}
}

cvs.onclick=function(){
	improve.innerHTML="";
	it=0;
	gens=0;
	stSum=0;
	finSum=0;
	var mainInterval=setInterval(function(){
	if(clearInt==0){
set();
findAMan();
findAWoman();
date();
epedemic(10,2);
newGen();
mainStroke("white");
}
	else{
		clearInterval(mainInterval);
		clearInt=0;
	}
},time*100);
}