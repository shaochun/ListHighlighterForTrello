class System {

	static setup() {
		Options.resetIfEmpty(function() {
			Options.load('options', function(options) {
				System.headerCardsSetup();
				System.detectAndSaveColorBlindFriendlyMode();
				Options.load('colors', function(colors) {
					DoingColors.highPriColorStyles();
					keepTrying(ListHighlighter.highlight, 5, 700);
					keepCounting(ListWorkPoints.toggleWIP, '.list-card:not(.bmko_header-card-applied)');
					watch('title');
					watch('board');
					watch('listTitle');
					watch('body');
					System.toggleToolbarButton();
				});
			});
		});
	}

	static headerCardsSetup() {
		if (GLOBAL.EnableHeaderCards || GLOBAL.EnableSeparatorCards) {
			let body = document.body;

			keepCounting(
				function() {
					watch('listCardTitle');
					watch('list');
					Card.processCards(document.querySelectorAll('.list-card'));
				},
				'.list-card', 5, 250
			);

			body.classList.toggle('bmko_header-cards-extra-space', (GLOBAL.HeaderCardsExtraSpace));
			body.classList.toggle('bmko_separator-cards-visible-line', (GLOBAL.SeparatorCardsVisibleLine));

		}
	}

	static toggleToolbarButton() {
		if (document && document.body) {
			var toggle = document.body.classList.contains('bmko_list-highlighter-toggled-off');
			if (typeof toggle == 'boolean') {
				chrome.runtime.sendMessage({
					toggledOff: toggle
				}, function() {});
			}
		}
	}

	static detectAndSaveColorBlindFriendlyMode(passedMode) {
		Options.save(
			'colorBlindFriendlyMode',
			passedMode || document.body.classList.contains('body-color-blind-mode-enabled')
		);
	}

	// QUESTION Does it need a desetup method to get all observers and get rid of them

	// body
	static handleBodyAttributeChanges(mutationRecords) {

		if (typeof mutationRecords !== 'undefined') {

			let mut = mutationRecords[0];

			if (mut.attributeName == 'style' && mut.oldValue !== document.body.getAttribute('style')) {

				DoingColors.highPriColorStyles()

			} else if (mut.attributeName == 'class') {

				let oldStatus = mut.oldValue.includes('body-color-blind-mode-enabled'),
					newStatus = document.body.classList.contains('body-color-blind-mode-enabled');
				if (oldStatus !== newStatus) {
					System.detectAndSaveColorBlindFriendlyMode(newStatus);
				}

				let oldPhotoBg = mut.oldValue.includes('body-custom-board-background'),
					newPhotoBg = document.body.classList.contains('body-custom-board-background');
				if (oldPhotoBg !== newPhotoBg) {
					DoingColors.highPriColorStyles();
				}
			}
		}
	}

	// title
	static processPageOnTitleChange() {
		watch('board');
		watch('listTitle');
		DoingColors.highPriColorStyles();
		ListHighlighter.highlight();
		System.headerCardsSetup();
		ListWorkPoints.toggleWIP();
	}

	// board
	static checkForNewLists(mutationRecords) {
		var newList = mutationRecords[0].addedNodes[0];
		if (newList && newList.classList.contains('list-wrapper')) {
			ListHighlighter.highlight();
			watch('listTitle');
			if (GLOBAL.EnableHeaderCards || GLOBAL.EnableSeparatorCards) {
				watch('list', newList.querySelector('.list-cards'));
			}
		}
	}

	// list - observes .list-cards
	static checkForNewCards(mutationRecords) {
		if (mutationRecords[0] && mutationRecords[0] instanceof MutationRecord) {

			var listCards = mutationRecords[0].target;
			if (GLOBAL.EnableWIP && listCards.parentNode) {
				let list = listCards.closest('.list');
				ListWorkPoints.updateLists(list);

				if (typeof mutationRecords[0].removedNodes[0] == 'undefined') {
					// undefined removedNodes[0] means either a list has just been picked up, or just been dropped
					ListWorkPoints.toggleOriginalList(list);
				}
			}

			var newCard = mutationRecords[0].addedNodes[0];
			if (newCard && newCard.classList.contains('list-card')) {
				Card.processCards(newCard);
				watch('listCardTitle', newCard.querySelector('.list-card-title'));
			} else {
				// for dragging between lists
				let cards = listCards.querySelectorAll('.list-card');
				Card.processCards(cards);
			}

			if (GLOBAL.RefuseNewCards) {

				let allLists = document.querySelectorAll('.list');

				for (let record of mutationRecords) {
					let draggedCard = document.body.querySelector('body > .list-card');
					if (draggedCard) {
						for (let list of allLists) {
							let lwp = new ListWorkPoints(list);
							lwp.toggleRefuseWhileDragging(ListWorkPoints.getCardPoints(draggedCard));
						}
					} else {
						ListWorkPoints.updateLists(allLists);
					}
				}

			}
		}
	}


}
