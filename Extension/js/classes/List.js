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
			addCardButton = this.list.querySelector('.open-card-composer');

		if (limit) {
			this.list.classList.add('bmko_list-has-limit');
			this.list.dataset.bmkoListLimit = limit;
			addCardButton.dataset.bmkoListLimit = limit;
		} else {
			this.list.classList.remove('bmko_list-has-limit');
			this.list.dataset.bmkoListLimit = 'none';
			addCardButton.removeAttribute('data-bmko-list-limit');
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

			let cards = this.list.querySelectorAll('.list-card:not(.bmko_header-card-applied)'),
				cardCount = cards.length,
				addCardButton = this.list.querySelector('.open-card-composer');

			listLimit = parseInt(listLimit);

			for (let i = cards.length-1; i>-1; i--) {
				cardCount += cards[i].dataset.bmkoPoints || 0;
			}

			addCardButton.dataset.bmkoCardCount = cardCount;

			this.updateStatusNotice(cardCount, listLimit);

			if (GLOBAL.RefuseNewCards) {
				this.updateRefuseCardStatus(cardCount, listLimit);
			}
		}

	}

	updateStatusNotice (cardCount, listLimit) {

		var notice = this.list.querySelector('.bmko_list-limit-notice'),
			className, message;

		if (!notice) {
			notice = document.createElement('div');
			notice.classList.add('bmko_list-limit-notice');
			let listHeader = this.list.querySelector('.list-header'),
				numCards = listHeader.querySelector('.list-header-num-cards');
			this.list.insertBefore(notice, this.list.querySelector('.list-cards'));
		}

		this.list.classList.remove('bmko_list-full', 'bmko_list-over');

		if (cardCount > listLimit) {
			message = 'This list is overfull!';
			className = 'bmko_list-over';
		} else if (cardCount < listLimit) {
			message = '';
			className = false;
		} else {
			message = 'This list is full';
			className = 'bmko_list-full';
		}

		if (className) {
			this.list.classList.add(className);
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
