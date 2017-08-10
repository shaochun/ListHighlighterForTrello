function getWatcher(key, targets) {

	var watchers = {

		body : {
			targets: document.body,
			observer : new MutationObserver(System.handleBodyAttributeChanges),
			options : {childList: false, subtree: false, attributes: true, attributeOldValue: true}
		},

		title : {
			targets : document.querySelector('title'),
			observer : new MutationObserver(function () {
				console.log('process page on title change');
				System.processPageOnTitleChange();
			}),
			options : {characterData: true, childList: true, subtree: false}
		},

		board : {
			targets : document.getElementById('board'),
			observer: new MutationObserver(function () {
				console.log('check for new lists');
				System.checkForNewLists();
			}),
			options : {childList: true, subtree: false}
		},

		// FIXME This is called 4 times when dragging
		// mutation observers are cumulative
		list : {
			targets : targets || document.querySelectorAll('.list-cards'),
			observer: new MutationObserver(function () {
				console.log('check for new cards');
				System.checkForNewCards();
			}),
			options : {childList: true, subtree: false}
		},

		listTitle : {
			targets : document.querySelectorAll('.list-header h2'),
			observer : new MutationObserver(function () {
				console.log('listhighlighter highlight from list header h2 change');
				ListHighlighter.highlight();
			}),
			options : {childList: true, subtree: false}
		},

		// FIXME This is called 25 times on updating a title
		listCardTitle : {
			targets : targets || document.querySelectorAll('.list-card-title'),
			observer : new MutationObserver(function () {
				console.log('card process list card title from list card title change');
				Card.processListCardTitle();
			}),
			options : {characterData: true, childList: true, subtree: false}
		}

	};

	return watchers[key];
}

function watch(watcherKey, targets) {

	var watcher = getWatcher(watcherKey, targets);

	if (watcher.targets instanceof NodeList || Array.isArray(watcher.targets)) {
		for (let i = watcher.targets.length - 1; i > -1; i--) {
			watcher.observer.observe(watcher.targets[i], watcher.options);
		}
	} else if (watcher.targets instanceof HTMLElement) {
		watcher.observer.observe(watcher.targets, watcher.options);
	}

}
