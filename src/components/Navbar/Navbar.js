import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import InputBase from '@material-ui/core/InputBase';
import AccountBox from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import { humanizeTime } from '../../utility/date';

import { connect } from 'react-redux';
import { logoutStart } from '../../store/actions/auth.actions';
import {
	loadNotificationsStart,
	readAllNotificationsStart
} from '../../store/actions/notification.action';
import { searchStart } from '../../store/actions/search.actions';

import * as classes from './Navbar.module.css';
import { loadProfileStart } from '../../store/actions/profile.actions';
import { Tooltip } from '@material-ui/core';

const Navbar = (props) => {
	const [drawerState, setDrawerState] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
	const [notificationsMenuAnchor, setNotificationsMenuAnchor] =
		React.useState(null);

	useEffect(() => {
		props.loadNotificationsStart();
		props.loadProfileStart();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const trimmedSearchText = searchText.trim();
		if (trimmedSearchText !== '') {
			props.searchStart(trimmedSearchText);
		}
		// eslint-disable-next-line
	}, [searchText]);

	const handleProfileButtonClick = (event) => {
		setProfileMenuAnchor(event.currentTarget);
	};

	const handleNotificationsButtonClick = (event) => {
		setNotificationsMenuAnchor(event.currentTarget);
	};

	const handleShowAllNotificationsClick = (event) => {
		props.history.push('/d/notifications');
		setNotificationsMenuAnchor(null);
		closeDrawer();
	};

	const handleHomeButtonClick = (event) => {
		props.history.push('/');
		closeDrawer();
	};

	const handleFollowingsButtonClick = () => {
		props.history.push('/d/followings');
		closeDrawer();
	};

	const handleProfileMenuClose = () => {
		setProfileMenuAnchor(null);
	};

	const handleNotificationsMenuClose = () => {
		setNotificationsMenuAnchor(null);
		props.readAllNotificationsStart();
	};

	const anchor = 'left';

	const toggleDrawer = () =>
		setDrawerState((previousDrawerState) => !previousDrawerState);

	const closeDrawer = () => setDrawerState(false);

	const handleProfileClick = () => {
		props.history.push('/d/profile');
		setNotificationsMenuAnchor(null);
		closeDrawer();
		setProfileMenuAnchor(null);
	};

	const handleLogoClick = () => {
		props.history.push('/d/main');
	};

	const handleLogoutClick = () => {
		props.logoutStart();
		closeDrawer();
	};

	const notificationItemsContent =
		props.notifications.length > 0 ? (
			props.notifications.map((unreadNotification, index) => (
				<MenuItem className={classes.NotificationMenuItem} key={index}>
					<div className={classes.NotificationMessage}>
						{unreadNotification.message}
					</div>
					<div className={classes.NotificationDate}>
						{humanizeTime(new Date(unreadNotification.createdDate))}
					</div>
					<Divider
						className={classes.NotificationDivider}
						variant="fullWidth"
					/>
				</MenuItem>
			))
		) : (
			<MenuItem className={classes.NotificationMenuItem}>
				<div className={classes.NotificationMessage}>
					No new notifications
				</div>
				<Divider
					className={classes.NotificationDivider}
					variant="fullWidth"
				/>
			</MenuItem>
		);

	const handleSearchInputKeyUp = (event) => {
		if (event.keyCode !== 13) {
			return;
		}
		props.history.push('/d/main');
		setSearchText(event.target.value);
	};

	const getUnreadNotificationsLength = () =>
		props.notifications.filter((notification) => !notification.isRead)
			.length;

	return (
		<AppBar position="static">
			<Toolbar className={classes.Navbar}>
				<div className={classes.LogoAndMobileMenu}>
					<IconButton
						edge="start"
						color="inherit"
						className={classes.MenuHamburger}
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<div
						className={classes.Logo}
						onClick={handleLogoClick}
					></div>
				</div>
				<div className={classes.SearchInputBlock}>
					<div className={classes.SearchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						onKeyUp={handleSearchInputKeyUp}
						classes={{
							root: classes.SearchInputRoot,
							input: classes.SearchInput
						}}
					/>
				</div>
				<div className={classes.NavbarOptions}>
					<Button color="inherit" onClick={handleHomeButtonClick}>
						<HomeIcon />
					</Button>
					<Tooltip
						arrow={true}
						placement={'top'}
						title={'Your followings and followers'}
					>
						<Button
							color="inherit"
							onClick={handleFollowingsButtonClick}
						>
							<PeopleAltIcon />
						</Button>
					</Tooltip>
					<Button
						color="inherit"
						onClick={handleNotificationsButtonClick}
					>
						{getUnreadNotificationsLength() > 0 ? (
							<Badge
								badgeContent={getUnreadNotificationsLength()}
								color="secondary"
							>
								<NotificationsActiveIcon />
							</Badge>
						) : (
							<NotificationsIcon />
						)}
					</Button>
					<Button color="inherit" onClick={handleProfileButtonClick}>
						<AccountCircleIcon />
					</Button>
				</div>
			</Toolbar>
			<Drawer
				PaperProps={{ className: classes.NavDrawerPaper }}
				anchor={anchor}
				open={drawerState}
				onClose={toggleDrawer}
			>
				<List>
					<ListItem button>
						<ListItemText
							primary={
								<React.Fragment>
									<div
										className={classes.ProfileDrawerCircle}
										style={{
											background: `url(${props.avatar})`
										}}
									></div>
									<div className={classes.ProfileDrawerName}>
										{props.name}
									</div>
								</React.Fragment>
							}
						/>
					</ListItem>
					<Divider variant="fullWidth" />
					<ListItem button onClick={handleHomeButtonClick}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItem>
					<ListItem button onClick={handleFollowingsButtonClick}>
						<ListItemIcon>
							<PeopleAltIcon />
						</ListItemIcon>
						<ListItemText primary={'Followers/Followings'} />
					</ListItem>
					<ListItem button onClick={handleShowAllNotificationsClick}>
						<ListItemIcon>
							{props.notifications.length > 0 ? (
								<Badge
									badgeContent={props.notifications.length}
									color="secondary"
								>
									<NotificationsActiveIcon />
								</Badge>
							) : (
								<NotificationsIcon />
							)}
						</ListItemIcon>
						<ListItemText primary={'Notifications'} />
					</ListItem>
					<Divider variant="fullWidth" />
					<ListItem button onClick={handleProfileClick}>
						<ListItemIcon>
							<AccountBox />
						</ListItemIcon>
						<ListItemText primary={'Profile'} />
					</ListItem>
					<ListItem button onClick={handleLogoutClick}>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary={'Log Out'} />
					</ListItem>
				</List>
			</Drawer>
			<Menu
				anchorEl={profileMenuAnchor}
				keepMounted
				open={!!profileMenuAnchor}
				onClose={handleProfileMenuClose}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<MenuItem onClick={handleProfileClick}>
					<AccountBox />
					<div className={classes.NavMenuItem}>Profile</div>
				</MenuItem>
				<MenuItem onClick={handleLogoutClick}>
					<ExitToAppIcon />
					<div className={classes.NavMenuItem}>Log Out</div>
				</MenuItem>
			</Menu>
			<Menu
				anchorEl={notificationsMenuAnchor}
				keepMounted
				open={!!notificationsMenuAnchor}
				onClose={handleNotificationsMenuClose}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				{notificationItemsContent}
				<MenuItem>
					<div
						onClick={handleShowAllNotificationsClick}
						className={classes.ShowAllNotificationsMenuItem}
					>
						Show all notifications....
					</div>
				</MenuItem>
			</Menu>
		</AppBar>
	);
};

const mapStateToProps = (state) => ({
	notifications: state.notification.notifications,
	avatar: state.profile.profile ? state.profile.profile.avatar : '',
	name: state.profile.profile ? state.profile.profile.name : '',
	searchText: state.search.searchText || ''
});

const mapDispatchToProps = (dispatch) => ({
	logoutStart: () => dispatch(logoutStart()),
	loadNotificationsStart: () => dispatch(loadNotificationsStart()),
	readAllNotificationsStart: () => dispatch(readAllNotificationsStart()),
	searchStart: (searchText) => dispatch(searchStart(searchText)),
	loadProfileStart: () => dispatch(loadProfileStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
