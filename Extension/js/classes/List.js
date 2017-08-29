class List {

    constructor (list) {
        this.list = list;
    }

    updateCardLimit (limit) {
        // or should this read it from the title
        this.list.dataset.listLimit = limit;
    }

    countCards () {

        var cards = this.list.querySelectorAll('.list-card:not(bmko_header-card-applied)'),
            cardCount = cards.length,
            listLimit = this.list.dataset.listLimit;

        for (let i = cards.length-1; i>-1; i--) {
            cardCount += cards[i].dataset.points || 0;
        }

        if (cardCount > listLimit) {
            // put notice on
            // say this is over the limit - what to do in this situation?
        } else if (cardCount < listLimit) {
            // take notice off
            // allow new cards if that's a setting
        } else {
            // put the notice on
            // refuse new ones if that's a setting
        }
    }

    styleCardCountRoundel() {

    }

    updateStatusNotice() {

    }

    updateRefuseCardStatus() {

    }

}
