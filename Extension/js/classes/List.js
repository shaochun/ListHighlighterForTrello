class List {

	// on list title change - updateCardLimit, countCards
	// on card text change - countCards
	// on add/remove card - countCards

    constructor (list) {
        this.list = list;
        console.log(list);
    }

    updateCardLimit () {

		var limit = this.getLimitFromTitle();

        this.list.dataset.listLimit = limit;

		var roundel = this.list.querySelector('.roundel');

		if (roundel) {
			if (limit == null) {
				roundel.remove();
			} else {
				roundel.text = limit;
			}
		}

    }

	// TODO something like detag header should be done, use existing code

	getLimitFromTitle () {
		var title = this.list.querySelector('.list-title');
		// TODO regex shit
        var limit = 0; // TODO this is fake obvs
		return limit;
	}

    countCards () {

        var cards = this.list.querySelectorAll('.list-card:not(bmko_header-card-applied)'),
            cardCount = cards.length,
            listLimit = this.list.dataset.listLimit;

        for (let i = cards.length-1; i>-1; i--) {
            cardCount += cards[i].dataset.points || 0;
        }

		this.updateStatusNotice(cardCount, listLimit);

		if (GLOBAL.RefuseNewCards) {
			this.updateRefuseCardStatus(cardCount, listLimit);
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
			notice = document.createElement('div');
			notice.classList.add('notice');
			this.list.appendChild(notice);
		}
		notice.text = message;
	}

    updateRefuseCardStatus (cardCount, listLimit) {
		if (cardCount >= listLimit) {
			// TODO refuse them
		} else {
			// TODO let them in
		}
    }

}
