import { combineReducers } from 'redux'
import { userProfileByIdReducer } from './userProfileByIdReducer'
import { authReducer } from './authReducer'
import { handleSuccessReducer } from './handleSuccessReducer'
import { allUserProfilesReducer } from './allUserProfilesReducer'
import { userTeamMembersReducer } from './userTeamMembersReducer'
import { userProjectMembersReducer } from './userProjectMembersReducer'
import { dashboardDataReducer } from './dashboardDataReducer'
import { weeklyDashboardDataReducer } from './weeklyDashboardDataReducer'
import { monthlyDashboardDataReducer } from './monthlyDashboardDataReducer'
import { leaderboardDataReducer } from './leaderboardDataReducer'
import { actionItemsReducer } from './actionItemsReducer'
import { notificationsReducer } from './notificationsReducer'
import { allProjectsReducer } from './allProjectsReducer'
import { projectByIdReducer } from './projectByIdReducer'
import { userProjectsReducer } from './userProjectsReducer'
import { projectMembershipReducer } from './projectMembershipReducer'
import { allUserTeamsReducer } from './allTeamsReducer'
import { teamByIdReducer } from './teamByIdReducer'
import { teamMembershipReducer } from './teamMembershipReducer'
import { timeEntriesForSpecifiedProjectReducer } from './timeEntriesForSpecifiedProjectReducer'
import { allTimeEntriesReducer } from './allTimeEntriesReducer'
import { timeEntriesForSpecifiedPeriodReducer } from './timeEntriesForSpecifiedPeriodReducer'
import { errorsReducer } from './errorsReducer'
import { timeEntriesReducer } from './timeEntriesReducer'
import { teamUsersReducer } from './teamsTeamMembersReducer'

export default combineReducers({
	auth: authReducer,
	userProfile: userProfileByIdReducer,
	allUserProfiles: allUserProfilesReducer,
	//userTeamMembers: userTeamMembersReducer,
	//userProjectMembers: userProjectMembersReducer,
	//dashboardData: dashboardDataReducer,
	leaderBoardData: leaderboardDataReducer,
	//weeklyDashboardData: weeklyDashboardDataReducer,
	//monthlyDashboardData: monthlyDashboardDataReducer,
	//	actionItems: actionItemsReducer,
	//	notifications: notificationsReducer,
	allProjects: allProjectsReducer,
	//project: projectByIdReducer,
	userProjects: userProjectsReducer,
	projectMembers: projectMembershipReducer,
	allTeamsData: allUserTeamsReducer,
	teamsTeamMembers: teamUsersReducer,
	//team: teamByIdReducer,
	//teamMembers: teamMembershipReducer,
	//allTimeEntries: allTimeEntriesReducer,
	//userTimeEntries: timeEntriesForSpecifiedPeriodReducer,
	//projectTimeEntries: timeEntriesForSpecifiedProjectReducer,
	//requestStatus: handleSuccessReducer,
	errors: errorsReducer,
	timeEntries: timeEntriesReducer
})
