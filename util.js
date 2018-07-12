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