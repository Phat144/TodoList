
//Select Elements
const erase= document.querySelector(".erase");
const dateDisplay= document.getElementById("date");
const display_toDoList = document.getElementById("todoList");
const todo_input= document.getElementById("todoInput");
const addBtn= document.querySelector("addBtn");

//CSS Applied for check, uncheck elements
const CHECKED= "fa-check-circle";
const UNCHECKED= "fa-circle-thin";
const CROSS_LINE= "lineThrough";

//Initialise a variable to store list into local storage
let LIST, id;




//Show date
const options= {weekday: "long", month:"short", day:"numeric"};
const toDay= new Date();

dateDisplay.innerHTML= toDay.toLocaleDateString("en-US", options);

//function to add todo item
function addTodoItem(toDoTxt, id, completed, trash){
	if(trash){return;}

	const COMPLETED= completed ? CHECKED : UNCHECKED;
	const LINE = completed ? CROSS_LINE : "";

	const addedItem=
	`<li class="item">
	<i class="fa ${COMPLETED} co" job="complete" id="${id}"></i>
	<p class="text ${LINE}">${toDoTxt}</p>
	<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
	</li>`;

	const position="beforeend";
	display_toDoList.insertAdjacentHTML(position, addedItem);
}


//using enter key to trigger add item event
document.addEventListener("keyup", function(even){
	if(event.keyCode == 13){
		const toDo= todo_input.value;

		//check the input is empty or not
		if (toDo){
			addTodoItem(toDo, id, false, false);

			LIST.push({
				name: toDo,
				id: id,
				completed: false,
				trash: false
			});

			//store list of items to localstorage
			localStorage.setItem("todoList", JSON.stringify(LIST));
			id++;
		}

		//after adding, clear input section
		todo_input.value="";
	}
});

//FUNCTION to trigger complete to do item
function doneToDo(element){
	element.classList.toggle(CHECKED);
	element.classList.toggle(UNCHECKED);
	element.parentNode.querySelector(".text").classList.toggle(CROSS_LINE);

	LIST[element.id].completed = LIST[element.id].completed ? false : true;
}

//function to trigger when removing item from todo list
function deleteToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash= true;
}

//access item in the list dynamically

display_toDoList.addEventListener("click", function(event){
	const element = event.target; //to get the clicked element inside the list
	const elementJob = element.attributes.job.value; //complete or delete

	if(elementJob == "complete"){
		doneToDo(element);
	} else if(elementJob== "delete"){
		deleteToDo(element);
	}

	//store list of items to localstorage
	localStorage.setItem("todoList", JSON.stringify(LIST));
});

//declare a variable to get data from localstorage
let data= localStorage.getItem("todoList");

//check empty data

if(data){	//data isn't empty
	LIST= JSON.parse(data);
	id= LIST.length;	//set the id to the last one in the list
	autoLoad(LIST);		//load the list to UI
}
else 	//data is empty
{
	LIST=[];
	id=0;
}

//automatically load items to the UI
function autoLoad(array){
	array.forEach(function(item){
		addTodoItem(item.name, item.id, item.completed, item.trash);
	});
}

//clear all the local storage
erase.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});

function addItemByIcon(){
	const toDo= todo_input.value;

		//check the input is empty or not
		if (toDo){
			addTodoItem(toDo, id, false, false);

			LIST.push({
				name: toDo,
				id: id,
				completed: false,
				trash: false
			});

			//store list of items to localstorage
			localStorage.setItem("todoList", JSON.stringify(LIST));
			id++;
		}

		//after adding, clear input section
		todo_input.value="";
};

//Plugin for GeoLocation
document.getElementById("getPosition").addEventListener("click", getPosition);

function getPosition() {
	var options = {
	   enableHighAccuracy: true,
	   maximumAge: 3600000
	}
	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
 
	function onSuccess(position) {
	   alert('Latitude: '          + position.coords.latitude          + '\n' +
		  'Longitude: '         + position.coords.longitude         + '\n' +
		  'Altitude: '          + position.coords.altitude          + '\n' +
		  'Accuracy: '          + position.coords.accuracy          + '\n' +
		  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		  'Heading: '           + position.coords.heading           + '\n' +
		  'Speed: '             + position.coords.speed             + '\n' +
		  'Timestamp: '         + position.timestamp                + '\n');
	};
 
	function onError(error) {
	   alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	}
 }
 