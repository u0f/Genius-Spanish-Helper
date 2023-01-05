const title = document.querySelector(".header_with_cover_art-primary_info-title"), ta = document.querySelector(".lyrics textarea");
const feature = Array.from(document.querySelectorAll(".metadata_unit-label")).filter(e => e.innerText == "Featuring")[0];

	if (title) {
		const btn = createSquareButton("Encabezado"), div = document.createElement("div");
		document.querySelector(".lyrics_controls").append(btn);
		let header = `[Letra de "${title.innerText}"]

`;
		btn.classList.add('encabezado-button');
		document.getElementsByClassName("encabezado-button")[0].style.borderColor = "green"
		document.getElementsByClassName("encabezado-button")[0].style.color = "green"	
		btn.addEventListener('click', () => {
			if (feature) {
				
				if(document.querySelector('a[ng-click="ctrl.show_more()"]')) {
					document.querySelector('a[ng-click="ctrl.show_more()"]').click();
				} 
				let fL = Array.from(feature.parentNode.querySelectorAll("a"));
				let fN = fL[0].innerText;	

				if (fL.length > 1) {
					for (let i = 1; i < fL.length; i++)
						fN = fN + (i == fL.length - 1 ? " & " : ", ") + fL[i].innerText;
				}
				header = `[Letra de "${title.innerText}" ft. ${fN}]

`;
			}
			ta.value = header + ta.value;
			changeEvent(ta);
		});

	};



function changeEvent(e) {
	const event = new Event('change', {
		view: window,
		bubbles: true,
		cancelable: true
	});
	e.dispatchEvent(event);
}

function createSquareButton(text) {
	let b = document.createElement("button");
	b.innerText = text;
	b.classList.add("square_button");
	b.style.marginLeft = "4px";
	return b;
}
