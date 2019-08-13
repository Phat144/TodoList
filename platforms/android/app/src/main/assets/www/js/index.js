/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.initialize();

//select element
const clear= document.querySelector(".clear");
const dateElement= document.getElementById("date");
const list= document.getElementById("list");
const input=document.getElementById("input");
const CHECK= "fa-check-circle";
const UNCHECK= "fa-circle-thin";
const LINE_THROUGH= "lineThrough";

//defining function to add task
function addToDo(toDo,id,completed,trash){

	if(trash){return;}

	const COMPLETED= completed ? CHECK : UNCHECK;
	const LINE= completed ? LINE_THROUGH : "";
//add items to list by insertAdjacentHTML(position, text)
//->defining text
const text=`<li class="item">
				<i class="fa ${DONE}  complete" job="complete" id="${id}"></i>
				<p class="text ${LINE}"> ${toDo} </p>
				<i class="de fa fa-trash-o" job="delete" id="${id}"></i>
			</li>`;

//defining position
const position= "beforeend"
list.insertAdjacentHTML(position, text);
}

//define a list Store task in list
let LIST=[];
let id=0;

document.addEventListener("keyup", function(event){
	//keycode=13 is Enter button
	if(event.keyCode == 13){

		//get value input
		const toDo= input.value;

		//check input empty
		if(toDo){
			//add task
			addToDo(toDo, id, false, false);
			
			//store in
			LIST.push(
				{
					name: toDo,
					id: id,
					done: false,
					trash:false
				}
			);
		}

		//clear input
		input.value="";

		//auto increment id
		id++;
	}
});

//function to complete Todo


