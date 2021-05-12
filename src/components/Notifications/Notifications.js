import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NewPollButton from '../../components/NewPollButton/NewPollButton';
import { loadAllNotificationsStart } from '../../store/actions/notification.action';
import { humanizeTime } from '../../utility/date';

import * as classes from './Notifications.module.css';

const Notifications = (props) => {
	useEffect(() => {
		props.loadAllNotificationsStart();
		//eslint-disable-next-line
	}, []);

	const notificationListItemsContent = props.allNotifications.map(
		(notification, index) => (
			<ListItem key={index} button>
				<ListItemText
					primary={
						<React.Fragment>
							<div className={classes.NotificationDetails}>
								<div className={classes.NotificationMessage}>
									{notification.message}
								</div>
								<div className={classes.NotificationTime}>
									{humanizeTime(
										new Date(notification.createdDate)
									)}
								</div>
							</div>
							{index !== props.allNotifications.length - 1 ? (
								<Divider
									className={classes.NotificationsDivider}
									variant="fullWidth"
								/>
							) : null}
						</React.Fragment>
					}
				/>
			</ListItem>
		)
	);

	return (
		<React.Fragment>
			<div className={classes.NotificationsContent}>
				<div className={classes.NotificationsTitleBlock}>
					<div className={classes.NotificationsTitleIcon}>
						<NotificationsIcon color="primary" />
					</div>
					<div className={classes.NotificationsTitleText}>
						Notifications
					</div>
				</div>
				<Paper className={classes.NotificationsPaper} elevation={3}>
					{props.allNotifications.length > 0 ? (
						<List component="nav">
							{notificationListItemsContent}
						</List>
					) : (
						<div className={classes.NoNotificationMessage}>
							No notifications yet....
						</div>
					)}
				</Paper>
			</div>
			<NewPollButton />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	allNotifications: state.notification.allNotifications
});

const mapDispatchToProps = (dispatch) => ({
	loadAllNotificationsStart: () => dispatch(loadAllNotificationsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
