<div id="DummyBoard" data-trello-bg="blue" data-list-color-name="default">

	<div class="dummy-board-color-tile-bar"><ul class="color-tile-bar" data-default="false">
		{foreach from=$dummyTiles item=tile}
		<li {if $tile.inputId == 'Dummy-ColorTile-default'}id="DefaultDummyTile"{/if}>
			<input
				type="radio"
				id="{$tile.inputId}" class="color-tile-input {$tile.colorName}"
				name="DummyColor" value="{$tile.colorName}"
				data-value="{$tile.color}" data-default="false" data-color-name="{$tile.colorName}">
			<label
				class="color-tile-label {$tile.colorName} {$tile.isLight}"
				for="{$tile.inputId}"
				data-value="{$tile.color}" data-default="false" data-color-name="{$tile.colorName}">
				{if $tile.colorName == 'custom'}
					<a href="#" class="edit-link" data-default="false">Edit</a>
				{/if}
				{if $tile.colorName == 'default'}
					Default
				{else}
					{$tile.colorName|ucwords}
				{/if}
			</label>
		</li>
		{if $tile.inputId == 'Dummy-ColorTile-default'}<hr>{/if}
		{/foreach}
	</ul></div>

	<svg id="DummyBoardSVG" viewBox="0 0 865 500" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="DropShadow" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0"  stop-color="rgba(0, 0, 0, 0.3)"/>
				<stop offset="100%" stop-color="transparent"/>
			</linearGradient>
			<linearGradient id="ColorBlindFriendlyMode" x1="0" y1="0" x2="0" y2="12%" spreadMethod="repeat" gradientTransform="rotate(-37)">
				<stop offset="25%" stop-color="rgba(255,255,255,.5)" />
				<stop offset="25%" stop-color="transparent" />
				<stop offset="50%" stop-color="transparent" />
				<stop offset="50%" stop-color="rgba(255,255,255,.5)" />
				<stop offset="75%" stop-color="rgba(255,255,255,.5)" />
				<stop offset="75%" stop-color="transparent" />
				<stop offset="100%" stop-color="transparent" />
			</linearGradient>
			<pattern id="Beach" patternUnits="objectBoundingBox" width="1" height="1">
				<image xlink:href="/img/thumbnail.jpg" width="85" height="60" />
			</pattern>
			<pattern id="BeachLg" patternUnits="objectBoundingBox" width="1" height="1">
				<image xlink:href="/img/dummyBackgroundPhoto.jpg" width="680" height="393" />
			</pattern>
		</defs>
		<g class="normal-list">
			<rect x="-35" y="60" width="180" height="285" rx="2.5" ry="2.5" class="list"/>
			<rect x="-30" y="80" width="170" height="40" rx="2.5" ry="2.5" class="card"/>
			<rect x="-30" y="125" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="-30" y="180" width="170" height="30" rx="2.5" ry="2.5" class="card"/>
			<rect x="-30" y="215" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="-30" y="270" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
		</g>
		<g class="todo-list">
			<rect x="155" y="60" width="180" height="175" rx="2.5" ry="2.5" class="list"/>
			<rect x="160" y="80" width="170" height="20" rx="2.5" ry="2.5" class="card"/>
			<rect x="160" y="105" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="160" y="160" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
		</g>
		<g class="doing-list">
			<rect x="345" y="60" width="180" height="240" rx="2.5" ry="2.5" class="list"/>
			<rect x="345" y="60" width="180" height="240" rx="2.5" ry="2.5" class="color-blind-friendly-mask" fill="url(#ColorBlindFriendlyMode)" />
			<rect x="350" y="80" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="350" y="135" width="170" height="30" rx="2.5" ry="2.5" class="card"/>
			<rect x="350" y="170" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="350" y="225" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
		</g>
		<g class="done-list">
			<rect x="535" y="60" width="180" height="410" rx="2.5" ry="2.5" class="list"/>
			<rect x="540" y="80" width="170" height="30" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="115" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="170" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="225" width="170" height="20" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="250" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="305" width="170" height="30" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="340" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
			<rect x="540" y="395" width="170" height="50" rx="2.5" ry="2.5" class="card"/>
		</g>
		<g>
			<rect x="650" y="0" width="215" height="500" style="fill: rgb(216, 216, 216);"/>
			<text x="685" y="53" id="BackgroundColorsHeader">Change Background</text>

			<rect class="trello-bg-color-selected" data-trello-bg="blue"	x="660" y="65"  width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="orange"	x="760" y="65"  width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="green"	x="660" y="140" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="red"		x="760" y="140" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="purple"	x="660" y="215" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="pink"	x="760" y="215" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="lime"	x="660" y="290" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="sky"		x="760" y="290" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="gray"	x="660" y="365" width="95" height="70" rx="7" ry="7" />
			<rect class="trello-bg-color-selected" data-trello-bg="photo"	x="760" y="365" width="95" height="70" rx="7" ry="7" />

			<rect class="trello-bg-color-button" data-trello-bg="blue"      x="665" y="70"  width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="orange"	x="765" y="70"  width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="green"	    x="665" y="145" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="red"		x="765" y="145" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="purple"	x="665" y="220" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="pink"	    x="765" y="220" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="lime"	    x="665" y="295" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="sky"		x="765" y="295" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="gray"	    x="665" y="370" width="85" height="60" rx="3" ry="3" />
			<rect class="trello-bg-color-button" data-trello-bg="photo"     x="765" y="370" width="85" height="60" rx="3" ry="3" />

			<rect class="trello-bg-color-indicator" data-trello-bg="blue"   x="702" y="80"  width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="orange"	x="801" y="80"  width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="green"	x="702" y="155" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="red"	x="801" y="155" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="purple"	x="702" y="230" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="pink"	x="801" y="230" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="lime"	x="702" y="305" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="sky"	x="801" y="305" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="gray"	x="702" y="380" width="13" height="20" rx="1" ry="1" />
			<rect class="trello-bg-color-indicator" data-trello-bg="photo"	x="801" y="380" width="13" height="20" rx="1" ry="1" />
		</g>
		<rect width="865" height="10" style="fill: url(#DropShadow);"/>
	</svg>

</div>
