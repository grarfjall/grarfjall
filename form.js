/*
   Author:   Jared Lancaster
   Date:     03/27/2016

   Filename: form.js



   Functions List:

   todayTxt()
      Returns the current date in the format mm-dd-yyyy

   initForm()
      Sets up and initializes the Web form.

   productCosts()
      Returns the total product costs

   shipExpense()
      Stores the value of the selected shipping option

   calcTotal()
      Calculates the total cost of the order

   calcShipping()
      Calculates the total cost of shipping and updates the
      total cost of the order

   calcCost()
      Calculates the cost of each order and updates the total 
      cost

   validateForm()
      Validates the form prior to submission

   resetForm()
      Resets the Web form and Web page


*/
window.onload = initForm;

function todayTxt() 
{
   var Today=new Date();
   return Today.getMonth()+1+"-"+Today.getDate()+"-"+Today.getFullYear();
}

function initForm()
{
	document.getElementById("date").value = todayTxt();
	document.getElementById("qty1").focus();
	document.getElementById("qty1").onblur = calcCost;
	document.getElementById("qty2").onblur = calcCost;
	document.getElementById("qty3").onblur = calcCost;
	document.getElementById("qty4").onblur = calcCost;
	document.getElementById("qty5").onblur = calcCost;
	document.getElementById("qty6").onblur = calcCost;
	document.getElementById("shipping").onchange = calcShipping;	
	document.getElementById("reset").onclick = resetForm;
	document.getElementById("submit").onclick = validateForm;
}

function productCosts()
{
	var pc1 = parseFloat(document.getElementById("cost1").value);
	var pc2 = parseFloat(document.getElementById("cost2").value);
	var pc3 = parseFloat(document.getElementById("cost3").value);
	var pc4 = parseFloat(document.getElementById("cost4").value);
	var pc5 = parseFloat(document.getElementById("cost5").value);
	var pc6 = parseFloat(document.getElementById("cost6").value);

	var subTotal = (pc1 + pc2 + pc3 + pc4 + pc5 + pc6);
	return subTotal;
}

function shipExpense()
{
	var sindex = document.getElementById("shipping").selectedIndex;
	var shippingCost = parseFloat(document.getElementById("shipping").options[sindex].value);
	return shippingCost;
}

function calcTotal()
{
	var ordercost = productCosts();
	var ordertax = ordercost * .05;
	var ordership = shipExpense();
	var ordertotal = ordercost + ordertax + ordership;
	
	document.getElementById("tax").value = ordertax.toFixed(2);
	document.getElementById("total").value = ordertotal.toFixed(2);
}

function calcShipping()
{
	document.getElementById("shipcost").value = shipExpense();
	calcTotal();
}

function calcCost()
{
	iNum = this.id.slice(3);
	var price = document.forms[0].elements["price" + iNum];
	var qty = document.forms[0].elements["qty" + iNum];
	var cost = document.forms[0].elements["cost" + iNum];
	
	var reqty = /^[0-9]$/;
	if (reqty.test(qty.value))
	{
		cost.value = (price.value * qty.value).toFixed(2);
	}
	else
	{
		alert ("Please enter a digit greater than or equal to 0.");
		qty.value = 0;
		qty.focus();
	}
	calcTotal();
}

function validateForm()
{
	if (document.getElementById("shipping").value == 0)
	{
		alert ("You must select a shipping option");
		return false;
	}
	
	else return true;
}

function resetForm()
{
	location.reload();
}