
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
				return matches[1];
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

	removeAccoutrements () {
		var notice = this.list.querySelector('.bmko_list-limit-notice');
		if (notice) {
			notice.remove();
		}
		this.list.classList.remove('bmko_list-full', 'bmko_list-over', 'bmko_list-has-limit');
		// i guess also unhide the [numbers] on cards
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
			className = 'bmko_list-normal';
		} else if (cardCount < listLimit) {
			// let spaces = listLimit - cardCount,
			// 	s = (spaces == 1) ? '' : 's';
			// after = `${spaces} space${s}`;
			className = 'bmko_list-normal';
			toggleRefuse = false;
		}

		this.toggleRefuseCards(toggleRefuse);

		span.textContent = after;
		notice.appendChild(span);

		this.list.classList.remove('bmko_list-full', 'bmko_list-over');
		this.list.classList.add(className);
	}

	toggleRefuseCards(toggle) {
		if (GLOBAL.RefuseNewCards) {
			var listCards = this.list.querySelector('.list-cards'),
				addCardButton = this.list.querySelector('.open-card-composer');
			if (toggle) {
				listCards.classList.remove('js-sortable', 'ui-sortable');
				addCardButton.classList.add('hide');
			} else {
				listCards.classList.add('js-sortable', 'ui-sortable');
				addCardButton.classList.remove('hide');
			}
		}
	}

	// HACK: this and the method above are very similar
	updateRefuseCardStatus (cardCount, listLimit) {

		var toggleRefuse;

		if (cardCount >= listLimit) {
			toggleRefuse = true;
		} else if (cardCount < listLimit) {
			toggleRefuse = false;
		}

		this.toggleRefuseCards(toggleRefuse);

	}

	// TODO: here are the things
	// listen for a card hovering over - the shadow being created
	// get the list
	// count its points
	// if the points are under, do the following:
		// get the dragged card
		// get the card points on that piece of shit
		// if those points are bigger than the list points, toggle refuse cards ture
		// when it leaves, undo the process

}
