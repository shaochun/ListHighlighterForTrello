
class ListWorkPoints {

	constructor (list) {
		this.list = list; // NOTE this is .list
	}

	static toggleWIP () {

		var lists = document.querySelectorAll('.list');

		for (let list of lists) {
			let listWorkPoints = new ListWorkPoints(list);
			if (GLOBAL.EnableWIP) {
				listWorkPoints.update();
			} else {
				listWorkPoints.removeAccoutrements();
			}
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

		// this.list.classList.remove('bmko_refuse-new-cards');

		if (listLimit && listLimit !== 0) {
			let cardCount = this.getCardCount();
			listLimit = parseInt(listLimit);
			this.updateCountAndLimit(cardCount, listLimit);
			if (GLOBAL.RefuseNewCards) {
				this.updateRefuseCardStatus(cardCount, listLimit);
			} else {
				this.list.querySelector('.list-cards').classList.add('js-sortable', 'ui-sortable');
				this.list.querySelector('.open-card-composer').classList.remove('hide');
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
			className, over, span = document.createElement('span'), toggleRefuse;

		if (!notice) {
			notice = document.createElement('div');
			notice.classList.add('bmko_list-limit-notice');
			let listHeader = this.list.querySelector('.list-header'),
				numCards = listHeader.querySelector('.list-header-num-cards');
			this.list.insertBefore(notice, this.list.querySelector('.list-cards'));
		}

		notice.textContent = `${cardCount} / ${listLimit}`;

		if (cardCount > listLimit) {
			over = cardCount - listLimit;
			className = 'bmko_list-over';
			toggleRefuse = true;
		} else if (cardCount == listLimit) {
			toggleRefuse = true;
			className = 'bmko_list-full';
		} else if (cardCount < listLimit) {
			className = 'bmko_list-under';
			toggleRefuse = false;
		}

		this.toggleOverStatus(toggleRefuse);

		if (typeof over == 'number') {
			notice.textContent = `${over} over ・ ${notice.textContent}`;
		}

		this.list.classList.remove('bmko_list-under', 'bmko_list-full', 'bmko_list-over');
		this.list.classList.add(className);
	}

	toggleOverStatus(toggle, toggleClass) {

		toggleClass = toggleClass || false;

		if (GLOBAL.RefuseNewCards) {

			let listCards = this.list.querySelector('.list-cards'),
				addCardButton = this.list.querySelector('.open-card-composer');

			if (toggle) {
				listCards.classList.remove('js-sortable', 'ui-sortable');
				addCardButton.classList.add('hide');
				if (toggleClass) {
					this.list.classList.add('bmko_refuse-new-cards');
				}
			} else {
				listCards.classList.add('js-sortable', 'ui-sortable');
				addCardButton.classList.remove('hide');
				if (toggleClass) {
					this.list.classList.remove('bmko_refuse-new-cards');
				}
			}

		} else {

			this.list.classList.toggle('bmko_list-would-be-full', toggle);

		}

	}

	updateRefuseCardStatus (cardCount, listLimit) {
		var toggleRefuse;
		if (cardCount >= listLimit) {
			toggleRefuse = true;
		} else if (cardCount < listLimit) {
			toggleRefuse = false;
		}
		this.toggleOverStatus(toggleRefuse);
	}

	static toggleOriginalList(list) {
		var lwp = new ListWorkPoints(list);
		if (lwp.isOriginalList()) {
			list.removeAttribute('data-bmko-original-list');
		} else {
			list.dataset.bmkoOriginalList = 'yes';
		}
	}

	isOriginalList() {
		if (this.list.dataset.bmkoOriginalList) {
			return true;
		} else {
			return false;
		}
	}

	// refuses new card
	// TODO updates warning
	toggleOverWhileDragging (draggedPoints) {

		if (this.isOriginalList()) {

			this.toggleOverStatus(false);

		} else {

			if ((draggedPoints + this.getCardCount()) > this.getLimitFromTitle()) {

				this.toggleOverStatus(true);

				if (GLOBAL.RefuseNewCards) {
					let placeholder = this.list.querySelector('.placeholder');
					if (placeholder) {
						placeholder.remove();
					}
				}

			} else {

				this.toggleOverStatus(false);

			}

		}

	}

}
