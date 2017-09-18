
class ListWorkPoints {

	constructor (list) {
		this.list = list; // NOTE this is .list
	}

	getLimitFromTitle () {
		var title = this.list.querySelector('.list-header-name-assist').textContent,
			matches = title.match(/\[([0-9]+)\]/);

		if (matches && matches[1]) {
			return matches[1];
		}
	}

	static getCardPoints(card) {
		var cardTitle = card.querySelector('.list-card-title');
		if (cardTitle) {
			let title = cardTitle.textContent || '',
				matches = title.match(/\[([0-9]+)\]/);
			if (matches && matches[1]) {
				return matches[1];
			}
		}
	}

	update () {

		var listLimit = this.getLimitFromTitle();

		if (listLimit) {
			this.list.classList.add('bmko_list-has-limit');
		} else {
			this.list.classList.remove('bmko_list-has-limit');
		}

		if (listLimit && listLimit !== 0) {

			let cards = this.list.querySelectorAll('a.list-card:not(.bmko_header-card-applied)'),
				cardCount = 0;

			listLimit = parseInt(listLimit);

			if (GLOBAL.IgnorePointsOnCards) {
				cardCount = cards.length;
			} else {
				for (let i = cards.length-1; i>-1; i--) {
					let cardPoints = parseInt(ListWorkPoints.getCardPoints(cards[i])) || 1;
					cardCount += cardPoints;
				}
			}

			this.updateStatusNotice(cardCount, listLimit);

			if (GLOBAL.RefuseNewCards) {
				this.updateRefuseCardStatus(cardCount, listLimit);
			}

		} else {

			this.removeAccoutrements();

		}

	}

	removeAccoutrements () {
		var notice = this.list.querySelector('.bmko_list-limit-notice');
		if (notice) {
			notice.remove();
		}
		this.list.classList.remove('bmko_list-full', 'bmko_list-over', 'bmko_list-has-limit');
		// i guess also unhide the [numbers] on cards
	}

	updateStatusNotice (cardCount, listLimit) {

		var notice = this.list.querySelector('.bmko_list-limit-notice'),
			className, after, span = document.createElement('span');

		if (!notice) {
			notice = document.createElement('div');
			notice.classList.add('bmko_list-limit-notice');
			let listHeader = this.list.querySelector('.list-header'),
				numCards = listHeader.querySelector('.list-header-num-cards');
			this.list.insertBefore(notice, this.list.querySelector('.list-cards'));
		}

		notice.textContent = `${cardCount} / ${listLimit}`;

		if (cardCount > listLimit) {
			after = `${cardCount - listLimit} over`;
			className = 'bmko_list-over';
		} else if (cardCount <= listLimit) {
			// let spaces = listLimit - cardCount,
			// 	s = (spaces == 1) ? '' : 's';
			// after = `${spaces} space${s}`;
			className = 'bmko_list-normal';
		}

		span.textContent = after;
		notice.appendChild(span);

		this.list.classList.remove('bmko_list-full', 'bmko_list-over');
		this.list.classList.add(className);
	}

	updateRefuseCardStatus (cardCount, listLimit) {
		if (cardCount >= listLimit) {
			// TODO refuse them
		} else {
			// TODO let them in
		}
	}

}
