var SAAgent = null;
var SASocket = null;
var CHANNELID = 212;
var tag = "SAP";
var ProviderAppName = "Walk Match";
var step=0;
var tease=0;
var point=0;

var nation_img = ['australia.gif','austria.gif','belgium.gif','brazil.gif'
		,'canada.gif','china.gif','czechrepublic.gif','denmark.gif'
		,'finland.gif','france.gif','germany.gif','greece.gif','hongkong.gif'
		,'hungary.gif','iceland.gif','india.gif','indonesia.gif','italy.gif'
		,'korea.gif','japan.gif','malaysia.gif','mexico.gif','netherland.jpg'
		,'newzeland.gif','norway.gif','poland.gif','portugal.gif','russia.gif'
		,'saudiarabia.gif','singapore.gif','spain.gif','sweden.gif','switzerland.gif'
		,'thailand.gif','uae.gif','unitedkingdom.gif','unitedstatesofamerica.gif','vietnam.gif'];
function onerror(err)
{
	console.log("ONERROR: err [" + err.name + "] msg[" + err.message + "]");
}

function disconnect()
{
	try 
	{
		if (SASocket != null)
		{
			console.log(" DISCONNECT SASOCKET NOT NULL");
			SASocket.close();
			SASocket = null;
		}
	} catch(err) {
		console.log(" DISCONNECT ERROR: exception [" + err.name + "] msg[" + err.message + "]");
	}
}

var agentCallback = 
{
	onconnect : function(socket)
	{
		console.log( "agentCallback onconnect" + socket);
		SASocket = socket;
		SASocket.setDataReceiveListener(onreceive);
		SASocket.setSocketStatusListener(function(reason){
			console.log("Service connection lost, Reason : [" + reason + "]");
			disconnect();
		});
	},
	onerror : onerror
};

var peerAgentFindCallback =
{
	onpeeragentfound : function(peerAgent) 
	{
		try {
			if (peerAgent.appName == ProviderAppName) {
				SAAgent.setServiceConnectionListener(agentCallback);
				SAAgent.requestServiceConnection(peerAgent);
			} else {
				alert("Not expected app!! : " + peerAgent.appName);
			}
		} catch(err) {
			console.log(" peerAgentFindCallback::onpeeragentfound exception [" + err.name + "] msg[" + err.message + "]");
		}
	},
	onerror : onerror
}

