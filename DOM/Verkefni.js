// 1% Hvað gerir eftirfarandi kóði, útskýrðu línu fyrir línu.
var elements = document.getElementsByTagName('li'); /* Nær í öll 'li' tög */

if (elements.length > 0) { /* Ef það kom eitthvað element */
	var el = elements[2]; /* Setja þriðja li tagið í breytuna el */
	el.className = 'cool'; /* Láta klasann á el (li) vera "cool" */
}

// 1% Hver er munurinn á að nota innerHtml() og DOM Manipulation ( t.d. createElement, createTextNode, appendChild)?
/*
	innerHTML: Setur streng inn í það tag sem það er notað á. Strngurinn getur innihaldið html.

	DOM Manipulation: createElement býr til nýtt tag, createTextNode setur texta í tagið og appendChild setur
						nýja elementið neðst í það tag sem er valið.
*/

/******************/
/* innerHTML Dæmi */
/******************/

// main.js
/*
	var elem = document.getElementById('container');
	var texti = "<p><b>innerHTML</b> dæmi.</p>";

	elem.innerHTML = texti;
*/

// index.html fyrir keyrslu main.js
/*
	<!DOCTYPE html>
	<html>
		<head>
			<meta charaset="utf-8">
			<title>innerHTML vs. DOM Manipulation</title>
		</head>
		<body>
			<div id="container"></div>
			<script src="main.js" charset="UTF-8"></script>
		</body>
	</html>
*/

// index.html eftir keyrslu main.js
/*
	<!DOCTYPE html>
	<html>
		<head>
			<meta charaset="utf-8">
			<title>innerHTML vs. DOM Manipulation</title>
		</head>
		<body>
			<div id="container">
				<p><b>innerHTML</b> dæmi.</p>
			</div>
			<script src="main.js" charset="UTF-8"></script>
		</body>
	</html>
*/

/*************************/
/* DOM Manipulation Dæmi */
/*************************/

// main.js
/*
	var container = document.getElementById('container');
	var elem = document.createElement('p');
	var texti = document.createTextNode('DOM Manipulation dæmi.');
	
	elem.appendChild(texti);
	container.appendChild(elem);
*/

// index.html fyrir keyrslu main.js
/*
	<!DOCTYPE html>
	<html>
		<head>
			<meta charaset="utf-8">
			<title>innerHTML vs. DOM Manipulation</title>
		</head>
		<body>
			<div id="container"></div>
			<script src="main.js" charset="UTF-8"></script>
		</body>
	</html>
*/

// index.html eftir keyrslu main.js
/*
	<!DOCTYPE html>
	<html>
		<head>
			<meta charaset="utf-8">
			<title>innerHTML vs. DOM Manipulation</title>
		</head>
		<body>
			<div id="container">
				<p>DOM Manipulation dæmi.</p>
			</div>
			<script src="main.js" charset="UTF-8"></script>
		</body>
	</html>
*/