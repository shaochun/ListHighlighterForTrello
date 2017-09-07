// FIXME This is badly named

class List {

	// NOTE
	// on list title change - updateCardLimit, countCards
	// on card text change - countCards
	// on add/remove card - countCards

	constructor (list) {
		// NOTE list is .list
		this.list = list;
	}

	updateCardLimit () {

		var limit = this.getLimitFromTitle(),
			addCard = this.list.querySelector('.'),
			roundel = this.list.querySelector('.bmko_list-limit-roundel');

		if (!roundel) {
			roundel = document.createElement('span');
			roundel.classList.add('bmko_list-limit-roundel');
			listHeader.insertBefore(roundel, numCards);
		}

		if (limit) {
			this.list.classList.add('bmko_list-has-limit');
			this.list.dataset.bmkoListLimit = limit;
			roundel.textContent = limit;
		} else {
			this.list.classList.remove('bmko_list-has-limit');
			this.list.dataset.bmkoListLimit = 'none';
			roundel.textContent = '';
		}

	}

	getLimitFromTitle () {
		var title = this.list.querySelector('.list-header-name-assist').textContent,
			matches = title.match(/\[([0-9]+)\]/);

		if (matches && matches[1]) {
			return matches[1];
		}
	}

	countCards () {

		var listLimit = this.list.dataset.bmkoListLimit;

		if (listLimit && listLimit !== 'none') {

			var cards = this.list.querySelectorAll('.list-card:not(.bmko_header-card-applied)'),
				cardCount = cards.length;

			listLimit = parseInt(listLimit);

			for (let i = cards.length-1; i>-1; i--) {
				cardCount += cards[i].dataset.bmkoPoints || 0;
			}

			this.updateStatusNotice(cardCount, listLimit);

			if (GLOBAL.RefuseNewCards) {
				this.updateRefuseCardStatus(cardCount, listLimit);
			}
		}

	}

	updateStatusNotice (cardCount, listLimit) {

		var notice = this.list.querySelector('.bmko_list-limit-notice'),
			message;

		if (!notice) {
			notice = document.createElement('div');
			notice.classList.add('bmko_list-limit-notice');
			let listHeader = this.list.querySelector('.list-header'),
				numCards = listHeader.querySelector('.list-header-num-cards');
			this.list.insertBefore(notice, this.list.querySelector('.list-cards'));
		}

		if (cardCount > listLimit) {
			// TODO better message
			message = 'This has too many on it';
		} else if (cardCount < listLimit) {
			message = '';
		} else {
			// TODO better message
			message = 'This is full';
		}

		notice.nextElementSibling.innerHTML = message;
	}

	updateRefuseCardStatus (cardCount, listLimit) {
		if (cardCount >= listLimit) {
			// TODO refuse them
		} else {
			// TODO let them in
		}
	}

}