function onsuccess(agents) {
	try {
		if (agents.length > 0) {
			SAAgent = agents[0];
			SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
			SAAgent.findPeerAgents();
			console.log(" onsuccess " + SAAgent.name);
		}
	} catch(err) {
		console.log("onsuccess exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function connect() 
{
	if (SASocket) 
	{
		alert('Already connected!');
        return false;
    }
	try
	{
		webapis.sa.requestSAAgent(onsuccess, onerror);
	}
	catch(err)
	{
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function onreceive(channelId, data) {
	var obj = jQuery.parseJSON(data);
	console.log(data);
	var result = obj.code;
	if(result == "call") //국가도 줘야함 국가 보내줘야함 키값은 menation,younation , younation 없을시 "" 보냄
	{
		step = obj.mewalk;
		changeMeStep(step);
		point = obj.mewalk*2;
		changeMePoint(point);
		
		changeMeNation(obj.menation);
		changeMeName(obj.mename);
		if(obj.youname=="")
		{
			changeYou(1);
		}
		else if(obj.youname=="null")
		{
			changeYou(1);
		}
		else if(obj.youname=="0")
		{
			changeYou(1);
		}
		else
		{
			changeYou(2);
			//changeYouStep(obj.youwalk);
			changeYouName(obj.youname);
			
			changeYouNation(obj.younation);
			
			changeYouPoint(obj.youwalk*2);

			var youImgData = {
				    'msgId' : 'youimg',
				    'width' : 157,
				    'height' : 113
				};
			fetch(JSON.stringify(youImgData));
		}
		var meImgData = {
			    'msgId' : 'meimg',
			    'width' : 157,
			    'height' : 113
			};
		fetch(JSON.stringify(meImgData));
	}
	else if(result == "meimg")
	{
		$('#me_picture').attr({src:'data:image/jpeg;base64,'+obj.result+''});		
	}
	else if(result == "youimg")
	{
		$('#cp_picture').attr({src:'data:image/jpeg;base64,'+obj.result+''});		
	}
	else if(result == "setup") //국가도 줘야함 국가 보내줘야함 키값은 menation,younation , younation 없을시 "" 보냄
	{
		step = obj.mewalk;
		changeMeStep(step);
		point = obj.mewalk*2;
		changeMePoint(point);
		changeMeNation(obj.menation);
		changeMeName(obj.mename);
		
		if(obj.youname=="")
		{
			changeYou(1);
		}
		else if(obj.youname=="null")
		{
			changeYou(1);
		}
		else if(obj.youname=="0")
		{
			changeYou(1);
		}
		else
		{
			changeYou(2);
		//	changeYouStep(obj.youwalk);
			changeYouName(obj.youname);
			changeYouPoint(obj.youwalk*2);
			changeYouNation(obj.younation);

			var youImgData = {
				    'msgId' : 'youimg',
				    'width' : 157,
				    'height' : 113
				};
			fetch(JSON.stringify(youImgData));
		}q
		
		var meImgData = {
			    'msgId' : 'meimg',
			    'width' : 157,
			    'height' : 113
			};
		fetch(JSON.stringify(meImgData));
	}
	else if(result == "tease")
	{
		console.log("real tease");
		tizen.power.turnScreenOn();
		var app = tizen.application.getCurrentApplication();
		 console.log("Current application's app id is " + app.appInfo.id);
		tizen.application.launch(app.appInfo.id, onsuccess2);
		fetch("setup");
		teasePage();
	}
	else if(result == "match")
	{
		console.log("real match");
		tizen.power.turnScreenOn();
		var app = tizen.application.getCurrentApplication();
		 console.log("Current application's app id is " + app.appInfo.id);
		tizen.application.launch(app.appInfo.id, onsuccess2);
		fetch("setup");
	}
	else if(result == "end")
	{
		console.log("real match end");
		tizen.power.turnScreenOn();
		var app = tizen.application.getCurrentApplication();
		 console.log("Current application's app id is " + app.appInfo.id);
		tizen.application.launch(app.appInfo.id, onsuccess2);
		fetch("setup");
	}
	else if(result === "reset")
	{
		console.log("real match reset");
		tizen.power.turnScreenOn();
		var app = tizen.application.getCurrentApplication();
		 console.log("Current application's app id is " + app.appInfo.id);
		tizen.application.launch(app.appInfo.id, onsuccess2);
		fetch("setup");
	}
	else
	{
		console.log(result+"come?");
	}
}
function onsuccess2() 
{
   console.log("The application has launched successfully");
}

function onScreenStateChanged(previousState, changedState)
{
   console.log("Screen state changed from " + previousState + " to " + changedState);
}
	 // Set the screen state change listener.
	
function fetch(data)
{
	try
	{
		console.log(data);
		SASocket.sendData(CHANNELID, data);
	} 
	catch(err)
	{
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
		connect();
	}
}

function match()
{
	fetch("match");
}
function check(step)
{
	if(4000<=step && step<5000)
	{
		$('.step_1000').css("background-image","url(image/clear_back.png)");
		$('.step_2000').css("background-image","url(image/wht_back.png)");
		$('.step_3000').css("background-image","url(image/wht_back.png)");
		$('.step_4000').css("background-image","url(image/wht_back.png)");
		$('.step_5000').css("background-image","url(image/wht_back.png)");
	}
	else if(5000<=step && step<6000)
	{
		$('.step_1000').css("background-image","url(image/clear_back.png)");
		$('.step_2000').css("background-image","url(image/clear_back.png)");
		$('.step_3000').css("background-image","url(image/wht_back.png)");
		$('.step_4000').css("background-image","url(image/wht_back.png)");
		$('.step_5000').css("background-image","url(image/wht_back.png)");
	}
	else if(6000<=step && step<7000)
	{
		$('.step_1000').css("background-image","url(image/clear_back.png)");
		$('.step_2000').css("background-image","url(image/clear_back.png)");
		$('.step_3000').css("background-image","url(image/clear_back.png)");
		$('.step_4000').css("background-image","url(image/wht_back.png)");
		$('.step_5000').css("background-image","url(image/wht_back.png)");
	}
	else if(7000<=step && step<10000)
	{
		$('.step_1000').css("background-image","url(image/clear_back.png)");
		$('.step_2000').css("background-image","url(image/clear_back.png)");
		$('.step_3000').css("background-image","url(image/clear_back.png)");
		$('.step_4000').css("background-image","url(image/clear_back.png)");
		$('.step_5000').css("background-image","url(image/wht_back.png)");
	}
	else if(step>=10000)
	{
		$('.step_1000').css("background-image","url(image/clear_back.png)");
		$('.step_2000').css("background-image","url(image/clear_back.png)");
		$('.step_3000').css("background-image","url(image/clear_back.png)");
		$('.step_4000').css("background-image","url(image/clear_back.png)");
		$('.step_5000').css("background-image","url(image/clear_back.png)");
	}
	else
	{
		$('.step_1000').css("background-image","url(image/wht_back.png)");
		$('.step_2000').css("background-image","url(image/wht_back.png)");
		$('.step_3000').css("background-image","url(image/wht_back.png)");
		$('.step_4000').css("background-image","url(image/wht_back.png)");
		$('.step_5000').css("background-image","url(image/wht_back.png)");
	}
}
function changeMeName(data)
{
	document.getElementById("real_me_name").innerHTML =  data;
}
function changeMeStep(data)
{
	document.getElementById("mySteps").innerHTML =  data;
}

function changeMePoint(data)
{
	document.getElementById("myPoint").innerHTML =  data;
}
function changeMeNation(data)
{
	$('#me_nation').attr({src:'image/'+nation_img[data]+''});
}
function changeYouNation(data)
{
	$('#you_nation').attr({src:'image/'+nation_img[data]+''});
}

function changeYouName(data)
{
	document.getElementById("real_cp_name").innerHTML =  data;
}

function changeYouStep(data)
{
	document.getElementById("youSteps").innerHTML =  data;
}

function changeYouPoint(data)
{
	document.getElementById("youPoint").innerHTML =  data;
}


function changeYou(data) 
{
	if(data==1)
	{
		$('#main-you-info-r').hide();
		$('#main-you-info').show();
	}
	else
	{
		$('#main-you-info').hide();
		$('#main-you-info-r').show();
	}
}

function teasePage()
{
	tau.changePage("#teasePage");
}

function changeLeftTease()
{
	console.log("tease = " + tease);
	if(tease==0)
	{
		return;
	}
	else if(tease==1)
	{
		$('#imtcon').attr({src:'image/imtcon1.png'});
		$('#tease_step_dot').attr({src:'image/top_1_me.png'});
		tease-=1;
	}
	else if(tease==2)
	{
		$('#imtcon').attr({src:'image/imtcon2.png'});
		$('#tease_step_dot').attr({src:'image/top_2_main.png'});
		tease-=1;
	}
	fast=0;
	setTimeout("fastcome()",100);
}

function changeRightTease()
{
	console.log("tease = " + tease);
	if(tease==2)
	{
		return;
	}
	else if(tease==1)
	{
		$('#tease_step_dot').attr({src:'image/top_3_history.png'});
		$('#imtcon').attr({src:'image/imtcon3.png'});
		tease+=1;
	}
	else if(tease==0)
	{
		$('#tease_step_dot').attr({src:'image/top_2_main.png'});
		$('#imtcon').attr({src:'image/imtcon2.png'});
		tease+=1;
	}
	fast=0;
	setTimeout("fastcome()",100);
}
function fastcome()
{
	fast = 1;
}
function sendTease()
{
	fetch("tease/"+tease);
	tau.back();
}

function backHistory()
{
	tau.back();
}
