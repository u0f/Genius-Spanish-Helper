const arr = Array.from(document.querySelectorAll('.dateButton'));

for (let el of arr) {
	el.addEventListener("click", e => {
		const d = new Date();
		const date = d.getDate(), day = d.getDay();
		console.log(e.target.innerText);
		switch (e.target.innerText) {
			case "Viernes Pasado":
				d.setDate(date - ((day > 5 ? -3 : 2) + day));
				changeDate(d);
				break;
			case "Próximo viernes":
				d.setDate(date + ((day > 4 ? 12 : 5) - day))
			case "Hoy":
				changeDate(d);
				break;
			case "Ayer":
				d.setDate(date - 1);
				changeDate(d);
				break;	
			case "Mañana":
				d.setDate(date + 1);
				changeDate(d);
				break;
		}
	});
}

const input = document.querySelector('input'),
	customButton = document.querySelector('.customButton');


input.addEventListener("input", e => {
	const t = e.target.value;
	if (t.length == 8 && parseInt(t.slice(0, 2)) < 32 && parseInt(t.slice(2, 4)) < 13) {
		console.log(8, e.target.style)
		customButton.style.color = "green";
	} else {
		customButton.style.color = "black";
	}
});

customButton.addEventListener("click", e => {
	const t = input.value;
	if (t.length == 8) {
		const d = new Date();
		d.setDate(t.slice(0, 2));
		d.setMonth(t.slice(2, 4) - 1);
		d.setFullYear(t.slice(4, 8));
		changeDate(d);
	}
});

const copyButton = Array.from(document.querySelectorAll('.copyButton'));

for (let el of copyButton) {
	el.addEventListener("click", e => {
		const ta = document.createElement("textarea");
		ta.textContent = e.target.innerText;
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy");
		document.body.removeChild(ta);
	});
}

function changeDate(d) {
	let path = "song-metadata-form > form > div:nth-child(3) > ng-transclude > div > div:nth-child(2) > ng-transclude > component-date-input > div > div:nth-child(";
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{ code: `	
			document.querySelector(".lyrics_controls > button:nth-child(2)").click();
			document.querySelector("song-metadata-form > form > div:nth-child(3) > div").click();
			document.querySelector("${path}" + "5) > select").value = \`number:${d.getFullYear()}\`;
			changeEvent(document.querySelector("${path}" + "5) > select"));
			document.querySelector("${path}" + "1) > select").value = \`number:${d.getMonth() + 1}\`;
			changeEvent(document.querySelector("${path}" + "1) > select"));
			document.querySelector("${path}" + "3) > select").value = \`number:${d.getDate()}\`;
			changeEvent(document.querySelector("${path}" + "3) > select"));
			document.querySelector("song-metadata-form > form > button").click();` });
	});
}

function changeEvent(e) {
	const event = new Event('change', {
		view: window,
		bubbles: true,
		cancelable: true
	});
	e.dispatchEvent(event);
}