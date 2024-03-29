function merge(a,b)
{
	return a+ " " + b;
}
function echo(a)
{
	return a;
}
function JsonItem(jsonString,key)
{ 
  return JSON.stringify(JSON.parse(jsonString)[key]);
}
function GetRecentBuildId(jsonString,key)
{ 
  return JSON.parse(jsonString).value[0].id;
} 

function GetTestResults(jsonString,key)
{
	var obj=JSON.parse(jsonString);
	return JSON.stringify(obj.aggregatedResultsAnalysis.resultsByOutcome);
} 
function GetCodeCoverage(jsonString,key)
{	
	var obj=JSON.parse(jsonString);
	var result={};
	var sum=0;
	for(var i=0, len=obj.value[0].modules.length; i < len; i++)
	{
		var item=obj.value[0].modules[i];
		if(item.statistics && item.statistics.blocksCovered)
		{
			sum +=parseInt(item.statistics.blocksCovered);
		}
	}
	result.blocksCovered=sum; 
	sum=0;
	for(var i=0, len=obj.value[0].modules.length; i < len; i++)
	{
		var item=obj.value[0].modules[i];
		if(item.statistics && item.statistics.blocksNotCovered)
		{
			sum +=parseInt(item.statistics.blocksNotCovered);
		}
	}
	result.blocksNotCovered=sum; 
	sum=0;
	for(var i=0, len=obj.value[0].modules.length; i < len; i++)
	{
		var item=obj.value[0].modules[i];
		if(item.statistics && item.statistics.linesCovered)
		{
			sum +=parseInt(item.statistics.linesCovered);
		}
	}
	result.linesCovered=sum;  
	sum=0;
	for(var i=0, len=obj.value[0].modules.length; i < len; i++)
	{
		var item=obj.value[0].modules[i];
		if(item.statistics && item.statistics.linesNotCovered)
		{
			sum +=parseInt(item.statistics.linesNotCovered);
		}
	}
	result.linesNotCovered=sum;  
	sum=0;
	for(var i=0, len=obj.value[0].modules.length; i < len; i++)
	{
		var item=obj.value[0].modules[i];
		if(item.statistics && item.statistics.linesPartiallyCovered)
		{
			sum +=parseInt(item.statistics.linesPartiallyCovered);
		}
	}
	result.linesPartiallyCovered=sum; 
	return JSON.stringify(result);
}

function jsonPath(obj,expr,arg){var P={resultType:arg&&arg.resultType||"VALUE",result:[],normalize:function(expr){var subx=[];return expr.replace(/[\['](\??\(.*?\))[\]']/g,function($0,$1){return "[#"+(subx.push($1)-1)+"]";}).replace(/'?\.'?|\['?/g,";").replace(/;;;|;;/g,";..;").replace(/;$|'?\]|'$/g,"").replace(/#([0-9]+)/g,function($0,$1){return subx[$1];});},asPath:function(path){var x=path.split(";"),p="$";for(var i=1,n=x.length;i<n;i++)
p+=/^[0-9*]+$/.test(x[i])?("["+x[i]+"]"):("['"+x[i]+"']");return p;},store:function(p,v){if(p)P.result[P.result.length]=P.resultType=="PATH"?P.asPath(p):v;return!!p;},trace:function(expr,val,path){if(expr){var x=expr.split(";"),loc=x.shift();x=x.join(";");if(val&&val.hasOwnProperty(loc))
P.trace(x,val[loc],path+";"+loc);else if(loc==="*")
P.walk(loc,x,val,path,function(m,l,x,v,p){P.trace(m+";"+x,v,p);});else if(loc===".."){P.trace(x,val,path);P.walk(loc,x,val,path,function(m,l,x,v,p){typeof v[m]==="object"&&P.trace("..;"+x,v[m],p+";"+m);});}
else if(/,/.test(loc)){for(var s=loc.split(/'?,'?/),i=0,n=s.length;i<n;i++)
P.trace(s[i]+";"+x,val,path);}
else if(/^\(.*?\)$/.test(loc))
P.trace(P.eval(loc,val,path.substr(path.lastIndexOf(";")+1))+";"+x,val,path);else if(/^\?\(.*?\)$/.test(loc))
P.walk(loc,x,val,path,function(m,l,x,v,p){if(P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m))P.trace(m+";"+x,v,p);});else if(/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc))
P.slice(loc,x,val,path);}
else
P.store(path,val);},walk:function(loc,expr,val,path,f){if(val instanceof Array){for(var i=0,n=val.length;i<n;i++)
if(i in val)
f(i,loc,expr,val,path);}
else if(typeof val==="object"){for(var m in val)
if(val.hasOwnProperty(m))
f(m,loc,expr,val,path);}},slice:function(loc,expr,val,path){if(val instanceof Array){var len=val.length,start=0,end=len,step=1;loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g,function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});start=(start<0)?Math.max(0,start+len):Math.min(len,start);end=(end<0)?Math.max(0,end+len):Math.min(len,end);for(var i=start;i<end;i+=step)
P.trace(i+";"+expr,val,path);}},eval:function(x,_v,_vname){try{return $&&_v&&eval(x.replace(/@/g,"_v"));}
catch(e){throw new SyntaxError("jsonPath: "+e.message+": "+x.replace(/@/g,"_v").replace(/\^/g,"_a"));}}};var $=obj;if(expr&&obj&&(P.resultType=="VALUE"||P.resultType=="PATH")){P.trace(P.normalize(expr).replace(/^\$;/,""),obj,"$");return P.result.length?P.result:false;}}



function JsPath(jsonString,key)
{ 
  return jsonPath(JSON.parse(jsonString), key);
}
