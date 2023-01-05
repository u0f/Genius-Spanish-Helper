const title = document.querySelector(".header_with_cover_art-primary_info-title"), ta = document.querySelector(".lyrics textarea");
const feature = Array.from(document.querySelectorAll(".metadata_unit-label")).filter(e => e.innerText == "Featuring")[0];

	if (title) {
		const btn = createSquareButton("Encabezado"), div = document.createElement("div");
		document.querySelector(".lyrics_controls").append(btn);
		let header = `[Letra de "${title.innerText}"]

`;
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
	
		/*const cleanBtn = createSquareButton("Clean");
		document.querySelector(".lyrics_controls").append(cleanBtn);
	
		cleanBtn.addEventListener('click', () => {
			ta.value = clean(ta.value);
			changeEvent(ta);
		});*/

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


//Made by Original Creator
function clean(t) {
	t = t.replace(/<\s([A-Z,a-z])\s>/g, '<$1>');
	t = t.replace(/<\s([A-Z,a-z])>/g, '<$1>');
	t = t.replace(/<([A-Z,a-z])\s>/g, '<$1>');
	t = t.replace(/<\s\/([A-Z,a-z])\s>/g, '</$1>');
	t = t.replace(/<\s\/([A-Z,a-z])>/g, '</$1>');
	t = t.replace(/<\/([A-Z,a-z])\s>/g, '</$1>');
	t = t.replace(/<\s\/\s([A-Z,a-z])\s>/g, '</$1>');
	t = t.replace(/<\/\s([A-Z,a-z])>/g, '</$1>');
	t = t.replace(/<\/\s([A-Z,a-z])\s>/g, '</$1>');
	t = t.replace(/<\s\/\s([A-Z,a-z])\s>/g, '</$1>');
	t = t.replace(/<[A-Z]/g, x => x.substring(0, 1) + x.charAt(1).toLowerCase() + x.slice(2));
	t = t.replace(/<\/[A-Z]/g, x => x.substring(0, 2) + x.charAt(2).toLowerCase() + x.slice(3));
	t = t.replace(/\(\s/g, '(');
	t = t.replace(/\s\)/g, ')');
	t = t.replace(/((<[a-z,A-Z]>)+)\s/g, '$1');
	t = t.replace(/\s((<\/[a-z,A-Z]>)+)/g, '$1'); /*Korrektur d. Anführungszeichen*/
	t = t.replace(/’/g, '\''); /*Großschreiben des ersten Buchstabens d. Klammer*/
	t = t.replace(/\(((<[a-z]>)+)\[/g, '[($1');
	t = t.replace(/(\]\(\d+\))((<\/[a-z]>)+)\)/g, '$2)$1');
	t = t.replace(/((<[a-z]>)+)\[\(/g, '[($1');
	t = t.replace(/\)(\]\(\d+\))((<\/[a-z]>)+)/g, '$2)$1'); /*Korrektur der Anordnung von Klammer + Annotation*/
	t = t.replace(/\(\[/g, '[(');
	t = t.replace(/(\]\(\d+\))\)/g, ')$1'); /*Korrektur von Klammer + <i>/<b>*/
	t = t.replace(/((<[a-z]>)+)\(/g, '($1');
	t = t.replace(/\)((<\/[a-z]>)+)/g, '$1)');
	var re1 = /(\([a-z])/g;
	var re2 = /(\(<i>[a-z])/g;
	var re3 = /(\(<b>[a-z])/g;
	var re4 = /(\(<i><b>[a-z])/g;
	var re5 = /(\(<b><i>[a-z])/g;
	t = t.replace(re1, x => x.substring(0, 1) + x.charAt(1).toUpperCase() + x.slice(2));
	t = t.replace(re2, x => x.substring(0, 4) + x.charAt(4).toUpperCase() + x.slice(5));
	t = t.replace(re3, x => x.substring(0, 4) + x.charAt(4).toUpperCase() + x.slice(5));
	t = t.replace(re4, x => x.substring(0, 7) + x.charAt(7).toUpperCase() + x.slice(8));
	t = t.replace(re5, x => x.substring(0, 7) + x.charAt(7).toUpperCase() + x.slice(8)); /*Entfernt falsche Spaces vor/nach Satzzeichen*/
	t = t.replace(/\s:/g, ':');
	t = t.replace(/:([A-Za-z0-9_äÄöÖüÜßẞ])/g, ': $1');
	t = t.replace(/\s,/g, ',');
	t = t.replace(/\s\?/g, '?');
	t = t.replace(/\s!/g, '!');
	t = t.replace(/„\s/g, '„');
	t = t.replace(/\s“/g, '“');
	t = t.replace(/\.\.\.\.\.\.\./g, '…');
	t = t.replace(/\.\.\.\.\.\./g, '…');
	t = t.replace(/\.\.\.\.\./g, '…');
	t = t.replace(/\.\.\.\./g, '…');
	t = t.replace(/\.\.\./g, '…');
	t = t.replace(/\.\./g, '…');
	t = t.replace(/([A-Za-z0-9_äÄöÖüÜßẞ])…/g, '$1 …');
	t = t.replace(/\s-\s/g, ' – ');
	t = t.replace(/\(Parte(.*?):\)/g, '[Parte$1]');
	t = t.replace(/\[Parte(.*?):\]/g, '[Parte$1]');
	t = t.replace(/\(Strophe(.*?):\)/g, '[Part$1]');
	t = t.replace(/\[Strophe(.*?):\]/g, '[Part$1]');
	t = t.replace(/\(Estribillo(.*?):\)/g, '[Estribillo$1]');
	t = t.replace(/\[Estribillo(.*?):\]/g, '[Estribillo$1]');
	t = t.replace(/\(Refrain(.*?):\)/g, '[Estribillo$1]');
	t = t.replace(/\[Refrain(.*?):\]/g, '[Estribillo$1]');
	t = t.replace(/\(Intro(.*?):\)/g, '[Intro$1]');
	t = t.replace(/\[Intro(.*?):\]/g, '[Intro$1]');
	t = t.replace(/\(Outro(.*?):\)/g, '[Outro$1]');
	t = t.replace(/\[Outro(.*?):\]/g, '[Outro$1]');
	t = t.replace(/\(Pre-Estribillo(.*?):\)/g, '[Pre-Estribillo$1]');
	t = t.replace(/\[Pre-Estribillo(.*?):\]/g, '[Pre-Estribillo$1]');
	t = t.replace(/\(Pre-Refrain(.*?):\)/g, '[Pre-Estribillo$1]');
	t = t.replace(/\[Pre-Refrain(.*?):\]/g, '[Pre-Estribillo$1]');
	t = t.replace(/\(Post-Estribillo(.*?):\)/g, '[Post-Estribillo$1]');
	t = t.replace(/\[Post-Estribillo(.*?):\]/g, '[Post-Estribillo$1]');
	t = t.replace(/\(Post-Refrain(.*?):\)/g, '[Post-Estribillo$1]');
	t = t.replace(/\[Post-Refrain(.*?):\]/g, '[Post-Estribillo$1]');
	return t;
}