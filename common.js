
var districtNum;

//����Ƿ�����ṩ��ʷ���ݣ������ش����ĵ�������
function checkData(obj)
{
	var data = obj.value;
	var tag = data.substring(0,2);
	
	if(tag=="sz")
	{
		districtNum = 1;
	}
	else if(tag=="sh")
		{
		   districtNum = 0;
		}
		else
		{
		   alert("�ݲ��ṩ�ù�Ʊ��ʷ���ݵĲ�ѯ!");
		   obj.value = "";
		}
}

//��ȡҪ���ص����ݵ���Ŀ
function downloadData()
{
   var itemsUl = document.getElementsByClassName("items")[0];
   var items = itemsUl.getElementsByTagName("input");
   var itemsArry = [];

  //alert(items.length);
   for(var i=0;i<items.length-1;i++)
   {
	   if(items[i].checked)
	  {
		  itemsArry.push(items[i].value);
	  }
   }
  
   if(itemsArry.length==0)
   {
	  return -1;
   }
   else
   {
	  return itemsArry;
   }
}
				 
function getTime()
{
 var time1 = document.getElementById("timeFrom");
 var time2 = document.getElementById("timeTo");
 //var time1Val = document.getElementById("timeFrom").value;
 //var time2Val = document.getElementById("timeTo").value;
 var timeArray = [];

 
 //alert(check(time1));
 //alert(check(time2));
 
 if(check(time1)&&check(time2))
 {
	 if(checkRange(time1,time2))
	 {
		 alert("��������ڷ�Χ���Ϸ���");
		 time1.focus();
		 return -1;
	 }
	 else
	 {
		 timeArray.push(transformToNum(time1));
		 timeArray.push(transformToNum(time2));
		 
		 /*for(var j=0;j<timeArray.length;j++)
		 {
			 alert(timeArray[j]);
		 }*/
		 return timeArray;
	 }
 }
 else
 {
	 return -1;
 }
 
 //�������������Ƿ�Ϸ�
 function check(time)
 {
   var timeVal = time.value;	 
   if(timeVal.indexOf("-")==-1)
   {
	   error(time);
	   return false;
   }
   else
   {
	   var timeNum = timeVal.split("-");
	   //�жϸ�ʽ�Ƿ�Ϸ�
	   if(strlen(timeNum[0])!=4||strlen(timeNum[1])!=2||strlen(timeNum[2])!=2)
	   {
		   error(time);
		   return false;
	   };
	   
	   //�ж��·��Ƿ�Ϸ�
	   if(parseInt(timeNum[1])>12||parseInt(timeNum[1])<1)
	   {
		   error(time);
		   return false;
	   }
	   
	   //�ж��µ������Ƿ�Ϸ�
	   var moreDay = ["01","03","05","07","08","10","12"];
	   var lessDay = ["04","06","09","08","11"];
	   var collectDayNum;
	   
	   if(moreDay.indexOf(timeNum[1])!=-1)collectDayNum = 31;
	   else 
	   {
		   if(lessDay.indexOf(timeNum[1])!=-1)collectDayNum = 30;
		   else 
			   if(((timeNum[0]%4)==0)&&((timeNum[0]%100)!=0)||((timeNum[0]%400)==0))collectDayNum = 29;
			   else collectDayNum = 28;
	   }
	   if(parseInt(timeNum[2])>collectDayNum||parseInt(timeNum[2])<1)
	   {
		   error(time);
		   return false;
	   }
	   return true;
	}
	
 }
 
 //������ʾ����
 function error(obj)
 {
	 obj.focus();
	 alert("��������ڲ����Ϲ淶�����������룡");
 }
 
 //�ж��ַ����ĳ���
 function strlen(str){
	 var len = 0;
	 for (var i=0; i<str.length; i++) { 
		var c = str.charCodeAt(i);    
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
		len++; 
		} 
 } 
 return len;
 }
 
 //����������ڵķ�Χ�Ƿ�Ϸ�
 function checkRange(time1,time2)
 {	 
	 return (transformToNum(time1)>transformToNum(time2));
	 
 }
 
 //������ת��Ϊ��ֵ
 function transformToNum(time)
 {
	 var timeVal = (time.value).split("-");
	 var timeValue = "";
	 
	 for(var i=0;i<3;i++)
	 {
		 timeValue += timeVal[i];
	 }
	 
	 return parseInt(timeValue);
 }
}

//�����û���д����Ϣ��������Ӧ������
function buildQueryLink()
{
	var districtCode = document.getElementById("inputSuggest");
	var code = districtNum+(districtCode.value).substring(2);//��������
	
	
	if(districtCode.value.length==0)
	{
		alert("��Ʊ��������Ʋ���Ϊ�գ�");
		districtCode.focus();
	}
	else
	{
		var date = getTime();//ʱ�䷶Χ
		var items = downloadData();
		var linkCode = "http://quotes.money.163.com/service/chddata.html?code="+code+"&start="+date[0]+"&end="+date[1]+"&fields=";
		
		//����������Ŀ
		if(items == -1)
		{
		   linkCode += "TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER"; 
		}
		else
		{
			for(var i=0;i<items.length;i++)
			{
				if(i!=items.length-1)linkCode += items[i]+";";
				else linkCode += items[i];
			}
		}
		window.location.href=linkCode;
	//alert(linkCode);
	}
	
}
window.onload = function()
{
	var linkBtn = document.getElementsByClassName("link")[0];
	var chooseDiv = document.getElementsByClassName("downloadData")[0];
	
	linkBtn.onmouseover = function()
	{
		chooseDiv.style.display = "block";
	};
	linkBtn.onmouseleave = function()
	{
		chooseDiv.style.display = "none";
	};
    chooseDiv.onmouseover = function()
	{
		this.style.display = "block";
	};
	chooseDiv.onmouseleave = function()
	{
		this.style.display = "none";
	};
};