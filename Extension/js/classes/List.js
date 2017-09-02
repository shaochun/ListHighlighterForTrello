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
			roundel = this.list.querySelector('.bmko_list-limit-roundel');

		if (limit) {

	        this.list.dataset.bmkoListLimit = limit;

			if (!roundel) {
				roundel = document.createElement('span');
				roundel.classList.add('bmko_list-limit-roundel');
				let listHeader = this.list.querySelector('.list-header'),
					numCards = listHeader.querySelector('.list-header-num-cards');
				listHeader.insertBefore(roundel, numCards);
			}

			roundel.textContent = limit;

		} else if (roundel) {
			roundel.remove();
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

		if (listLimit) {

			var cards = this.list.querySelectorAll('.list-card:not(.bmko_header-card-applied)'),
	            cardCount = cards.length;

			console.log(cards);
			console.log(cardCount);

			listLimit = parseInt(listLimit);

			console.log(cardCount, listLimit);

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
		if (cardCount > listLimit) {
            this.updateNotice('This has too many on it'); // TODO better message
        } else if (cardCount < listLimit) {
			let notice = this.list.querySelector('.notice');
            if (notice) {
            	notice.remove();
            }
        } else {
			this.updateNotice('This is full'); // TODO better message
        }
    }

	updateNotice (message) {
		var notice = this.list.querySelector('.notice');
		if (!notice) {
			let listCards = this.list.querySelector('.list-cards'),
				firstCard = listCards.querySelector('.list-card');
			notice = document.createElement('div');
			notice.classList.add('notice');
			listCards.insertBefore(notice, firstCard);
		}
		notice.textContent = message;
	}

    updateRefuseCardStatus (cardCount, listLimit) {
		if (cardCount >= listLimit) {
			// TODO refuse them
		} else {
			// TODO let them in
		}
    }

}
