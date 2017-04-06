<header class="header">
	<div class="header__logo">
		<?php include "components/svg-logo.php" ?>
	</div>
	<nav class="header__navigation" role="navigation">
		<a href="#" class="header__navigation__mobile-link" tabindex="-1">
			<div class="header__navigation__mobile-menu-icon">
				<span class="header__navigation__mobile-menu-icon__bar"></span>
				<span class="header__navigation__mobile-menu-icon__bar"></span>
				<span class="header__navigation__mobile-menu-icon__bar"></span>
			</div>
		</a>
		<div class="header__navigation__account"><a href="#" class="header__navigation__account__link">Log in </a><a href="#" class="header__navigation__account__link --sign-up"> Sign up</a></div>
		<div class="header__navigation__mobile-close"><i class="fa fa-times" aria-hidden="true"></i> Close</div>
		<form class="header__navigation__search">
			<input class="header__navigation__search__input" type="text" placeholder="Search" required>
			<button class="header__navigation__search__button" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
		</form>
		<ul class="header__navigation__menu" role="menubar">
			<li class="header__navigation__menu__item" role="presentation"><a href="#" class="header__navigation__menu__item__link" role="menuitem">Menu item 1</a></li>
			<li class="header__navigation__menu__item" role="presentation"><a href="#" class="header__navigation__menu__item__link" role="menuitem">Menu item 2</a></li>
			<li class="header__navigation__menu__item" role="presentation"><a href="#" class="header__navigation__menu__item__link" role="menuitem">Menu item 3</a></li>
			<li class="header__navigation__menu__item" role="presentation"><a href="#" class="header__navigation__menu__item__link" role="menuitem">Menu item 4</a></li>
			<li class="header__navigation__menu__item" role="presentation"><a href="#" class="header__navigation__menu__item__link" role="menuitem">Menu item 5</a></li>
		</ul>
	</nav>
</header>