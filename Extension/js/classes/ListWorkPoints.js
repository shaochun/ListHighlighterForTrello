
class ListWorkPoints {

	constructor (list) {
		this.list = list; // NOTE this is .list
	}

	static toggleWIP () {

		var lists = document.querySelectorAll('.list');

		for (var i = 0, len = lists.length; i < len; i++) {
			let listWorkPoints = new ListWorkPoints(lists[i]);
			if (GLOBAL.EnableWIP) {
				listWorkPoints.update();
			} else {
				listWorkPoints.removeAccoutrements();
			}
			// FIXME this is dirty and stupid - needs cardCount and listLimit
			// can't remember what this was supposed to be doing, but it causes a bug
			// leaving the comments here till I put it back again later
			// and see why I needed it after all
			// so far, commenting it doesn't cause any problems
			// listWorkPoints.updateCountAndLimit();
		}

	}

	static updateLists (lists) {
		if (!lists) {
			lists = document.querySelectorAll('.list');
		} else if (lists instanceof HTMLElement) {
			lists = [lists];
		}
		for (let list of lists) {
			let listWorkPoints = new ListWorkPoints(list);
			listWorkPoints.update();
		}
	}

	static getCardPoints(card) {
		var cardTitle = card.querySelector('.list-card-title');
		if (cardTitle) {
			let title = cardTitle.textContent || '',
				matches = title.match(/\[([0-9]+)\]/);
			if (matches && matches[1]) {
				return parseInt(matches[1]);
			} else {
				return 1;
			}
		}
	}

	getLimitFromTitle () {
		var title = this.list.querySelector('.list-header-name-assist').textContent,
			matches = title.match(/\[([0-9]+)\]/);

		if (matches && matches[1]) {
			return matches[1];
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
			let cardCount = this.getCardCount();
			listLimit = parseInt(listLimit);
			this.updateCountAndLimit(cardCount, listLimit);
			if (GLOBAL.RefuseNewCards) {
				this.updateRefuseCardStatus(cardCount, listLimit);
			}
		} else {
			setTimeout(function (self) {
				self.removeAccoutrements();
			}, 0, this);
		}

	}

	getCardCount() {
		let cards = this.list.querySelectorAll('.list-card:not(.bmko_header-card-applied):not(.placeholder)'),
			cardCount = 0;

		if (GLOBAL.IgnorePointsOnCards) {
			cardCount = cards.length;
		} else {
			for (let card of cards) {
				let cardPoints = parseInt(ListWorkPoints.getCardPoints(card)) || 1;
				cardCount += cardPoints;
			}
		}

		return cardCount;
	}

	removeAccoutrements () {
		var notice = this.list.querySelector('.bmko_list-limit-notice');
		if (notice) {
			notice.remove();
		}
		this.list.classList.remove('bmko_list-full', 'bmko_list-over', 'bmko_list-has-limit');
	}

	updateCountAndLimit (cardCount, listLimit) {

		var notice = this.list.querySelector('.bmko_list-limit-notice'),
			className, after, span = document.createElement('span'), toggleRefuse;

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
			toggleRefuse = true;
		} else if (cardCount == listLimit) {
			toggleRefuse = true;
			className = 'bmko_list-full';
		} else if (cardCount < listLimit) {
			className = 'bmko_list-under';
			toggleRefuse = false;
		}

		this.toggleRefuseCards(toggleRefuse);

		span.textContent = after;
		notice.appendChild(span);

		this.list.classList.remove('bmko_list-under', 'bmko_list-full', 'bmko_list-over');
		this.list.classList.add(className);
	}

	toggleRefuseCards(toggle) {
		if (GLOBAL.RefuseNewCards) {
			let listCards = this.list.querySelector('.list-cards'),
				addCardButton = this.list.querySelector('.open-card-composer'),
				draggedCard = document.body.querySelector('body > .list-card');
			if (toggle) {
				listCards.classList.remove('js-sortable', 'ui-sortable');
				addCardButton.classList.add('hide');
			} else {
				listCards.classList.add('js-sortable', 'ui-sortable');
				addCardButton.classList.remove('hide');
			}
		}
	}

	updateRefuseCardStatus (cardCount, listLimit) {
		var toggleRefuse;
		if (cardCount >= listLimit) {
			toggleRefuse = true;
		} else if (cardCount < listLimit) {
			toggleRefuse = false;
		}
		this.toggleRefuseCards(toggleRefuse);
	}

	static refuseCardsWhileDragging (list) {
		let draggedCard = document.body.querySelector('body > .list-card');
		if (draggedCard) {
			let lwp = new ListWorkPoints(list),
				listPoints = lwp.getLimitFromTitle();
			if (listPoints) {
				if ((ListWorkPoints.getCardPoints(draggedCard) + lwp.getCardCount()) > listPoints) {
					let placeholder = list.querySelector('.placeholder');
					if (placeholder) {
						placeholder.remove();
					}
					lwp.toggleRefuseCards(true);
				} // FIXME May not be needed else { lwp.toggleRefuseCards(false); }
			}
		}
	}

}
