(()=>{
	const holes = document.querySelectorAll('.hole');
	const moles = document.querySelectorAll('.mole');
	const players = document.querySelector('#players');
	const scoreBoard = document.querySelector('#score');
	const startBtn = document.querySelector('#start-game');
	let lastHole;
	let timeUp = false;
	let score = 0;
	const items = JSON.parse(localStorage.getItem('players')) || [];

	let randomTime = (min, max)=>{
		return Math.round(Math.random() * (max - min) + min);
	}

	let randomHole = (holes)=>{
		const idx = Math.floor(Math.random() * holes.length);
		const hole = holes[idx];
		if (hole === lastHole) {
			console.log('Ah nah thats the same one bud');
			return randomHole(holes);
		}
		lastHole = hole;
		return hole;
	}

	let peep = ()=>{
		const time = randomTime(200, 1000);
		const hole = randomHole(holes);
		hole.classList.add('up');
		setTimeout(() => {
			hole.classList.remove('up');
			if (!timeUp) peep();
		}, time);
	}

	let startGame = ()=>{
		scoreBoard.textContent = 0;
		timeUp = false;
		score = 0;
		peep();
		setTimeout(() => {
			timeUp = true;
			if (timeUp) {
				setScore();
				items.sort(sortScores);
				popHighscoreList();
			}
		}, 10000);
	}

	let bonk = (e)=>{
		if(!e.isTrusted) return; // cheater!
		score++;
		this.parentNode.classList.remove('up');
		scoreBoard.textContent = score;
	}

	let setScore = ()=>{
		let name = prompt('Enter your name master !');
		if(name === null | name === undefined) {
			name = 'Anonim';
		}
		const item = {
			name: name,
			score: score
		}
		items.push(item);
		console.log(item);
	}

	let sortScores = (a,b)=>{
		if(a.score > b.score) {
			return -1;
		}
		if(a.score < b.score) {
			return 1;
		}
		return 0;
	}

	let popHighscoreList = ()=>{
		players.innerHTML = items.map((item) => {
			return `<li>${item.name} - ${item.score}</li>`
		}).join('');
		localStorage.setItem('players', JSON.stringify(items));
	}

	moles.forEach(mole => mole.addEventListener('click', bonk));
	startBtn.addEventListener('click', startGame);
	popHighscoreList();
})();
