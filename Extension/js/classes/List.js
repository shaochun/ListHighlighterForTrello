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

		var limit = this.getLimitFromTitle();

		if (limit) {
			this.list.dataset.bmkoListLimit = limit;
		} else {
			this.list.dataset.bmkoListLimit = 'none';
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
			let p1 = document.createElement('p'),
				p2 = document.createElement('p');
			notice = document.createElement('div');
			notice.appendChild(p1);
			notice.appendChild(p2);
			notice.classList.add('bmko_list-limit-notice');
			let listHeader = this.list.querySelector('.list-header'),
				numCards = listHeader.querySelector('.list-header-num-cards');
			listHeader.insertBefore(notice, numCards);
		}

		notice.firstElementChild.textContent = `Limit: ${listLimit}`;

		if (cardCount > listLimit) {
			// TODO better message
			message = 'This has too many on it';
		} else if (cardCount < listLimit) {
			message = '';
		} else {
			// TODO better message
			message = 'This is full';
		}

		notice.firstElementChild.nextElementSibling.innerHTML = message;
	}

	updateRefuseCardStatus (cardCount, listLimit) {
		if (cardCount >= listLimit) {
			// TODO refuse them
		} else {
			// TODO let them in
		}
	}

}
